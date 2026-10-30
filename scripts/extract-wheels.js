const sharp = require('sharp');

async function extractPerfectWheel(cx, cy, radius, outFile) {
  const size = Math.round(radius * 2);
  const left = Math.round(cx - radius);
  const top = Math.round(cy - radius);

  const svgMask = Buffer.from(
    '<svg width="' + size + '" height="' + size + '"><circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - 0.5) + '" fill="white"/></svg>'
  );

  const cropped = await sharp('final-truck-image-transparent.png')
    .extract({ left, top, width: size, height: size })
    .toBuffer();

  const { data, info } = await sharp(cropped).raw().toBuffer({ resolveWithObject: true });

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - radius;
      const dy = y + 0.5 - radius;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < radius - 1) {
        const idx = (y * size + x) * 4;
        if (data[idx + 3] < 200) {
          data[idx] = 22;
          data[idx + 1] = 25;
          data[idx + 2] = 26;
          data[idx + 3] = 255;
        }
      }
    }
  }

  const filled = await sharp(data, {
    raw: { width: size, height: size, channels: 4 }
  }).png().toBuffer();

  await sharp(filled)
    .composite([{ input: svgMask, blend: 'dest-in' }])
    .png()
    .toFile(outFile);

  console.log('Saved perfect wheel to', outFile, 'size:', size, 'left:', left, 'top:', top);
}

Promise.all([
  extractPerfectWheel(306.5, 705.0, 88, 'public/Home/truck-section/wheel-front.png'),
  extractPerfectWheel(1250.0, 705.5, 88, 'public/Home/truck-section/wheel-rear.png')
]).then(() => console.log('Done extracting perfect wheels!'));
