# Visual Polish – Implementeringsplan

Varje session = en branch, en PR. Kan reverteras individuellt.

## Session 1: `feature/scroll-reveal` ✅
- [x] Skapa `useScrollReveal` hook (IntersectionObserver)
- [x] Fade-in-up animationer på innehållssektioner (alla sidor)
- [x] CSS-only, inga JS-bibliotek
- [x] `prefers-reduced-motion` stöd
- [x] Test: mobil Safari, Chrome, Firefox

## Session 2: `feature/hero-animation` ✅
- [x] Ken Burns-effekt (långsam zoom) på hero-bilder via CSS keyframes
- [x] Gäller Home hero + alla PageHero-instanser
- [x] Ren CSS, GPU-accelererad (`transform: scale`)
- [x] Test: ingen layout-shift eller overflow på mobil

## Session 3: `feature/staggered-entrances` ✅
- [x] Staggerade animationsdelays på upprepade element (feature cards, galleri, boendekort, programkort)
- [x] Bygger på scroll reveal-hooken från Session 1
- [x] `animation-delay` baserat på index, max-cap
- [x] Test: ingen content flash eller layout-hopp

## Session 4: `feature/page-transitions`
- [ ] Fade-in vid sidbyten via wrapper-komponent
- [ ] CSS-only med klass-toggle vid mount
- [ ] Scroll-to-top vid navigering
- [ ] Test: bakåt/framåt-knappar, djuplänkar

## Session 5: `feature/micro-interactions`
- [ ] Förfinade button hover-states (shadow lift istället för scale)
- [ ] Navbar-transition polish (backdrop blur ramp, aktiv länk-indikator)
- [ ] Parallax-effekt på bildcollage-strip (Home)
- [ ] Test: touch-enheter, reduced motion

## Regler
- Inga nya npm-beroenden
- CSS transforms (GPU-vänligt, ingen layout thrashing)
- `prefers-reduced-motion: reduce` stänger av alla animationer
- Mobile-first – testat på 320px, 375px, 768px, 1024px+
- Varje branch mergas oberoende (Session 3 bygger dock på Session 1)
