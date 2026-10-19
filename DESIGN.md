# NiqeLab — Design

## Phase 0: Brief

- **Subject:** NiqeLab, a website design & build studio. Sibling brand to Autofocuss Marketing
  (an India-based growth agency). NiqeLab's entire scope is designing and building websites —
  nothing else (no ads, no social, no SEO retainers).
- **Audience:** founders and marketers at small-to-mid businesses (clinics, D2C brands, SaaS,
  manufacturers, interior/creative studios, tour operators) who need one serious website, not a
  full agency retainer.
- **Job of the site:** convince a visitor NiqeLab is a specialist worth a closer look, show real
  proof (9 live sites), make the three packages legible, and get an inquiry started (email, with
  a pre-filled message per package).
- **Assets provided:** an established, non-negotiable brand: the name "NiqeLab", a six-petal
  pinwheel aperture mark (coral #FF5A3C / indigo #4F46FF, static — must never rotate), a palette
  (ink #0E0E13, paper #F7F4EC, coral, indigo, lime #D6FF3F), 9 real client/partner site
  screenshots with live URLs, 3 real case-study proof points sourced from Autofocuss's own
  published results, and 3 already-written blog posts.
- **Constraints from the client's own iteration history:** light background, not dark/moody;
  real scroll motion, not static fades; the logo mark is final — do not redesign it or spin it;
  genuinely separate pages with working nav; portfolio tiles tinted per-project; package cards
  must open a working, pre-filled email inquiry.
- **Language:** English.

## Phase 1: Concept

Three concepts, from three different territories:

| | A. Name / identity | B. Material (ticket/spec sheet) | C. Formal (lens scale) |
|---|---|---|---|
| Idea | NiqeLab's own mark is a six-petal aperture. The site performs what an aperture does: one thing is ever in sharp focus, everything else around it is softly out of focus, until you bring it forward | The studio already speaks in cut-tickets and spec labels (established in the current site). The whole site is printed stock: perforated, torn, stamped | The site is a lens barrel's focus-distance scale: one ruler runs through every page, content snaps to its marks |
| Layout | Index and section rhythm driven by one function: distance-from-viewport-center maps to blur/scale/opacity for every block | Ticket-shaped cards everywhere, torn section edges, rubber-stamp marks | Content pinned to ruler positions; horizontal ruler as the spine of every page |
| Motion verb | "pull focus" — rack from soft to sharp, never a hard cut | "tear and stamp" | "slide along the barrel" |
| Signature | page transition is a literal aperture iris (clip-path circle) closing then reopening from the click point; the work index keeps every tile softly defocused until it is the one nearest center / under the pointer, which snaps sharp | a torn perforation wipes between pages | the ruler's focus mark slides to the active section |
| Screenshot | a work index mid-scroll: one tile razor sharp, its neighbors softly blurred | a ticket card with a real torn edge | the ruler with the mark resting on "0.6 m" |
| O / F / Fe / P | 4 / 5 / 5 / 1 | 3 / 4 / 4 / 4 | 3 / 3 / 3 / 2 |

**Anchor for A:** the mark NiqeLab already ships (a static six-petal aperture) and the studio's
own stated value proposition ("one craft, not a bundle" — focus, not spread). Swap test: put a
different studio's name into concept A and it stops making sense, because it depends on
NiqeLab's actual logo and actual positioning sentence. Portability scores 1.

**Pick A.** It is the only one of the three that is generated directly by a brand element the
client has already locked (the aperture mark) rather than invented from scratch, it needs no
WebGL to execute well (pure CSS `filter: blur()` + `transform: scale()` driven by
`ScrollTrigger`), and it survives to the footer, the case pages and the 404 (an aperture that
never finds focus). Stealing from B for one detail: the package cards keep their "ticket" cut
line, since it is specific, already client-approved, and costs nothing to keep.

**Concept Card**
```
Idea:        NiqeLab's site works like a camera aperture: one thing is in focus, everything
             else nearby is soft, and bringing something forward is the entire interaction.
Metaphor:    a lens finding focus
Signature:   scroll- and pointer-driven focus pull across every list and section (one shared
             function: distance from the viewport's focal center -> blur / scale / opacity);
             page transitions are a literal iris closing over the click point and reopening
             on the new page
Emotion:     calm precision — "this studio only does one thing, and does it exactly right"
Motion verb: rack focus: soft to sharp, never a hard cut
Screenshot:  the work index mid-scroll, one project tile sharp, its neighbors gently blurred
```

Genericness test: "racking focus on hover" alone is a style (seen on photography sites). What
makes this non-generic is that it is NOT a hover gimmick: it is the single rule that governs
hero entry, the work index at rest, section pacing down the page, the page transition AND the
404 (a page that can't find focus) — one function, four very different places. A generic model
asked for "a web studio site" would default to a Swiss-index template with fade-ups; it would
not derive the page transition and the 404 from the client's own logo mark.

## Phase 2: Art direction

**Stack:** Astro. This is a content-only marketing/portfolio showcase (no auth, no dynamic data,
no API routes) where the motion IS the product; Astro ships ~75 KB of JS versus ~250 KB for an
equivalent Next.js build, and its ClientRouter lets the leave animation overlap with the next
page's fetch, which matters for a "pull focus" transition to feel instant.

**Palette** (named by role; AI-default palettes avoided — this is the client's own locked
system, not a reflexive choice):
```
--c-bg:      #F7F4EC   paper, warm off-white — the "ground" of the studio
--c-fg:      #0E0E13   ink, near-black
--c-muted:   #716C61   secondary text, passes AA on paper
--c-line:    rgb(14 14 19 / 0.14)   hairlines
--c-accent:  #FF5A3C   coral — primary accent, CTAs, focus marks
--c-accent-2:#4F46FF   indigo — secondary, the "soft" half of the aperture pairing
--c-pop:     #D6FF3F   lime — rare, one CTA or highlight per screen
--c-curtain: #0E0E13   the iris transition panel
```
Pure black/white avoided on purpose: the client explicitly rejected dark/moody and "AI-looking"
palettes in earlier iteration; paper + ink + the two brand accents reads premium without going
corporate-safe or cliché-vibrant.

**Type.** Display: Bricolage Grotesque (expressive optical-size grotesk — already approved by
the client, not in the overused-defaults list). Accent (the "soft focus" voice, used only for
the word or phrase that is the sentence's point, never decoratively): Zodiak italic — this
replaces Fraunces, which the client's reference site (neutomni.com) uses and which the client
liked, but which is flagged as an overused AI-generator default; Zodiak gives the same
grotesk+serif-italic contrast with a less generic face. Text/UI: Plus Jakarta Sans (already
approved, avoids the Inter/Roboto default). Data/meta: Space Mono (already approved).
```
--f-display: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif;
--f-accent:  'Zodiak', ui-serif, Georgia, serif;   /* italic only */
--f-body:    'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
--f-mono:    'Space Mono', ui-monospace, SFMono-Regular, monospace;
```
Display sizes run large (`--t-mega` to `--t-xl`), tracking -0.03 to -0.045em, leading 0.92-1.0.
Italic accent is used ONLY on the word that is the sentence's actual subject ("in focus",
"exactly right"), never as a blanket style — this is the one place the skill's "avoid: accenting
one word in italic as the only typographic idea" default applies on its face, but here the
italic word is load-bearing: it is always the one word a viewer should actually read first,
mirroring the concept's own "one thing sharp" rule, not decoration.

**Grid & rhythm.** 12 columns, gutter `--gutter`. Three strong vertical lines: col 1 (all body
copy and nav), col 5 (where secondary content starts in asymmetric pairs), col 9 (where meta /
numbers / captions sit). Section rhythm varies: hero is full-viewport-minus-nav, work index is
airy (28u), case-style proof strip is tight (8u, dense), packages is normal (16u).

**Shape.** One radius rule: 14px on cards and tiles, 999px (full pill) on buttons and tags —
echoing the aperture's own circular form. No radius on full-bleed section edges.

**Motion language.** Eases: `expo.out` entrances, `expo.inOut` curtain/transition, `power3.out`
small UI, `back.out(1.6)` used once (the loader handoff), never elsewhere. Durations per
`motion.md`'s timing table. The verb is "rack focus": every reveal moves through a blur+scale
state, not just opacity/y.

**Composition plan** (section family changes every time — no two sections share a layout):
```
HOME
┌─────────────────────────────────────────┐
│ [04] corner nav: niqelab · Work Packages │  <- four-corner frame
│      Blog About          [Start a project]│
├─────────────────────────────────────────┤
│                                           │
│   WE DESIGN WEBSITES                     │  <- Poster hero, one line,
│   THAT ACTUALLY                          │     italic accent on the
│   get looked at twice.                   │     one load-bearing word
│                                           │
├───────────────┬───────────────────────────┤
│ what niqelab  │ what it doesn't do        │  <- Asymmetric pair
│ does (ink)    │ (paper)                   │
├─────────────────────────────────────────┤
│  [sharp]   [soft]   [soft]               │  <- Index list, focus-pull:
│  Dr Vivek  Electric  Studio RS           │     nearest-center tile sharp,
│  Gaur      Miles                         │     neighbors blurred
├─────────────────────────────────────────┤
│ 01 02 03 04  (process, tight rhythm)     │  <- Data/facts family
├─────────────────────────────────────────┤
│ LAUNCH  │  GROW  │  RETAIN               │  <- 3 ticket cards, torn edge
├─────────────────────────────────────────┤
│         FOOTER AS FINALE                  │  <- giant wordmark, real links
└─────────────────────────────────────────┘

WORK INDEX (/work/)
  full-width rows, title + domain + one line, hover/center pulls that
  row's screenshot into a floating sharp preview that follows the pointer
  (desktop); inline thumbnails on touch.

CASE PAGE (/work/[slug]/)
  title + meta (industry, what shipped) -> hero screenshot (starts soft,
  racks into focus on load) -> context (2-3 sentences) -> what we'd point
  to (craft notes) -> visit link -> next project (continuous transition).

404
  the hero sentence rendered permanently soft-focus, never resolving, with
  a manual "pull focus" link that is the only sharp thing on the page.
```

**Signature moment implementation:** one function `focus(el, distance)` where `distance` is
`(elCenterY - viewportCenterY) / viewportHeight`, clamped and eased, driving:
`blur = lerp(0, 7px, |d|)`, `scale = lerp(1, 0.96, |d|)`, `opacity = lerp(1, 0.55, |d|)`. Applied
via `ScrollTrigger` (`scrub: 0.4`) to every `[data-focus]` element independently — one shared
formula, many instances, so the whole page always agrees about what "in focus" looks like.
Idle input: a very small (`±0.01`) sine drift added to the active (sharpest) tile only, so the
work index keeps a faint breathing motion at rest, paused under reduced motion and off screen.

**Reduced motion / no-GL:** no blur scrub (everything renders at full sharpness, full opacity —
the concept's resting state IS "in focus", so reduced motion is simply "nothing is ever soft"),
no iris transition (plain 0.2s crossfade), no idle drift. This is designed on purpose, not an
afterthought: a visitor who asks for less motion gets a page where everything is already as
clear as the concept's hero state promises.

No WebGL: the concept is fully expressed in CSS filter/transform + clip-path, so a GL canvas
would add weight without adding to the idea. Loader is short (brand mark petals step in through
opacity only, no rotation, ~1.1s) — earned by the brief (a studio/launch-style site) but kept
minimal since the concept's real theatre is the scroll-wide focus system, not the first second.

## Addendum: content pivot (after the client reviewed brandeddoctor.com)

The client flagged the copy as confusing, specifically the "NiqeLab is a sibling studio to
Autofocuss Marketing" framing, and asked for it removed entirely: NiqeLab stands alone as its
own business in all copy from here on (no "part of", no "what Autofocuss does instead"
contrast). The visual concept (focus-pull, the aperture iris transition, the logo mark) is
unaffected — it is generated by NiqeLab's own mark and name, not by the Autofocuss relationship,
so it survives this change intact.

The client also pointed at brandeddoctor.com's hero: a phone mockup with a stack of realistic
notification cards (a 5-star review, an ad going live, a booking confirmed, a #1 Maps ranking)
that make the value proposition concrete in one glance, and asked for the same device for
NiqeLab: illustrative notifications of what a good website produces (a lead, a booking, a
WhatsApp inquiry, a Maps ranking), not literal screenshots of any real client's dashboard
(that would be fabricated data) — the same honest-illustration technique brandeddoctor.com
itself uses with its generic "Dr. Your Name" placeholder. This becomes a second signature
element alongside focus-pull: the notification stack sits inside the hero's hero media slot,
where the work index would otherwise show the first project — i.e. the hero itself is the first
"in focus" object. Copy direction shifts from "one craft, not a bundle" abstraction to a direct
problem/solution statement: most small-business websites quietly lose leads (slow, unclear,
never updated); a properly built one turns visitors into enquiries, bookings and calls. Every
page is rewritten plain and concrete, in the voice `content.md` asks for, with no mention of
Autofocuss anywhere, including the footer and the portfolio framing (the 9 real projects are now
presented simply as NiqeLab's own work, with no "track record inherited from a parent" caveat).
