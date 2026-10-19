// Primary-button treatment: a fill floods from the pointer's entry point (motion.md
// "Button fill from the pointer's side"). CSS handles touch and reduced motion on its own.
import { gsap } from 'gsap';
import { onPage, isTouch, prefersReducedMotion, ease } from '../engine';

export const startButtonFill = () => onPage(() => {
  if (isTouch() || prefersReducedMotion()) return;
  const off: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
    const fill = btn.querySelector<HTMLElement>('.btn__fill');
    if (!fill) return;
    const from = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      return `${e.clientX - r.left}px ${e.clientY - r.top}px`;
    };
    let closed = true;
    const open = (at: string) => {
      if (closed) gsap.set(fill, { clipPath: `circle(0% at ${at})` });
      closed = false;
      btn.classList.add('is-filled');
      gsap.to(fill, { clipPath: `circle(150% at ${at})`, duration: 0.6, ease: ease.soft, overwrite: true });
    };
    const close = (at: string) => {
      btn.classList.remove('is-filled');
      gsap.to(fill, { clipPath: `circle(0% at ${at})`, duration: 0.5, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
    };
    const enter = (e: PointerEvent) => open(from(e));
    const leave = (e: PointerEvent) => close(from(e));
    const focus = () => btn.matches(':focus-visible') && open('50% 50%');
    const blur = () => close('50% 50%');
    btn.addEventListener('pointerenter', enter);
    btn.addEventListener('pointerleave', leave);
    btn.addEventListener('focus', focus);
    btn.addEventListener('blur', blur);
    off.push(() => {
      btn.removeEventListener('pointerenter', enter);
      btn.removeEventListener('pointerleave', leave);
      btn.removeEventListener('focus', focus);
      btn.removeEventListener('blur', blur);
    });
  });
  return () => off.forEach((f) => f());
});
