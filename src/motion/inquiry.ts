// Package cards open the inquiry modal (InquiryModal.astro) instead of
// jumping straight to email: the panel irises open from the exact point you
// clicked, same move as the page transitions (DESIGN.md "signature moment").
// Inside it you either WhatsApp us directly or fill a short form, which
// composes a pre-filled email (sales@autofocuss.in, CC anirudha@autofocuss.com)
// since there is no backend to send it from.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';
import { site } from '../data/site';

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}

function buildMailto(subject: string, body: string) {
  return `mailto:${site.email}?cc=${encodeURIComponent(site.ccEmail)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
    const submit = (e: SubmitEvent) => {
      e.preventDefault();
      const data = new FormData(contactForm);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const body = `Hi NiqeLab,\n\n${message}\n\n-- \n${name}\n${email}`;
      window.location.href = buildMailto(`NiqeLab project inquiry from ${name || 'the contact form'}`, body);
    };
    contactForm.addEventListener('submit', submit);
    off.push(() => contactForm.removeEventListener('submit', submit));
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
    const submit = (e: SubmitEvent) => {
      e.preventDefault();
      const data = new FormData(modalForm);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const pkgLine = currentPackage.name ? `Package: ${currentPackage.name} (${currentPackage.details})\n\n` : '';
      const body = `Hi NiqeLab,\n\n${pkgLine}${message}\n\n-- \n${name}\n${email}`;
      window.location.href = buildMailto(`NiqeLab inquiry${currentPackage.name ? `, ${currentPackage.name}` : ''}`, body);
    };
    modalForm.addEventListener('submit', submit);
    off.push(() => modalForm.removeEventListener('submit', submit));
  }

  return () => off.forEach((f) => f());
});
