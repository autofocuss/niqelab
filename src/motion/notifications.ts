// The hero's phone shows ONE notification banner at a time, the way a real
// push notification actually arrives on a lock screen: it slides down from
// under the Dynamic Island, holds, then slides back up and out before the
// next one takes its place (DESIGN.md addendum). Runs on the engine's single
// clock (GSAP ticker via ScrollTrigger), pauses off screen and under reduced
// motion, and is torn down on navigation.
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
  const banner = root.querySelector<HTMLElement>('[data-slot]');
  if (!pool.length || !banner || prefersReducedMotion()) return;

  let cursor = 1;
  const next = () => { const n = pool[cursor % pool.length]; cursor++; return n; };

  function paint(n: Notice) {
    banner!.querySelector('[data-slot-icon]')!.textContent = icons[n.app] ?? n.app[0];
    banner!.querySelector('[data-slot-app]')!.textContent = n.app.toUpperCase();
    banner!.querySelector('[data-slot-time]')!.textContent = n.time;
    banner!.querySelector('[data-slot-lead]')!.textContent = n.lead;
    banner!.querySelector('[data-slot-text]')!.textContent = n.body;
  }

  gsap.set(banner, { autoAlpha: 0, y: -36, filter: 'blur(4px)' });

  const tl = gsap.timeline({ repeat: -1, paused: true, repeatDelay: 2.8 });
  tl.to(banner, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.55, ease: ease.spring })
    .to(banner, { autoAlpha: 0, y: -16, filter: 'blur(3px)', duration: 0.4, ease: ease.soft }, '+=2.2')
    .call(() => { paint(next()); gsap.set(banner, { y: -36 }); });

  const st = ScrollTrigger.create({
    trigger: root,
    start: 'top 95%',
    end: 'bottom 5%',
    onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
  });

  return () => { tl.kill(); st.kill(); };
});
