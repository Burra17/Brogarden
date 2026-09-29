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
- Skriv inga nya README- eller dokumentationsfiler om det inte uttryckligen begärs.

## Projektstruktur

```
src/
├── components/    # Återanvändbara UI-komponenter
├── data/          # Statisk data (boenden, kontaktinfo)
├── pages/         # Sidkomponenter (en per route)
├── utils/         # Hjälpfunktioner (t.ex. imageHelper)
├── types.ts       # Gemensamma TypeScript-typer
├── App.tsx        # Router och layout
├── index.tsx      # Entry point
└── index.css      # Globala stilar + Tailwind
```

## Teknikval

- **React 18** med funktionella komponenter och hooks
- **TypeScript** – strikt typning
- **Tailwind CSS** – all styling via utility-klasser, inga separata CSS-filer per komponent
- **Vite** – build och dev server
- **React Router** (BrowserRouter) – klientsidesrouting med rena URL:er. Cloudflare Pages serverar `index.html` för alla sökvägar (SPA-fallback), så lägg aldrig till en `404.html` i `public/`. Gamla `/#/`-länkar skrivs om i `utils/redirectLegacyHashUrl.ts`
- **Lucide React** – ikoner

## Bilder

- Alla bilder i `public/images/` som `.webp`
- Referera med `.jpg`-namn i koden – `imageHelper.ts` konverterar till `.webp` automatiskt
- Använd `getImg()` för alla bildreferenser
- Använd `loading="lazy"` på alla bilder utom hero (som har `fetchPriority="high"`)

## Deploy

- Cloudflare Pages (projekt `brogarden`) bygger automatiskt vid push till `main` via Git-integrationen
- Varje PR får en preview-deploy med egen länk
- Bygginställningar: `npm run build`, utdatamapp `dist`, Node-version från `.nvmrc`
- DNS ligger hos Strato: `www` är en CNAME till `brogarden.pages.dev`, apex omdirigeras (301) till `https://www.efsbrogarden.se`
- Rör inte MX-, TXT- eller DMARC-posterna hos Strato – de hör till föreningens e-post

## Mobilanpassning

- Alla layoutändringar ska vara responsiva – testa med Tailwind-breakpoints (`sm:`, `md:`, `lg:`)
- Använd `vh` som fallback före `dvh` för kompatibilitet med alla mobila webbläsare
- `overflow-x: hidden` är satt globalt för att förhindra horisontell scroll
