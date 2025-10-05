const fs = require('fs');
const path = require('path');

const galleryDir = 'assets/images';
const indexFile = 'index.html';

// Read all image files
const images = fs.readdirSync(galleryDir).filter(file =>
  /\.(jpg|jpeg|png|svg|webp)$/i.test(file)
);

// Build gallery HTML
const galleryHtml = images.map((img, i) =>
  `<img src="${galleryDir}/${img}" alt="Gallery ${i + 1}" class="gallery-img">`
).join('\n        ');

// Read index.html and replace gallery section
let indexContent = fs.readFileSync(indexFile, 'utf8');
indexContent = indexContent.replace(
  /<div class="gallery">([\s\S]*?)<\/div>/,
  `<div class="gallery">\n        ${galleryHtml}\n      </div>`
);

// Write updated index.html
fs.writeFileSync(indexFile, indexContent);
