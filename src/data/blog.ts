export type Post = {
  slug: string;
  tag: string;
  readTime: string;
  title: string;
  dek: string;
  cover: { tint: string; accent: string }; // no real post photography yet: an on-brand
  // generated cover (the aperture mark, tinted) stands in rather than a stock photo.
  body: { h?: string; p?: string; ul?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: 'why-your-website-needs-exactly-one-job',
    tag: 'Craft',
    cover: { tint: '#FDE9E1', accent: '#B33818' },
    readTime: '4 min read',
    title: 'Why your website needs exactly one job',
    dek: 'Most sites try to do everything and end up doing nothing well. Here is how to find the one job yours should do.',
    body: [
      { p: 'Open ten competitor homepages in your industry and you will see the same pattern: a hero slider cycling through five different messages, a nav bar with eleven items, a page trying to be a brochure, a resume, a store and a blog all at once. None of it is badly designed in isolation. It is badly prioritized, and prioritization, not decoration, is most of what separates a site that converts from one that just sits there.' },
      { h: 'Start with the one sentence a visitor needs to act on' },
      { p: 'Every page that works has an answer to one question: what is the single next action a visitor should take, and what is the minimum they need to believe before they take it. For a dental implant clinic, that is book a consultation, and the belief required is this is a credible, safe procedure. Everything else, the awards, the technology explainer, the founder bio, exists to support that one belief, not to compete with it.' },
      { p: 'When a site has five jobs instead of one, visitors do not do all five. They do the one that is easiest to find, or they do none, because nothing on the page makes the decision for them.' },
      { h: 'The test: delete sections until it breaks' },
      { p: 'A useful exercise is to go through your homepage section by section and ask: if I deleted this, would the one action get weaker? If the answer is no, the section is there for a reason that is not the visitor’s, usually because someone internally wanted it included. That is not a design problem, it is a scoping problem, and it has to be solved before a single pixel gets designed.' },
      { ul: [
        'If a section does not move someone closer to the one action, cut it or move it to a secondary page.',
        'If a section repeats a claim already made elsewhere, merge it.',
        'If a section exists because a competitor has it, that is the weakest reason to keep anything.',
      ] },
      { h: 'One job does not mean one page' },
      { p: 'This is not an argument for a single-page site with nothing on it. A site can have a blog, a pricing page, a careers page, plenty of pages, each doing its own one job. The mistake is cramming all of those jobs onto the page that gets the most traffic, usually the homepage, because it feels efficient. It is not. A homepage that tries to be the pricing page, the portfolio and the contact form at once ends up being a worse version of all three.' },
      { p: 'We build this site the same way: the homepage’s one job is to show you that your site could be losing you customers, and what that looks like fixed. Everything after that, the work, the packages, this post, lives on its own page, doing its own job.' },
    ],
  },
  {
    slug: 'the-real-cost-of-template-websites',
    tag: 'Strategy',
    cover: { tint: '#EDE7FB', accent: '#5A35C9' },
    readTime: '5 min read',
    title: 'The real cost of template websites',
    dek: 'A template looks cheap on the invoice. The cost shows up later, in positioning, in trust, and in how many times you end up paying to redo it.',
    body: [
      { p: 'Template websites exist because the first version of a business’s web presence is usually built under time pressure, with a budget that is going somewhere else: product, hiring, inventory. That is a reasonable trade-off for a month. The problem is how often it quietly becomes permanent, and how much it costs once it does.' },
      { h: 'The positioning tax' },
      { p: 'A template is, by definition, shared. The same layout, the same section order, the same stock-photo hero treatment that a thousand other businesses are using this month. For a visitor comparing you to a competitor, a templated site does not signal smaller company, earlier stage. It signals interchangeable with the other options. That is the opposite of what most businesses need their site to do, especially anywhere the sale depends on trust: healthcare, high-ticket services, B2B.' },
      { p: 'You can have excellent service and a mediocre-looking site and still lose deals to a competitor who simply looks more credible on first impression. First impressions on the web are formed in under a second, and most of that second is spent reacting to layout and type, not reading copy.' },
      { h: 'The redesign-churn tax' },
      { p: 'Templates are built to be generic, which means they resist being customized without breaking. Ask for one specific layout change, a different hero structure, a non-standard pricing table, and you either cannot do it inside the template’s constraints, or you end up paying a developer to hack around them, which usually costs more than custom work would have in the first place.' },
      { p: 'This is why so many small businesses redesign their site every twelve to eighteen months: not because the brand changed, but because the template kept fighting the content. A custom-built site, scoped properly from the start, tends to last years with incremental updates instead of full rebuilds.' },
      { h: 'What actually scales from a template' },
      { p: 'None of this is an argument that every business needs a bespoke site from day one. A template is a legitimate choice for validating an idea fast, cheap, with no real content yet. The mistake is treating it as the long-term answer once the business is real, has real customers, and real differentiation worth communicating.' },
      { ul: [
        'If you are pre-revenue and testing an idea, a template is the right call. Do not over-invest.',
        'If you have real customers and a real sales process, the site is now a sales asset, and it is worth treating like one.',
        'The signal to switch: when you are asking a developer to just make it look like X, and it still does not, because the template’s structure will not allow it.',
      ] },
      { p: 'The honest version of this math: a custom site costs more upfront and less over three years than a template does, once you count every redesign, every workaround, and every deal that quietly went to the competitor who looked more credible at first glance.' },
    ],
  },
  {
    slug: 'what-premium-actually-means-in-web-design',
    tag: 'Design',
    cover: { tint: '#F3F6E3', accent: '#6F7A1E' },
    readTime: '5 min read',
    title: 'What premium actually means in web design',
    dek: 'Clients ask for a site that looks premium more often than anything else. It is rarely about budget. It is a short list of specific, learnable decisions.',
    body: [
      { p: 'Premium is one of the vaguest briefs a designer can get, because it describes a feeling rather than a spec. But when you break down sites that actually read as premium versus ones that do not, the gap usually comes down to the same handful of decisions, repeated consistently. None of them require a bigger budget. Most of them require restraint.' },
      { h: 'Restraint on color, not absence of it' },
      { p: 'Cheap-looking sites often have either no color discipline, five competing accent colors, or no color at all: safe, grey, forgettable. Premium sites tend to commit to one or two accent colors, used deliberately, one for primary actions, maybe a second for emphasis, and everything else is handled by a considered neutral, not default white or default grey.' },
      { h: 'Type pairing that is not the default' },
      { p: 'Every page-builder ships with the same two or three safe font pairings. A site that uses exactly those defaults, at exactly the default sizes, reads as unfinished even if the content is good, because the type is doing nothing to support the brand. A deliberate pairing, a characterful display face for headlines, a clean workhorse for body text, costs nothing extra and changes the entire impression in the first two seconds.' },
      { h: 'Whitespace is not empty space' },
      { p: 'The most common gap between an amateur layout and a professional one is spacing discipline: consistent gaps between elements, a clear hierarchy of what is grouped together versus separated, and enough room around important elements that they do not compete with their neighbors. Cramming more onto a screen does not communicate more value. It communicates less confidence in what is actually being said.' },
      { h: 'Motion that explains, not motion that decorates' },
      { p: 'Animation is the easiest thing to overdo and the easiest thing to tell apart from the real thing. Premium motion has a job: it shows what changed, draws attention to the one thing that matters next, or adds a small moment of delight at a natural pause. Decorative motion, things spinning or bouncing with no relationship to what the visitor is doing, reads as noise, and often as a sign the designer did not have a stronger idea.' },
      { h: 'Real content over placeholder content' },
      { p: 'This is the one that is hardest to fix with design alone, and the one that matters most. A beautifully designed layout filled with generic stock copy still reads as a template, because visitors are reacting to whether the words sound like they came from a real, specific business. Specific numbers, specific client names, specific process steps beat generic claims every time.' },
      { ul: [
        'Pick two or three colors and use them with intent, not five just in case.',
        'Choose typefaces deliberately. Avoid the page-builder defaults at default settings.',
        'Give elements room to breathe. Spacing is a hierarchy signal, not wasted real estate.',
        'Animate only what explains a change or earns a moment of delight.',
        'Replace every placeholder sentence with a real, specific one before launch.',
      ] },
    ],
  },
];
