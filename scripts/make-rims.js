const sharp = require('sharp');

async function makeRims() {
  const frontCX = 306.5;
  const frontCY = 705;
  const rearCX = 1250;
  const rearCY = 706;
  const radius = 52.5;
  const size = Math.round(radius * 2);

  const svgMask = Buffer.from(
    '<svg width="' + size + '" height="' + size + '"><circle cx="' + radius + '" cy="' + radius + '" r="' + (radius - 0.5) + '" fill="white"/></svg>'
  );

  const fLeft = Math.round(frontCX - radius);
  const fTop = Math.round(frontCY - radius);
  const frontCropped = await sharp('final-truck-image-transparent.png')
    .extract({ left: fLeft, top: fTop, width: size, height: size })
    .toBuffer();

  await sharp(frontCropped)
    .composite([{ input: svgMask, blend: 'dest-in' }])
    .png()
    .toFile('C:/Users/FISTO/.gemini/antigravity-ide/brain/04742afc-3ebb-4110-8f81-d46939096d24/scratch/rim_front.png');

  const rLeft = Math.round(rearCX - radius);
  const rTop = Math.round(rearCY - radius);
  const rearCropped = await sharp('final-truck-image-transparent.png')
    .extract({ left: rLeft, top: rTop, width: size, height: size })
    .toBuffer();

  await sharp(rearCropped)
    .composite([{ input: svgMask, blend: 'dest-in' }])
    .png()
    .toFile('C:/Users/FISTO/.gemini/antigravity-ide/brain/04742afc-3ebb-4110-8f81-d46939096d24/scratch/rim_rear.png');

  console.log('Rims generated: size =', size, 'fLeft =', fLeft, 'fTop =', fTop, 'rLeft =', rLeft, 'rTop =', rTop);
}

makeRims();
