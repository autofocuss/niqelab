// Handles [data-stripe-checkout] buttons (Cta99Button.astro, Price-ID path):
// lazy-loads Stripe.js only when someone actually clicks, then redirects to
// Stripe's own hosted checkout page. Never touches a secret key -- the
// publishable key is safe to ship client-side by design.
import { onPage } from '../engine';

let stripeJsPromise: Promise<void> | null = null;
function loadStripeJs(): Promise<void> {
  if (stripeJsPromise) return stripeJsPromise;
  stripeJsPromise = new Promise((resolve, reject) => {
    if ((window as any).Stripe) return resolve();
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Could not load Stripe.js'));
    document.head.appendChild(script);
  });
  return stripeJsPromise;
}

export const startCheckout99 = () => onPage(() => {
  const off: (() => void)[] = [];

  document.querySelectorAll<HTMLButtonElement>('[data-stripe-checkout]').forEach((btn) => {
    const handler = async () => {
      const label = btn.querySelector<HTMLElement>('[data-stripe-label]');
      const original = label?.textContent;
      btn.disabled = true;
      if (label) label.textContent = 'Opening checkout…';
      try {
        await loadStripeJs();
        const stripe = (window as any).Stripe(btn.dataset.pubkey);
        const { error } = await stripe.redirectToCheckout({
          lineItems: [{ price: btn.dataset.priceId, quantity: 1 }],
          mode: 'payment',
          successUrl: btn.dataset.successUrl,
          cancelUrl: btn.dataset.cancelUrl,
        });
        if (error) throw error;
      } catch {
        btn.disabled = false;
        if (label) label.textContent = original || 'Buy now — $99 →';
      }
    };
    btn.addEventListener('click', handler);
    off.push(() => btn.removeEventListener('click', handler));
  });

  return () => off.forEach((f) => f());
});
