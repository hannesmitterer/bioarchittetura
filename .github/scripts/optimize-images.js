#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');

const CONFIG = {
  inputDir: 'assets/images',
  outputDir: 'assets/images/optimized',
  formats: ['webp', 'jpg'],
  sizes: [
    { name: 'thumbnail', width: 200, height: 300 },
    { name: 'medium', width: 400, height: 600 },
    { name: 'large', width: 800, height: 1200 }
  ],
  quality: {
    jpg: 85,
    webp: 80
  }
};

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...');
  
  try {
    await fs.ensureDir(CONFIG.outputDir);
    
    const files = await fs.readdir(CONFIG.inputDir, { withFileTypes: true });
    const imageFiles = files
      .filter(file => file.isFile() && /\.(jpg|jpeg|png|tiff)$/i.test(file.name))
      .map(file => file.name);
    
    if (imageFiles.length === 0) {
      console.log('ℹ️  No images found to optimize');
      return;
    }
    
    console.log(`📋 Found ${imageFiles.length} images to optimize`);
    
    for (const filename of imageFiles) {
      await optimizeImage(filename);
    }
    
    await generateResponsiveImageData();
    
    console.log('✅ Image optimization completed');
    
  } catch (error) {
    console.error('❌ Image optimization failed:', error);
    throw error;
  }
}

async function optimizeImage(filename) {
  const inputPath = path.join(CONFIG.inputDir, filename);
  const baseName = path.parse(filename).name;
  
  console.log(`🔄 Optimizing ${filename}...`);
  
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    for (const size of CONFIG.sizes) {
      for (const format of CONFIG.formats) {
        const outputFilename = `${baseName}-${size.name}.${format}`;
        const outputPath = path.join(CONFIG.outputDir, outputFilename);
        
        await image
          .clone()
          .resize(size.width, size.height, {
            fit: 'cover',
            position: 'centre'
          })
          .toFormat(format, {
            quality: CONFIG.quality[format] || 80,
            progressive: format === 'jpg',
            effort: format === 'webp' ? 6 : undefined
          })
          .toFile(outputPath);
        
        console.log(`  ✓ Created ${outputFilename}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Failed to optimize ${filename}:`, error.message);
  }
}

async function generateResponsiveImageData() {
  try {
    const files = await fs.readdir(CONFIG.outputDir);
    const imageData = {};
    
    files.forEach(file => {
      const match = file.match(/^(.+)-(\w+)\.(\w+)$/);
      if (match) {
        const [, baseName, size, format] = match;
        
        if (!imageData[baseName]) {
          imageData[baseName] = {};
        }
        
        if (!imageData[baseName][size]) {
          imageData[baseName][size] = {};
        }
        
        imageData[baseName][size][format] = `/assets/images/optimized/${file}`;
      }
    });
    
    await fs.ensureDir('_data');
    await fs.writeJSON('_data/responsive-images.json', imageData, { spaces: 2 });
    
    console.log('📊 Generated responsive image data');
    
  } catch (error) {
    console.error('❌ Failed to generate responsive image data:', error.message);
  }
}

async function main() {
  try {
    await optimizeImages();
  } catch (error) {
    console.error('💥 Image optimization process failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}