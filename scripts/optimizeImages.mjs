// Optimerar bilderna efter `vite build`. Originalen i public/images är masterfiler
// och lämnas orörda – varje bild kodas om till tre bredder i dist/images:
//   gallery-1.webp → gallery-1-640.webp, gallery-1-1280.webp, gallery-1-1920.webp
// Bredderna delas med getImgSrcSet() via src/utils/imageWidths.json.
import { readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import WIDTHS from '../src/utils/imageWidths.json' with { type: 'json' };

const SOURCE_DIR = 'public/images';
const OUTPUT_DIR = 'dist/images';
const QUALITY = 78;

const files = (await readdir(SOURCE_DIR)).filter((file) => file.endsWith('.webp'));

const sizeOf = async (file) => (await stat(file)).size;

// Storleken per bredd summeras efteråt. (Att räkna upp en gemensam variabel med
// `+= await` i parallella anrop tappar uppdateringar.)
const results = await Promise.all(
  files.map(async (file) => {
    const source = path.join(SOURCE_DIR, file);
    const name = path.basename(file, '.webp');
    const bytes = { original: await sizeOf(source) };

    for (const width of WIDTHS) {
      const target = path.join(OUTPUT_DIR, `${name}-${width}.webp`);
      // withoutEnlargement: en smalare original förstoras aldrig
      await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(target);
      bytes[width] = await sizeOf(target);
    }

    // Vite kopierar originalet från public/ – ta bort det så att en missad
    // referens syns som 404 i stället för att tyst ladda den tunga filen
    await rm(path.join(OUTPUT_DIR, file));
    return bytes;
  }),
);

const mb = (key) => (results.reduce((sum, bytes) => sum + bytes[key], 0) / 1024 / 1024).toFixed(1);
console.log(`Bilder: ${files.length} original ${mb('original')} MB → ${WIDTHS.map((w) => `${w} px ${mb(w)} MB`).join(', ')}`);
