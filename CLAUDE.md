# CLAUDE.md – Brogården Webb

## Projekt

Webbplats för Brogården (EFS lägergård/vandrarhem) byggd med React, TypeScript, Tailwind CSS och Vite.
Hostad på Cloudflare Pages med automatisk deploy vid push till `main` och preview-deploy per PR.
Domän: www.efsbrogarden.se

## Git-arbetsflöde

- Branch `main` är skyddad – alla ändringar görs via PR.
- Skapa alltid en ny branch för varje feature/fix: `feature/<namn>`, `fix/<namn>`, `cleanup/<namn>`.
- Commitmeddelanden på engelska, korta och beskrivande.
- Pusha branchen och skapa PR innan merge till main.

## Kodprinciper

Koda som en senior utvecklare. Följ dessa principer:

- **SOLID** – Varje komponent har ett ansvar. Beroenden injiceras via props.
- **DRY** – Undvik duplicering. Extrahera gemensam logik till utils/komponenter.
- **KISS** – Håll det enkelt. Ingen överkonstruktion eller onödig abstraktion.
- **Clean Code** – Läsbara namn, små funktioner, tydlig struktur.
- **Kommentarer på svenska** i all kod.
- **Tillgänglighet** – klickbara element är `<button>` eller `<a>`, aldrig `<div onClick>`. Bilder har beskrivande alt-text (tom `alt=''` bara när en omslutande knapp redan har en `aria-label`). Använd inte `outline-none` – fokusringen styrs globalt med `:focus-visible` i `index.css`. `eslint-plugin-jsx-a11y` fångar det mesta i CI.
- Skriv inga nya README- eller dokumentationsfiler om det inte uttryckligen begärs.

## Projektstruktur

```
src/
├── components/    # Återanvändbara UI-komponenter (Layout = Header + Footer)
├── data/          # Statisk data (boenden, kontaktinfo)
├── hooks/         # Egna React-hooks (scroll reveal, canonical, sidvisningar)
├── pages/         # Sidkomponenter (en per route)
├── utils/         # Hjälpfunktioner (t.ex. imageHelper)
├── routes.tsx     # Sidlistan – router, meny, footer, sidtitlar och förrendering byggs härifrån
├── types.ts       # Gemensamma TypeScript-typer
├── App.tsx        # Routes, layout och PageShell (titel, beskrivning, canonical)
├── index.tsx      # Entry point i webbläsaren (BrowserRouter, hydrering)
├── entry-server.tsx # Entry point för förrenderingen (StaticRouter)
└── index.css      # Globala stilar, Tailwind och designtokens (@theme)
```

## Teknikval

- **React 19** med funktionella komponenter och hooks
- **TypeScript** – strikt typning
- **Tailwind CSS 4** – all styling via utility-klasser, inga separata CSS-filer per komponent. Ingen `tailwind.config.js` – färger, typsnitt och animationer ligger i `@theme` i `index.css`, och Tailwind körs via `@tailwindcss/vite`. Kräver Safari/iOS 16.4+, Chrome 111+ och Firefox 128+
- **Vite** – build och dev server
- **React Router** (BrowserRouter) – klientsidesrouting med rena URL:er. Gamla `/#/`-länkar skrivs om i `utils/redirectLegacyHashUrl.ts`
- **Förrendering** – `scripts/prerender.mjs` renderar varje sida i `routes.tsx` till en egen HTML-fil (`index.html`, `boende.html` …) med titel, beskrivning, canonical och `og:*` inbakade. `index.tsx` hydrerar HTML:en. Okända sökvägar får den förrenderade `404.html`, som Cloudflare Pages serverar med status 404 – lägg inte en egen `404.html` i `public/`
- Komponenter renderas även i Node vid bygget – använd `window`/`document` bara i effekter och händelsehanterare, och låt första renderingen bli likadan i båda miljöerna (annars hydreringsfel)
- **Lucide React** – ikoner

## Bilder

- Alla bilder i `public/images/` som `.webp` i full upplösning – de är masterfiler och ändras aldrig av bygget
- `scripts/optimizeImages.mjs` körs efter `vite build` och skapar tre bredder per bild i `dist/images/` (`-640`, `-1280`, `-1920`, WebP kvalitet 78). Bredderna delas med `imageHelper.ts` via `src/utils/imageWidths.json`
- Referera med `.jpg`-namn i koden – `imageHelper.ts` konverterar till `.webp` automatiskt
- Använd `getImg()` för `src` (1920-varianten i produktion, originalet i dev) och `getImgSrcSet()` + ett `sizes` som beskriver bildens bredd i layouten för `srcSet`
- Datafiler (t.ex. `accommodations.ts`, `gallery.ts`) lagrar filnamn, inte sökvägar – komponenten anropar `getImg()`
- Varianterna finns bara efter bygget – testa bildval med `npm run build && npm run preview`
- Använd `loading="lazy"` på alla bilder utom hero (som har `fetchPriority="high"`)

## Deploy

- Cloudflare Pages (projekt `brogarden`) bygger automatiskt vid push till `main` via Git-integrationen
- Varje PR får en preview-deploy med egen länk
- Bygginställningar: `npm run build`, utdatamapp `dist`, Node-version från `.nvmrc`
- Byggsteg: `typecheck` → `vite build` (klient) → `vite build --ssr src/entry-server.tsx` (till `dist/server`, tas bort efteråt) → `scripts/prerender.mjs` → `scripts/optimizeImages.mjs`
- DNS ligger hos Strato: `www` är en CNAME till `brogarden.pages.dev`, apex omdirigeras (301) till `https://www.efsbrogarden.se`
- Rör inte MX-, TXT- eller DMARC-posterna hos Strato – de hör till föreningens e-post

## Mobilanpassning

- Alla layoutändringar ska vara responsiva – testa med Tailwind-breakpoints (`sm:`, `md:`, `lg:`)
- Använd `vh` som fallback före `dvh` för kompatibilitet med alla mobila webbläsare
- `overflow-x: hidden` är satt globalt för att förhindra horisontell scroll
