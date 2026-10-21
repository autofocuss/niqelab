// Package cards: click copies a ready-made inquiry, then opens the visitor's email app
// pre-filled. Also wires any [data-copy-target] "Copy" button (contact page).
import { onPage } from '../engine';
import { site } from '../data/site';

function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false);
  }
  return Promise.resolve(false);
}

export const startInquiry = () => onPage(() => {
  const off: (() => void)[] = [];

  document.querySelectorAll<HTMLButtonElement>('[data-package]').forEach((card) => {
    const handler = () => {
      const name = card.dataset.package || '';
      const details = card.dataset.details || '';
      const message = `Hi NiqeLab,\n\nI'm interested in the ${name} package (${details}).\n\nHere's a bit about my project:\n`;
      copyText(message).then(() => {
        card.classList.add('is-copied');
        setTimeout(() => card.classList.remove('is-copied'), 2500);
      });
      const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`NiqeLab inquiry, ${name}`)}&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
    };
    card.addEventListener('click', handler);
    off.push(() => card.removeEventListener('click', handler));
  });

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

  const form = document.querySelector<HTMLFormElement>('#contact-form');
  if (form) {
    const submit = (e: SubmitEvent) => {
      e.preventDefault(); // no backend: compose a mailto instead (see contact.astro note)
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const message = String(data.get('message') || '').trim();
      const body = `Hi NiqeLab,\n\n${message}\n\n-- \n${name}\n${email}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`NiqeLab project inquiry from ${name || 'the contact form'}`)}&body=${encodeURIComponent(body)}`;
    };
    form.addEventListener('submit', submit);
    off.push(() => form.removeEventListener('submit', submit));
  }

  return () => off.forEach((f) => f());
});
