// "Book a call" opens the booking modal (BookingModal.astro) in place
// instead of redirecting to calendar.google.com -- same iris entrance as
// the inquiry modal, from the exact point clicked. The Google Calendar
// iframe only loads its src on first open, so it never costs anything on
// pages where nobody books a call.
import { gsap } from 'gsap';
import { onPage, ease, prefersReducedMotion } from '../engine';

export const startBooking = () => onPage(() => {
  const off: (() => void)[] = [];
  const modal = document.getElementById('booking-modal');
  const panel = modal?.querySelector<HTMLElement>('.inquiry-modal__panel');
  const frame = modal?.querySelector<HTMLIFrameElement>('[data-booking-frame]');
  const triggers = document.querySelectorAll<HTMLButtonElement>('[data-booking-trigger]');
  if (!modal || !panel || triggers.length === 0) return;

  const reduced = prefersReducedMotion();
  let lastTrigger: HTMLElement | null = null;

  function openModal(trigger: HTMLElement) {
    if (!modal || !panel) return;
    lastTrigger = trigger;
    if (frame && !frame.getAttribute('src')) {
      frame.setAttribute('src', frame.dataset.src || '');
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

  triggers.forEach((trigger) => {
    const handler = () => openModal(trigger);
    trigger.addEventListener('click', handler);
    off.push(() => trigger.removeEventListener('click', handler));
  });

  modal.querySelectorAll<HTMLElement>('[data-booking-close]').forEach((el) => {
    const handler = () => closeModal();
    el.addEventListener('click', handler);
    off.push(() => el.removeEventListener('click', handler));
  });

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  };
  document.addEventListener('keydown', onKey);
  off.push(() => document.removeEventListener('keydown', onKey));

  return () => off.forEach((f) => f());
});
