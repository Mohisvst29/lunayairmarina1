import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

async function convertFooterImage() {
  try {
    const inputPath = join(process.cwd(), 'public', 'footer boats.jpg');
    const outputPath = join(process.cwd(), 'public', 'footer-boats.webp');

    console.log('Converting footer boats.jpg to WebP...');
    
    const imageBuffer = readFileSync(inputPath);
    
    await sharp(imageBuffer)
      .webp({ quality: 85 })
      .toFile(outputPath);

    console.log(`✅ Successfully converted to ${outputPath}`);
  } catch (error) {
    console.error('Error converting image:', error);
    process.exit(1);
  }
}

convertFooterImage();




























