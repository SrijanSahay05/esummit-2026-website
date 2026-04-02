#!/usr/bin/env node

/**
 * convert-to-webp.js
 *
 * Converts all JPG frames in desktop/ and mobile/ to WebP using sharp.
 * Deletes the original JPGs after successful conversion.
 *
 * Usage: node scripts/convert-to-webp.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');
const DIRS = [
  path.join(ROOT, 'public', 'videos', 'frames', 'desktop'),
  path.join(ROOT, 'public', 'videos', 'frames', 'mobile'),
];

const WEBP_QUALITY = 75;
const CONCURRENCY = 8; // parallel conversions

async function convertDir(dir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
  console.log(`Converting ${files.length} files in ${path.basename(dir)}...`);

  let done = 0;
  const batches = [];
  for (let i = 0; i < files.length; i += CONCURRENCY) {
    const batch = files.slice(i, i + CONCURRENCY).map(async (file) => {
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace('.jpg', '.webp'));
      await sharp(input)
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(output);
      fs.unlinkSync(input); // delete original JPG
      done++;
      if (done % 50 === 0) {
        console.log(`  ${path.basename(dir)}: ${done}/${files.length}`);
      }
    });
    await Promise.all(batch);
  }

  console.log(`  ${path.basename(dir)}: ${done}/${files.length} done`);
}

async function main() {
  console.log(`WebP quality: ${WEBP_QUALITY}`);

  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) {
      console.log(`Skipping ${dir} (not found)`);
      continue;
    }
    await convertDir(dir);
  }

  // Report sizes
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));
    const totalBytes = files.reduce(
      (sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0
    );
    console.log(`${path.basename(dir)}: ${files.length} files, ${(totalBytes / 1024 / 1024).toFixed(1)} MB`);
  }

  // Update manifest
  const manifestPath = path.join(ROOT, 'public', 'videos', 'frames', 'manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    manifest.pattern = 'frame_%04d.webp';
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Updated manifest.json');
  }

  console.log('Done!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
