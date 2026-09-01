// Converts every image under public/images/jpg/ into a matching .webp file
// under public/images/webp/, preserving the sub-folder structure.
//
// Run with: npm run images:webp
//
// The jpg/ source folder is gitignored (originals stay local); the generated
// webp/ tree is what gets committed and shipped. Files that already have an
// up-to-date .webp (newer than the source) are skipped, so re-runs are cheap.

import { readdir, mkdir, stat } from 'node:fs/promises';
import { resolve, join, relative, dirname, extname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = resolve(projectRoot, 'public/images/jpg');
const OUT_DIR = resolve(projectRoot, 'public/images/webp');

// Source extensions we convert (case-insensitive).
const SRC_EXTS = new Set(['.jpg', '.jpeg', '.png']);
// webp encoder quality (0-100). 80 is a good size/quality balance for photos.
const QUALITY = 80;

async function* walk(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return;
    throw err;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (entry.isFile() && SRC_EXTS.has(extname(entry.name).toLowerCase())) {
      yield full;
    }
  }
}

async function isUpToDate(srcPath, outPath) {
  try {
    const [srcStat, outStat] = await Promise.all([stat(srcPath), stat(outPath)]);
    return outStat.mtimeMs >= srcStat.mtimeMs;
  } catch {
    return false; // output missing -> needs conversion
  }
}

async function main() {
  // Fail loudly if the source folder doesn't exist yet, with a clear hint.
  try {
    await stat(SRC_DIR);
  } catch {
    console.error(`No source folder found at: ${relative(projectRoot, SRC_DIR)}`);
    console.error('Create it and drop your .jpg / .jpeg / .png files inside, then re-run.');
    process.exit(1);
  }

  let converted = 0;
  let skipped = 0;
  let failed = 0;

  for await (const srcPath of walk(SRC_DIR)) {
    const rel = relative(SRC_DIR, srcPath);
    const outRel = join(dirname(rel), `${basename(rel, extname(rel))}.webp`);
    const outPath = join(OUT_DIR, outRel);

    if (await isUpToDate(srcPath, outPath)) {
      skipped++;
      continue;
    }

    try {
      await mkdir(dirname(outPath), { recursive: true });
      await sharp(srcPath).webp({ quality: QUALITY }).toFile(outPath);
      converted++;
      console.log(`  ✓ ${rel} -> ${outRel}`);
    } catch (err) {
      failed++;
      console.error(`  ✗ ${rel}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${converted} converted, ${skipped} up-to-date, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
