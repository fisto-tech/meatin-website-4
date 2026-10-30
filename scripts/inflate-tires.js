const sharp = require('sharp');

async function createPerfectTireWheel(inputWheel, outFile) {
  const { data, info } = await sharp(inputWheel).raw().toBuffer({ resolveWithObject: true });
  const size = info.width;
  const radius = size / 2; // 88

  // We want to sample the uncompressed top arc (deg 210 to 330)
  // to get the true, round, properly inflated radial profile:
  // For each radius r from 52 to 88, calculate the ideal radial profile
  const radialProfile = [];
  for (let r = 0; r <= radius; r++) {
    if (r < 52) {
      radialProfile[r] = null; // keep rim untouched
    } else {
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      for (let deg = 210; deg <= 330; deg += 1) {
        let rad = deg * Math.PI / 180;
        let px = Math.round(radius + r * Math.cos(rad));
        let py = Math.round(radius + r * Math.sin(rad));
        if (px >= 0 && px < size && py >= 0 && py < size) {
          let idx = (py * size + px) * 4;
          rSum += data[idx];
          gSum += data[idx + 1];
          bSum += data[idx + 2];
          count++;
        }
      }
      radialProfile[r] = {
        r: rSum / count,
        g: gSum / count,
        b: bSum / count
      };
    }
  }

  // Create new buffer
  const outBuffer = Buffer.from(data);

  // Reconstruct tire between r=52.5 and r=88 with smooth, uniform radial shading
  // Blending the uncompressed radial profile uniformly across all 360 degrees:
  // For angles around bottom (deg 45 to 135), the flattened/punctured tire was distorted,
  // so we replace it with the uncompressed round tire profile.
  // For the rest, we blend smoothly so the tire is 100% round and uniformly inflated!
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x + 0.5 - radius;
      const dy = y + 0.5 - radius;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const idx = (y * size + x) * 4;

      if (dist >= 52.0 && dist <= radius) {
        const rInt = Math.min(radius, Math.floor(dist));
        const rFrac = dist - rInt;
        const p1 = radialProfile[rInt];
        const p2 = radialProfile[Math.min(radius, rInt + 1)];

        const targetR = p1.r * (1 - rFrac) + p2.r * rFrac;
        const targetG = p1.g * (1 - rFrac) + p2.g * rFrac;
        const targetB = p1.b * (1 - rFrac) + p2.b * rFrac;

        // Angle in degrees from 0 to 360
        let angle = Math.atan2(dy, dx) * 180 / Math.PI;
        if (angle < 0) angle += 360;

        // If in bottom half (deg 30 to 150), ground distortion occurred, so 100% replace with round profile
        // In other areas, blend slightly with subtle tread/surface variation
        let weight = 0.85;
        if (angle >= 30 && angle <= 150) {
          weight = 1.0;
        }

        outBuffer[idx] = Math.round(outBuffer[idx] * (1 - weight) + targetR * weight);
        outBuffer[idx + 1] = Math.round(outBuffer[idx + 1] * (1 - weight) + targetG * weight);
        outBuffer[idx + 2] = Math.round(outBuffer[idx + 2] * (1 - weight) + targetB * weight);
        outBuffer[idx + 3] = 255;
      }
    }
  }

  // Smooth circular mask at outer edge
  const svgMask = Buffer.from(
    '<svg width="' + size + '" height="' + size + '"><circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - 0.5) + '" fill="white"/></svg>'
  );

  await sharp(outBuffer, { raw: { width: size, height: size, channels: 4 } })
    .composite([{ input: svgMask, blend: 'dest-in' }])
    .png()
    .toFile(outFile);

  console.log('Saved round, fully-inflated wheel to', outFile);
}

Promise.all([
  createPerfectTireWheel('public/Home/truck-section/wheel-front.png', 'public/Home/truck-section/wheel-front.png'),
  createPerfectTireWheel('public/Home/truck-section/wheel-rear.png', 'public/Home/truck-section/wheel-rear.png')
]).then(() => console.log('All wheels perfected and fully inflated!'));
