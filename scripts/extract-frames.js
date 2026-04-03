#!/usr/bin/env node

/**
 * extract-frames.js
 *
 * Extracts the scroll-animation MP4 into a numbered JPEG image sequence
 * optimised for canvas-based scroll scrubbing.
 *
 * Produces TWO sets:
 *   public/videos/frames/desktop/  — 1920x1080  (quality 3 = ~80% JPEG)
 *   public/videos/frames/mobile/   —  960x540   (quality 5 = ~70% JPEG)
 *
 * Usage:
 *   node scripts/extract-frames.js [--fps 24]
 *
 * Requirements: ffmpeg must be installed and on $PATH.
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// ── CLI flags ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
function flag(name, fallback) {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback;
}

const FPS = Number(flag('fps', '24'));

// MJPEG qscale: 2 = best quality, 5 = good, 10 = low. We use 3 for desktop, 5 for mobile.
const DESKTOP_QSCALE = 3;
const MOBILE_QSCALE = 5;

// ── Paths ────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const INPUT = path.join(ROOT, 'public', 'videos', 'esummit_video_website.mp4');
const DESKTOP_DIR = path.join(ROOT, 'public', 'videos', 'frames', 'desktop');
const MOBILE_DIR = path.join(ROOT, 'public', 'videos', 'frames', 'mobile');

// ── Preflight ────────────────────────────────────────────────────────
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
} catch {
  console.error('ERROR: ffmpeg is not installed or not on $PATH.');
  console.error('Install it with: brew install ffmpeg  (macOS)');
  process.exit(1);
}

if (!fs.existsSync(INPUT)) {
  console.error(`ERROR: Source video not found at ${INPUT}`);
  process.exit(1);
}

// ── Helpers ──────────────────────────────────────────────────────────
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extractFrames(label, outputDir, scale, qscale) {
  ensureDir(outputDir);

  const cmd = [
    'ffmpeg',
    '-i', `"${INPUT}"`,
    '-vf', `fps=${FPS},scale=${scale}`,
    '-q:v', String(qscale),
    '-an',
    '-y',
    `"${path.join(outputDir, 'frame_%04d.jpg')}"`,
  ].join(' ');

  console.log(`\n  Extracting ${label} frames (${scale}, qscale=${qscale}, ${FPS}fps)...`);
  console.log(`   -> ${outputDir}\n`);

  execSync(cmd, { stdio: 'inherit' });

  const count = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg')).length;
  console.log(`  ${label}: ${count} frames extracted.`);
  return count;
}

// ── Main ─────────────────────────────────────────────────────────────
console.log('========================================');
console.log('  E-Summit Frame Sequence Extractor');
console.log('========================================');
console.log(`Source : ${INPUT}`);
console.log(`FPS    : ${FPS}`);

const desktopCount = extractFrames('Desktop', DESKTOP_DIR, '1920:1080', DESKTOP_QSCALE);
const mobileCount = extractFrames('Mobile', MOBILE_DIR, '960:540', MOBILE_QSCALE);

// Write a manifest so the component knows the frame count at build time
const manifest = {
  fps: FPS,
  desktop: { count: desktopCount, width: 1920, height: 1080 },
  mobile: { count: mobileCount, width: 960, height: 540 },
  pattern: 'frame_%04d.jpg',
};
const manifestPath = path.join(ROOT, 'public', 'videos', 'frames', 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`\nManifest written to ${manifestPath}`);

// Report total size
function dirSize(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.jpg'))
    .reduce((sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0);
}
const deskMB = (dirSize(DESKTOP_DIR) / 1024 / 1024).toFixed(1);
const mobMB = (dirSize(MOBILE_DIR) / 1024 / 1024).toFixed(1);
console.log(`\nTotal size: Desktop ${deskMB} MB / Mobile ${mobMB} MB`);
console.log('\nDone! You can now build the canvas component.');
