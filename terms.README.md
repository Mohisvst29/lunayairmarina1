# Terms & Conditions Experience

Production-ready Terms & Conditions page for Lunier Marina. Includes modular React components, GSAP-powered micro-interactions, accessibility affordances, and QA guidance.

## Files & Structure

- `src/app/terms/page.tsx` – App Router entry with metadata + JSON-LD.
- `src/app/terms/TermsPageClient.tsx` – Client wrapper orchestrating hero, TOC, sections, animations.
- `src/app/terms/page.module.css` – Layout styles following existing spacing scale.
- `src/components/terms/*` – Reusable hero, TOC, section, and accordion components.
- `src/hooks/usePrefersReducedMotion.ts` – Detects motion preference.
- `src/hooks/useTermsAnimations.ts` – Encapsulates GSAP timelines + ScrollTrigger setup.
- `src/lib/gsapClient.ts` – Lazy-load helper for GSAP + plugins (ScrollTrigger, ScrollTo, Flip).
- `src/data/termsContent.ts` – JSON-like source of truth for legal copy (easy to hand off to legal).
- `terms.README.md` – this file.

## Usage

1. Update legal copy in `src/data/termsContent.ts`. Structure:

```ts
export const defaultTermsContent = {
  lastUpdated: "2025-11-27",
  contact: {...},
  sections: [
    {
      id: "introduction",
      title: "Introduction & Acceptance",
      summary: "...",
      fullText: "...",
      clauses: [{ heading: "...", body: "..." }],
    },
    ...
  ],
};
```

2. The page reads from this object automatically. To localize or load from CMS, pass new `content` prop into `TermsPageClient`.
3. Last-updated badge uses `content.lastUpdated`; provide ISO date string for correct formatting.

## Animations & Motion

- Hero + TOC load-in: GSAP `fromTo` with `power3.out`.
- Section reveals: ScrollTrigger runs only ≥768px to stay performant.
- Anchor scroll: ScrollToPlugin with highlight pulse via data attribute.
- Accordion: GSAP height animation + Flip to smooth layout reflow.
- Copy-to-clipboard toast fades in/out with GSAP; disabled / instant when `prefers-reduced-motion` is set.
- All motion gated by `usePrefersReducedMotion`.

## Responsive & A11y Notes

- TOC is sticky on desktop, collapsible on ≤1023px with keyboard-accessible toggle.
- Accordions expose `aria-expanded`, `aria-controls`, and `role="region"`.
- Section headings receive focus after anchor navigation for SR context.
- Buttons meet 44px minimum targets; focus rings rely on system outline + custom states.

## Testing & QA

### Automated

```
npm install
npm run test
```

Coverage:
- Accordion expands/collapses, TOC navigation callback, reduced-motion hook behavior.

### Manual Checklist

- `npm run dev`, visit `/terms`.
- Keyboard-only: tab through TOC, activate accordions, verify focus indicators.
- Screen reader smoke test (NVDA/VoiceOver): ensure heading hierarchy reads H1 → H2.
- Run Lighthouse (Chrome DevTools) targeting `/terms` – expect ≥90 for Performance, Accessibility, Best Practices.
- Run axe (browser extension or `npx @axe-core/cli http://localhost:3000/terms`) and confirm zero critical violations. Document any unavoidable issues.
- Capture Lighthouse + axe screenshots for release artifact (see product requirements).

### Browser Targets

- Desktop: latest Chrome, Safari, Edge, Firefox.
- Mobile: iOS Safari, Android Chrome (verify TOC collapsible behavior).

## Extending

- Swap `defaultTermsContent` with CMS data by loading inside `page.tsx` and passing into `TermsPageClient`.
- To add analytics when users accept terms, hook into `handleAnchorNavigate` or accordion toggle.
- Additional GSAP sequences should use `ensureGsapPlugins` to avoid duplicative imports and respect reduced-motion state.







































