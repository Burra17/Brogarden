# Brogården Webbplats

Detta är källkoden för Brogårdens hemsida byggd med React och Vite.

## Kom igång

1. **Installera:**
   ```bash
   npm install
   ```

2. **Kör lokalt (utvecklingsläge):**
   ```bash
   npm run dev
   ```
   Öppna länken som visas i terminalen.

## Publicera till GitHub Pages

Innan du publicerar måste du konfigurera repo-namnet:

1. Öppna `vite.config.ts` och ändra `base: '/REPO_NAMN/'` till namnet på ditt GitHub-repository (t.ex. `/brogarden/`).
2. Öppna `package.json` och ändra `"homepage"` till din fullständiga URL (t.ex. `https://dittnamn.github.io/brogarden`).

**Kör sedan:**

```bash
npm run deploy
```

Detta bygger sidan och laddar upp den till `gh-pages` grenen.
