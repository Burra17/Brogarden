# CLAUDE.md – Brogården Webb

## Projekt

Webbplats för Brogården (EFS lägergård/vandrarhem) byggd med React, TypeScript, Tailwind CSS och Vite.
Hostad på GitHub Pages med automatisk deploy via GitHub Actions vid push till `main`.
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
- **React Router** (HashRouter) – klientsidesrouting
- **Lucide React** – ikoner

## Bilder

- Alla bilder i `public/images/` som `.webp`
- Referera med `.jpg`-namn i koden – `imageHelper.ts` konverterar till `.webp` automatiskt
- Använd `getImg()` för alla bildreferenser
- Använd `loading="lazy"` på alla bilder utom hero (som har `fetchPriority="high"`)

## Deploy

- Automatiskt via GitHub Actions (`.github/workflows/deploy.yml`) vid push till `main`
- Manuell deploy behövs inte – `gh-pages`-paketet är borttaget
- CNAME-fil i `public/` för custom domain

## Mobilanpassning

- Alla layoutändringar ska vara responsiva – testa med Tailwind-breakpoints (`sm:`, `md:`, `lg:`)
- Använd `vh` som fallback före `dvh` för kompatibilitet med alla mobila webbläsare
- `overflow-x: hidden` är satt globalt för att förhindra horisontell scroll
