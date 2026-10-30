const sharp = require('sharp');

async function prepareTruckBody() {
  const frontCX = 306.5;
  const frontCY = 705.0;
  const rearCX = 1250.0;
  const rearCY = 705.5;
  const cutRadius = 88.0;

  // With dest-out, white circles with alpha=1 will completely erase the wheels from the truck body!
  const svgHoles = Buffer.from(
    '<svg width="1536" height="1024">' +
    '<circle cx="' + frontCX + '" cy="' + frontCY + '" r="' + cutRadius + '" fill="white"/>' +
    '<circle cx="' + rearCX + '" cy="' + rearCY + '" r="' + cutRadius + '" fill="white"/>' +
    '</svg>'
  );

  await sharp('final-truck-image-transparent.png')
    .composite([{ input: svgHoles, blend: 'dest-out' }])
    .png()
    .toFile('public/Home/truck-section/truck-body-clean.png');

  // Verify that the wheel centers and tires are genuinely 0 alpha (transparent) now
  const { data, info } = await sharp('public/Home/truck-section/truck-body-clean.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const fIdx = (Math.round(frontCY) * info.width + Math.round(frontCX)) * 4;
  const rIdx = (Math.round(rearCY) * info.width + Math.round(rearCX)) * 4;

  console.log('Front wheel center alpha:', data[fIdx + 3]);
  console.log('Rear wheel center alpha:', data[rIdx + 3]);
  console.log('Successfully cut out wheels from truck-body-clean.png!');
}

prepareTruckBody();
