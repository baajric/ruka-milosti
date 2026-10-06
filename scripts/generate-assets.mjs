/**
 * Generira sve brand assete iz originalnog logotipa (Resursi/Logo.png).
 *
 *   npm run assets
 *
 * Ako kasnije dobijemo SVG verziju logotipa, dovoljno je promijeniti SOURCE
 * (i po potrebi EMBLEM okvir) — ostatak pipeline-a ostaje isti.
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = resolve(root, 'Resursi/Logo.png');
const PUBLIC = resolve(root, 'public');
const BRAND = resolve(PUBLIC, 'brand');

/** Okvir emblema (kuća + ruke + srce) bez natpisa — izmjereno iz originala. */
const EMBLEM = { left: 137, top: 29, width: 1009, height: 740 };
const CREAM = { r: 0xf8, g: 0xf5, b: 0xed, alpha: 1 };
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(BRAND, { recursive: true });

/* ------------------------------------------------------------ 1. Puni logotip */
const fullTrimmed = await sharp(SOURCE).ensureAlpha().trim({ threshold: 10 }).png().toBuffer();
const fullMeta = await sharp(fullTrimmed).metadata();
console.log(`Puni logotip (trimovan): ${fullMeta.width}x${fullMeta.height}`);

// Puni logotip (znak + natpis) nije u layoutu stranice, ali ostaje kao brand
// asset za e-mail potpis, dokumente i štampu. Paletizirani PNG je ovdje manji
// od WebP-a.
await sharp(fullTrimmed)
  .resize({ width: 640, kernel: 'lanczos3' })
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile(`${BRAND}/logo-640.png`);

/* ------------------------------------------------------- 2. Emblem (samo znak) */
// sharp primjenjuje trim prije extract-a, pa kadriranje ide u dva prolaza.
const sourcePng = await sharp(SOURCE).ensureAlpha().png().toBuffer();
const emblemCropped = await sharp(sourcePng).extract(EMBLEM).png().toBuffer();
const emblem = await sharp(emblemCropped).trim({ threshold: 10 }).png().toBuffer();

/** Emblem centriran na kvadratnom platnu. */
async function squareMark(size, padRatio, background) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const scaled = await sharp(emblem)
    .resize({ width: inner, height: inner, fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();
  const { width, height } = await sharp(scaled).metadata();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([
      {
        input: scaled,
        left: Math.round((size - width) / 2),
        top: Math.round((size - height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

for (const size of [128, 256, 512]) {
  const buf = await squareMark(size, 0.04, TRANSPARENT);
  await writeFile(`${BRAND}/mark-${size}.png`, buf);
  await sharp(buf).webp({ quality: 88, effort: 6 }).toFile(`${BRAND}/mark-${size}.webp`);
}

/* ------------------------------------------------------------------ 3. Favicons */
for (const size of [16, 32, 192, 512]) {
  await writeFile(`${PUBLIC}/favicon-${size}x${size}.png`, await squareMark(size, 0.02, TRANSPARENT));
}
// Apple touch icon ne smije biti providan.
await writeFile(`${PUBLIC}/apple-touch-icon.png`, await squareMark(180, 0.08, CREAM));

/** Minimalni ICO enkoder — pakuje PNG-ove u ICO kontejner. */
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const dir = [];
  for (const { size, buf } of entries) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    dir.push(e);
    offset += buf.length;
  }
  return Buffer.concat([header, ...dir, ...entries.map((e) => e.buf)]);
}

const icoEntries = [];
for (const size of [16, 32, 48]) {
  icoEntries.push({ size, buf: await squareMark(size, 0.02, TRANSPARENT) });
}
await writeFile(`${PUBLIC}/favicon.ico`, buildIco(icoEntries));

/* ----------------------------------------------------------------- 4. OG image */
const OG = { w: 1200, h: 630 };
const logoForOg = await sharp(fullTrimmed).resize({ height: 404, kernel: 'lanczos3' }).toBuffer();
const ogLogoMeta = await sharp(logoForOg).metadata();
const frame = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${OG.w}" height="${OG.h}">
     <rect x="26" y="26" width="${OG.w - 52}" height="${OG.h - 52}" fill="none"
           stroke="#B38630" stroke-opacity="0.45" stroke-width="2" rx="8"/>
   </svg>`,
);
await sharp({ create: { width: OG.w, height: OG.h, channels: 4, background: CREAM } })
  .composite([
    { input: frame, left: 0, top: 0 },
    {
      input: logoForOg,
      left: Math.round((OG.w - ogLogoMeta.width) / 2),
      top: Math.round((OG.h - ogLogoMeta.height) / 2),
    },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile(`${PUBLIC}/og-image.png`);

console.log('Gotovo — assets su u public/ i public/brand/.');
