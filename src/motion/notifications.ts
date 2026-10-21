// The hero's notification stack is a looping feed, not a one-shot reveal:
// every few seconds the oldest card leaves, the rest shift down, and a new
// one arrives already "racking into focus" (blur -> sharp), tying the
// hero's proof moment into the site's own concept (DESIGN.md addendum).
// Runs on the engine's single clock (GSAP ticker via ScrollTrigger), pauses
// off screen and under reduced motion, and is torn down on navigation.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, prefersReducedMotion, ease } from '../engine';

type Notice = { app: string; time: string; lead: string; body: string };

const icons: Record<string, string> = {
  'Website form': 'W',
  WhatsApp: 'WA',
  Bookings: '✓',
  Search: 'S',
  Maps: 'M',
  Analytics: 'A',
};

export const startNotifyLoop = () => onPage(() => {
  const root = document.querySelector<HTMLElement>('[data-notify]');
  if (!root) return;

  const poolRaw = root.dataset.notifyPool;
  let pool: Notice[] = [];
  try { pool = poolRaw ? JSON.parse(poolRaw) : []; } catch { pool = []; }
  const slots = Array.from(root.querySelectorAll<HTMLElement>('[data-slot]'));
  if (!pool.length || slots.length < 2 || prefersReducedMotion()) return;

  let cursor = parseInt(root.dataset.notifyStart || String(slots.length), 10) || slots.length;
  const next = () => { const n = pool[cursor % pool.length]; cursor++; return n; };

  function paint(el: HTMLElement, n: Notice) {
    el.querySelector('[data-slot-icon]')!.textContent = icons[n.app] ?? n.app[0];
    el.querySelector('[data-slot-app]')!.textContent = n.app.toUpperCase();
    el.querySelector('[data-slot-time]')!.textContent = n.time;
    el.querySelector('[data-slot-lead]')!.textContent = n.lead;
    el.querySelector('[data-slot-text]')!.textContent = n.body;
  }

  const tl = gsap.timeline({ repeat: -1, paused: true, repeatDelay: 2.6 });
  tl.to(slots[slots.length - 1], { autoAlpha: 0, y: 10, duration: 0.35, ease: ease.soft })
    .call(() => {
      for (let i = slots.length - 1; i > 0; i--) {
        const prevText = {
          icon: slots[i - 1].querySelector('[data-slot-icon]')!.textContent,
          app: slots[i - 1].querySelector('[data-slot-app]')!.textContent,
          time: slots[i - 1].querySelector('[data-slot-time]')!.textContent,
          lead: slots[i - 1].querySelector('[data-slot-lead]')!.textContent,
          text: slots[i - 1].querySelector('[data-slot-text]')!.textContent,
        };
        slots[i].querySelector('[data-slot-icon]')!.textContent = prevText.icon;
        slots[i].querySelector('[data-slot-app]')!.textContent = prevText.app;
        slots[i].querySelector('[data-slot-time]')!.textContent = prevText.time;
        slots[i].querySelector('[data-slot-lead]')!.textContent = prevText.lead;
        slots[i].querySelector('[data-slot-text]')!.textContent = prevText.text;
      }
      paint(slots[0], next());
      gsap.set(slots[0], { autoAlpha: 0, y: -10, filter: 'blur(5px)' });
      for (let i = 1; i < slots.length; i++) gsap.set(slots[i], { autoAlpha: 1, y: 0 });
    })
    .to(slots[0], { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.5, ease: ease.out });

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 95%',
    end: 'bottom 5%',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });

  return () => { tl.kill(); st.kill(); };
});
