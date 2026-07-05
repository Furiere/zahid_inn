import { readdir, stat, mkdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import sharp from 'sharp';

const JPEG_DIR = new URL('../public/images/jpeg/', import.meta.url).pathname;
const WEBP_DIR = new URL('../public/images/webp/', import.meta.url).pathname;
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const files = await walk(JPEG_DIR);

for (const srcPath of files) {
  const ext = extname(srcPath).toLowerCase();
  if (!SOURCE_EXTS.has(ext)) continue;

  const relPath = relative(JPEG_DIR, srcPath);
  const destPath = join(
    WEBP_DIR,
    relPath.slice(0, -ext.length) + '.webp',
  );

  const srcStat = await stat(srcPath);
  const destStat = await stat(destPath).catch(() => null);
  if (destStat && destStat.mtimeMs >= srcStat.mtimeMs) {
    console.log(`skip (up to date): ${relPath}`);
    continue;
  }

  await mkdir(join(destPath, '..'), { recursive: true });
  await sharp(srcPath).webp({ quality: 82 }).toFile(destPath);
  console.log(`generated: jpeg/${relPath} -> webp/${relative(WEBP_DIR, destPath)}`);
}
