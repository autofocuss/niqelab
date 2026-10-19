// The driver module for NiqeLab's signature moment (DESIGN.md "Signature moment implementation").
// One shared formula -> every [data-focus] element: how far its center sits from the viewport's
// focal center decides how blurred, scaled down and faded it is. Nothing is ever blurred under
// reduced motion: that state is the concept's resting "in focus" promise (DESIGN.md).
import { gsap } from 'gsap';
import { onPage, onScroll, isMobile } from '../engine';
import { idle } from './idle';

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** distance: 0 at the focal center, 1 at the edge of the focus band. */
function focusFor(distance: number) {
  const d = clamp(Math.abs(distance), 0, 1);
  const eased = d * d; // quadratic falloff: stays sharp longer near center
  return {
    blur: lerp(0, 7, eased),
    scale: lerp(1, 0.96, eased),
    opacity: lerp(1, 0.55, eased),
  };
}

let targets: HTMLElement[] = [];
let sharpest: HTMLElement | null = null;

function apply() {
  if (!targets.length) return;
  const focalY = innerHeight * (isMobile() ? 0.42 : 0.5);
  const band = innerHeight * 0.9;
  let best: HTMLElement | null = null;
  let bestD = Infinity;
  for (const el of targets) {
    const r = el.getBoundingClientRect();
    const center = r.top + r.height / 2;
    const d = (center - focalY) / band;
    const f = focusFor(d);
    gsap.set(el, { filter: `blur(${f.blur.toFixed(2)}px)`, scale: f.scale, opacity: f.opacity });
    if (Math.abs(d) < bestD) { bestD = Math.abs(d); best = el; }
  }
  sharpest = bestD < 0.35 ? best : null;
}

export function startFocus() {
  onScroll(() => apply());
  onPage(() => {
    targets = [...document.querySelectorAll<HTMLElement>('[data-focus]')];
    apply();
    const tick = () => {
      if (!sharpest) return;
      // idle breathing: the sharpest tile keeps a faint drift so the page never freezes at rest
      const drift = Math.sin(idle.t * 0.5) * 0.012;
      gsap.set(sharpest, { scale: 1 + drift * 0.3 });
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); targets = []; sharpest = null; };
  });
  addEventListener('resize', apply, { passive: true });
}
