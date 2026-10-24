// All visible copy and content lives here (content.md). No invented facts: every project below
// is a real, live site with a real URL. The notification stack on the home hero is an honest
// illustration of what a good site produces (a lead, a booking, a chat), not a claimed screenshot
// of any client's real dashboard -- the same technique brandeddoctor.com uses with its own
// generic "Dr. Your Name" placeholder device.

export type Project = {
  slug: string;
  title: string;
  domain: string;
  url: string;
  kind: string;
  note: string;
  image: string;
  tint: string;
  accent: string;
};

export const site = {
  name: 'NiqeLab',
  role: 'Website design and build studio',
  url: 'https://autofocuss.github.io/niqelab/',
  description: 'NiqeLab designs and builds websites that turn visitors into enquiries, bookings and calls.',
  email: 'sales@autofocuss.in',
  ccEmail: 'anirudha@autofocuss.com',
  whatsapp: '917499793646',
  web3formsKey: '39f53593-8646-4a35-87fa-79d7287c158f',
  location: 'Mumbai, India',
};

export const projects: Project[] = [
  {
    slug: 'dr-vivek-gaur',
    title: 'Dr. Vivek Gaur',
    domain: 'docvivekgaur.com',
    url: 'https://docvivekgaur.com',
    kind: 'Dental implant clinic',
    note: 'A consultation-booking site built around trust: the treatment, the technology and the first appointment, in that order.',
    image: '/niqelab/images/docvivekgaur.jpg',
    tint: '#EAF2FB',
    accent: '#2451C7',
  },
  {
    slug: 'evoptix',
    title: 'EVOptix',
    domain: 'evoptix.com',
    url: 'https://evoptix.com',
    kind: 'EV charger storefront',
    note: 'A product storefront where the install process and the warranty get equal billing with the hardware.',
    image: '/niqelab/images/evoptix.jpg',
    tint: '#EAF7E0',
    accent: '#4CA82F',
  },
  {
    slug: 'electric-miles',
    title: 'Electric Miles',
    domain: 'electricmiles.com',
    url: 'https://electricmiles.com',
    kind: 'B2B SaaS, EV charging operations',
    note: 'An enterprise product site that has to speak to operators, installers and drivers on the same page.',
    image: '/niqelab/images/electricmiles.jpg',
    tint: '#EFEDFF',
    accent: '#5B4FE8',
  },
  {
    slug: 'easy-boba',
    title: 'Easy Boba',
    domain: 'easyboba.in',
    url: 'https://easyboba.in',
    kind: 'Bubble tea franchise',
    note: 'A franchise site doing two jobs at once: selling the drink, and selling the franchise opportunity.',
    image: '/niqelab/images/easyboba.jpg',
    tint: '#F5F8E3',
    accent: '#9FBB2E',
  },
  {
    slug: 'studio-rs',
    title: 'Studio RS',
    domain: 'studiors.in',
    url: 'https://studiors.in',
    kind: 'Interior design studio',
    note: 'A portfolio where the photography carries the site and the layout stays out of its way.',
    image: '/niqelab/images/studiors.jpg',
    tint: '#EEF2E7',
    accent: '#6F8F5B',
  },
  {
    slug: 'sabaku-tours',
    title: 'Sabaku Tours',
    domain: 'sabakutours.com',
    url: 'https://sabakutours.com',
    kind: 'Morocco tour operator',
    note: 'A booking-first site for a business that lives or dies on how real the trip looks before anyone pays.',
    image: '/niqelab/images/sabakutours.jpg',
    tint: '#F7EEDF',
    accent: '#B65A33',
  },
  {
    slug: 'shreejii-bottle',
    title: 'Shreejii Bottle',
    domain: 'shreejiibottle.in',
    url: 'https://shreejiibottle.in',
    kind: 'B2B glass bottle manufacturer',
    note: 'A fifty-year-old manufacturer’s first real website: a catalogue and an enquiry form, nothing it does not need.',
    image: '/niqelab/images/shreejiibottle.jpg',
    tint: '#F5EEE0',
    accent: '#8A5A2B',
  },
  {
    slug: 'autofocuss',
    title: 'Autofocuss',
    domain: 'autofocuss.com',
    url: 'https://autofocuss.com',
    kind: 'Growth consulting site',
    note: 'A site built to qualify a visitor in one scroll: the niche, the numbers, the call.',
    image: '/niqelab/images/autofocuss.jpg',
    tint: '#EEF1F5',
    accent: '#2F6FED',
  },
  {
    slug: 'ugc-waitlist',
    title: 'UGC Waitlist',
    domain: 'ugc.autofocuss.in',
    url: 'https://ugc.autofocuss.in',
    kind: 'Landing and waitlist page',
    note: 'A single-purpose page: one offer, one form, nothing to click except join.',
    image: '/niqelab/images/ugcautofocuss.jpg',
    tint: '#E7F6F3',
    accent: '#3FA89C',
  },
];

export type Notification = { app: string; time: string; lead: string; body: string };
// A larger pool than the visible stack (5 slots) so the looping notification
// stream (NotificationStack.astro + motion/notifications.ts) runs a while
// before repeating. Illustrative, not real client data — see the component.
export const notifications: Notification[] = [
  { app: 'Website form', time: 'now', lead: 'New enquiry received', body: '"Do you have anything available this week?"' },
  { app: 'WhatsApp', time: 'now', lead: 'A visitor started a chat', body: 'From the button on your homepage' },
  { app: 'Bookings', time: 'now', lead: 'New appointment booked', body: 'Thursday, 11:00 AM, via your site' },
  { app: 'Search', time: 'now', lead: 'Your site is now showing', body: 'For searches near you' },
  { app: 'Analytics', time: 'now', lead: '14 people viewed your pricing', body: 'In the last 24 hours' },
  { app: 'Website form', time: 'now', lead: 'New enquiry received', body: '"Can you call me back today?"' },
  { app: 'Maps', time: 'now', lead: 'Your listing was viewed', body: '6 times in the last hour' },
  { app: 'WhatsApp', time: 'now', lead: 'A visitor started a chat', body: '"What are your prices?"' },
  { app: 'Bookings', time: 'now', lead: 'New appointment booked', body: 'Tomorrow, 3:30 PM, via your site' },
  { app: 'Analytics', time: 'now', lead: 'Your site loaded in 1.2s', body: 'On a mobile connection' },
  { app: 'Website form', time: 'now', lead: 'New enquiry received', body: '"Do you deliver outside the city?"' },
  { app: 'Search', time: 'now', lead: 'A visitor found you on Google', body: 'Searching your business name' },
];

export type Package = {
  id: string;
  tag: string;
  name: string;
  features: string[];
  featured?: boolean;
};
export const packages: Package[] = [
  { id: 'launch', tag: 'Launch', name: 'One-off site', features: ['1 to 5 pages', 'A design built for your business, not a template', 'Live in weeks'] },
  { id: 'grow', tag: 'Grow', name: 'Site and CMS', features: ['Unlimited pages you can edit yourself', 'Enquiry and booking forms built in', 'Ongoing design support'], featured: true },
  { id: 'retain', tag: 'Retain', name: 'Design retainer', features: ['New pages every month', 'One designer who knows your business', 'Pause or cancel any time'] },
];
