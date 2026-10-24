// Real per-app icon glyphs for the hero phone's notification banner (stylized,
// not exact logo reproductions) so each notification reads as WhatsApp, Gmail,
// Maps etc. at a glance instead of a plain letter badge. Shared between
// NotificationStack.astro (initial server-rendered icon) and
// motion/notifications.ts (swapped in as each notification cycles in).
export type NotifyIcon = { bg: string; svg: string };

const whatsapp = `<svg viewBox="0 0 32 32" width="18" height="18" fill="#fff"><path d="M16.001 3C9.096 3 3.5 8.597 3.5 15.5c0 2.33.638 4.512 1.746 6.384L3 29l7.32-2.21a12.43 12.43 0 0 0 5.68 1.385C22.905 28.175 28.5 22.58 28.5 15.676 28.5 8.773 22.905 3.176 16.001 3Zm0 22.7a10.08 10.08 0 0 1-5.148-1.41l-.37-.22-3.86 1.166 1.19-3.76-.24-.386a10.1 10.1 0 0 1-1.573-5.39c0-5.59 4.552-10.14 10.15-10.14 5.597 0 10.14 4.55 10.14 10.14 0 5.59-4.55 10.14-10.15 10.14Zm5.564-7.59c-.305-.153-1.804-.89-2.084-.992-.28-.102-.484-.153-.688.153s-.79.99-.968 1.195c-.178.204-.356.23-.661.077-.305-.153-1.287-.474-2.452-1.513-.906-.808-1.518-1.806-1.696-2.111-.178-.306-.019-.47.134-.622.137-.137.305-.356.457-.535.153-.178.204-.306.306-.51.102-.204.051-.383-.026-.536-.077-.153-.688-1.659-.943-2.272-.248-.598-.5-.517-.688-.527l-.586-.01c-.204 0-.535.077-.815.383s-1.068 1.043-1.068 2.545c0 1.502 1.093 2.953 1.246 3.158.153.204 2.15 3.283 5.208 4.603.728.314 1.295.502 1.738.643.73.232 1.394.2 1.92.121.586-.087 1.804-.737 2.058-1.449.254-.712.254-1.322.178-1.45-.076-.127-.28-.204-.585-.357Z"/></svg>`;

const email = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="M3.5 6.5l8.5 7 8.5-7"/></svg>`;

const calendar = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="3"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/><path d="M8.5 14.2l2 2 4.5-4.5"/></svg>`;

const search = `<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.6-4.6"/></svg>`;

const maps = `<svg viewBox="0 0 24 24" width="17" height="19"><path fill="#EA4335" d="M12 1.5c-4.4 0-8 3.5-8 7.9 0 5.9 8 13.1 8 13.1s8-7.2 8-13.1c0-4.4-3.6-7.9-8-7.9Z"/><circle cx="12" cy="9.4" r="3" fill="#fff"/></svg>`;

const analytics = `<svg viewBox="0 0 24 24" width="17" height="17" fill="#fff"><rect x="2.5" y="12" width="4.2" height="9.5" rx="1"/><rect x="9.9" y="6.5" width="4.2" height="15" rx="1"/><rect x="17.3" y="2.5" width="4.2" height="19" rx="1"/></svg>`;

export const notifyIcons: Record<string, NotifyIcon> = {
  WhatsApp: { bg: '#25D366', svg: whatsapp },
  Email: { bg: '#EA4335', svg: email },
  'Website form': { bg: '#EA4335', svg: email },
  Bookings: { bg: '#5A35C9', svg: calendar },
  Search: { bg: '#4285F4', svg: search },
  Maps: { bg: '#FFFFFF', svg: maps },
  Analytics: { bg: '#FF5A3C', svg: analytics },
};

export function iconFor(app: string): NotifyIcon {
  return notifyIcons[app] ?? { bg: '#FF5A3C', svg: `<span style="font-weight:700;font-size:0.62rem;color:#fff">${app[0] ?? '?'}</span>` };
}
