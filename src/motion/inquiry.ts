// Package cards open the inquiry modal (InquiryModal.astro) instead of
// jumping straight to email: the panel irises open from the exact point you
// clicked, same move as the page transitions (DESIGN.md "signature moment").
// Inside it you either WhatsApp us directly or fill a short form. The form
// submits straight to Web3Forms (no backend of our own needed). CC via
// Web3Forms' own ccemail field is a paid-plan feature, so on the free plan
// we submit the same entry to two access keys -- sales@autofocuss.in's and
// anirudha@autofocuss.com's -- so both inboxes get it.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { site } from '../data/site';

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}

async function submitToKey(accessKey: string, payload: Record<string, string>) {
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ ...payload, access_key: accessKey }),
  });
  const json = await res.json().catch(() => ({ success: false }));
  return Boolean(json.success);
}

async function sendInquiry(form: HTMLFormElement, extra: Record<string, string> = {}) {
  const data = new FormData(form);
  const payload: Record<string, string> = {
    subject: 'NiqeLab project inquiry',
    from_name: 'NiqeLab website',
    name: String(data.get('name') || ''),
    email: String(data.get('email') || ''),
    message: String(data.get('message') || ''),
    ...extra,
  };
  const [primary] = await Promise.allSettled([
    submitToKey(site.web3formsKey, payload),
    submitToKey(site.web3formsKeyCc, payload),
  ]);
  return primary.status === 'fulfilled' && primary.value;
}

function wireForm(form: HTMLFormElement, extra: () => Record<string, string>) {
  const btn = form.querySelector<HTMLButtonElement>('[data-submit-btn]');
  const label = form.querySelector<HTMLElement>('[data-submit-label]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const idleLabel = label?.textContent || 'Send';

  const submit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (btn) btn.disabled = true;
    if (label) label.textContent = 'Sending…';
    if (status) { status.textContent = ''; status.classList.remove('is-error', 'is-success'); }

    try {
      const ok = await sendInquiry(form, extra());
      if (ok) {
        if (label) label.textContent = 'Sent ✓';
        if (status) { status.textContent = "Got it — we'll reply soon."; status.classList.add('is-success'); }
        form.reset();
        setTimeout(() => { if (label) label.textContent = idleLabel; if (btn) btn.disabled = false; }, 2400);
      } else {
        throw new Error('Submit failed');
      }
    } catch {
      if (label) label.textContent = idleLabel;
      if (btn) btn.disabled = false;
      if (status) {
        status.textContent = `Something went wrong — email us directly at ${site.email}.`;
        status.classList.add('is-error');
      }
    }
  };
  form.addEventListener('submit', submit);
  return () => form.removeEventListener('submit', submit);
}

export const startInquiry = () => onPage(() => {
  const off: (() => void)[] = [];

  document.querySelectorAll<HTMLButtonElement>('[data-copy-target]').forEach((btn) => {
    const handler = () => {
      const target = document.getElementById(btn.dataset.copyTarget || '');
      if (!target) return;
      const text = target.textContent || '';
      copyText(text).then((ok) => {
        if (ok) {
          const original = btn.textContent;
          btn.textContent = 'Copied';
          setTimeout(() => { btn.textContent = original; }, 1800);
        } else {
          const r = document.createRange();
          r.selectNode(target);
          window.getSelection()?.removeAllRanges();
          window.getSelection()?.addRange(r);
        }
      });
    };
    btn.addEventListener('click', handler);
    off.push(() => btn.removeEventListener('click', handler));
  });

  // Main contact page form (no package context)
  const contactForm = document.querySelector<HTMLFormElement>('#contact-form');
  if (contactForm) {
    off.push(wireForm(contactForm, () => ({ subject: 'NiqeLab project inquiry' })));
  }

  // ---- Inquiry modal ----
  const modal = document.getElementById('inquiry-modal');
  const panel = modal?.querySelector<HTMLElement>('.inquiry-modal__panel');
  const titleEl = modal?.querySelector<HTMLElement>('[data-modal-package]');
  const whatsappEl = modal?.querySelector<HTMLAnchorElement>('[data-modal-whatsapp]');
  const modalForm = modal?.querySelector<HTMLFormElement>('#inquiry-form');
  const reduced = prefersReducedMotion();
  let lastTrigger: HTMLElement | null = null;
  let currentPackage = { name: '', details: '' };

  function openModal(trigger: HTMLElement, name: string, details: string) {
    if (!modal || !panel) return;
    lastTrigger = trigger;
    currentPackage = { name, details };
    if (titleEl) titleEl.textContent = name;
    if (whatsappEl) {
      const text = `Hi! I'm interested in the ${name} package from NiqeLab. Here's a bit about my project: `;
      whatsappEl.href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    const rect = trigger.getBoundingClientRect();
    const originX = ((rect.left + rect.width / 2) / innerWidth) * 100;
    const originY = ((rect.top + rect.height / 2) / innerHeight) * 100;
    panel.style.transformOrigin = `${originX}% ${originY}%`;

    if (reduced) {
      gsap.set(panel, { clipPath: 'circle(140% at 50% 50%)' });
    } else {
      gsap.fromTo(panel,
        { clipPath: `circle(0% at ${originX}% ${originY}%)` },
        { clipPath: `circle(140% at ${originX}% ${originY}%)`, duration: 0.7, ease: ease.spring });
    }
    panel.focus();
  }

  function closeModal() {
    if (!modal || !panel) return;
    const finish = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lastTrigger?.focus();
    };
    if (reduced) { finish(); return; }
    gsap.to(panel, { clipPath: 'circle(0% at 50% 50%)', duration: 0.4, ease: ease.inOut, onComplete: finish });
  }

  document.querySelectorAll<HTMLButtonElement>('[data-package]').forEach((card) => {
    const handler = () => openModal(card, card.dataset.package || '', card.dataset.details || '');
    card.addEventListener('click', handler);
    off.push(() => card.removeEventListener('click', handler));
  });

  modal?.querySelectorAll<HTMLElement>('[data-modal-close]').forEach((el) => {
    const handler = () => closeModal();
    el.addEventListener('click', handler);
    off.push(() => el.removeEventListener('click', handler));
  });

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  };
  document.addEventListener('keydown', onKey);
  off.push(() => document.removeEventListener('keydown', onKey));

  if (modalForm) {
    off.push(wireForm(modalForm, () => ({
      subject: `NiqeLab inquiry${currentPackage.name ? `, ${currentPackage.name}` : ''}`,
      package: currentPackage.name ? `${currentPackage.name} (${currentPackage.details})` : '',
    })));
  }

  return () => off.forEach((f) => f());
});
