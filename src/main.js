// Improved code for robust gallery with fallback images and architectural 3D animation

const galleryImages = [
    { src: 'image1.jpg', fallback: 'fallback1.jpg' },
    { src: 'image2.jpg', fallback: 'fallback2.jpg' },
    { src: 'image3.jpg', fallback: 'fallback3.jpg' },
];

function loadGallery() {
    galleryImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.onerror = () => {
            imgElement.src = image.fallback;
        };
        document.getElementById('gallery').appendChild(imgElement);
    });
}

// Replace 3D animation with a house architectural model
function loadArchitecturalModel() {
    const modelElement = document.createElement('model-viewer');
    modelElement.src = 'house_model.glb';
    modelElement.setAttribute('alt', 'A 3D model of a house');
    document.getElementById('model-container').appendChild(modelElement);
}

loadGallery();
loadArchitecturalModel();