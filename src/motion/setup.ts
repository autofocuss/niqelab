// Global motion for NiqeLab: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { setLoaderFormat, setLoaderExit, setTransition, ease } from '../engine';
import { startFocus } from './focus';
import { startIdle } from './idle';
import { startButtonFill } from './buttonFill';
import { startInquiry } from './inquiry';
import { startBooking } from './booking';
import { startNotifyLoop } from './notifications';

// The click point the iris transition opens/closes from (DESIGN.md "signature moment").
let point = { x: innerWidth / 2, y: innerHeight / 2 };

export function setupMotion() {
  setLoaderFormat((p) => String(Math.round(p)).padStart(3, '0'));

  // Loader -> hero handoff: the aperture mark's petals step in through opacity only (never
  // rotate -- the client's locked brand rule), then the loader lifts to reveal the hero already
  // in focus.
  setLoaderExit((root) =>
    gsap.timeline()
      .to(root.querySelectorAll('[data-loader-petal]'), {
        opacity: 1, duration: 0.16, stagger: 0.018, ease: ease.soft,
      })
      .to(root.querySelectorAll('[data-loader-out]'), {
        yPercent: -110, duration: 0.26, ease: ease.inOut, stagger: 0.02,
      }, '+=0.02')
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.32, ease: ease.inOut }, '-=0.15')
  );

  // Page transition: a literal aperture iris closing over the click point, then reopening on
  // the new page -- "rack focus" between pages instead of a hard cut.
  addEventListener('pointerdown', (e) => { point = { x: e.clientX, y: e.clientY }; });
  setTransition({
    leave: (c) => gsap.timeline()
      .set(c, { autoAlpha: 1 })
      .fromTo(c.querySelector('.curtain__panel'),
        { clipPath: `circle(0% at ${point.x}px ${point.y}px)` },
        { clipPath: `circle(150% at ${point.x}px ${point.y}px)`, duration: 0.85, ease: ease.inOut }),
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__panel'), { clipPath: 'circle(0% at 50% 50%)', duration: 0.85, ease: ease.inOut })
      .set(c, { autoAlpha: 0 }),
  });

  startIdle();
  startFocus();
  startButtonFill();
  startInquiry();
  startBooking();
  startNotifyLoop();
}
