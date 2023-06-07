import { galleryItems } from './gallery-items.js';


function createGallery() {
  const gallery = document.querySelector('ul.gallery');

  galleryItems.forEach(item => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');

    const link = document.createElement('a');
    link.classList.add('gallery__link');
    link.href = item.original;
    link.addEventListener('click', e => {
      e.preventDefault();
      openModal(item.original);
    });

    const image = document.createElement('img');
    image.classList.add('gallery__image');
    image.src = item.preview;
    image.setAttribute('data-source', item.original);
    image.alt = item.description;

    link.appendChild(image);
    galleryItem.appendChild(link);
    gallery.appendChild(galleryItem);
  });
}

function openModal(imageUrl) {
  const modal = basicLightbox.create(`<img src="${imageUrl}" alt="" />`);
  modal.show();

  // cerrar modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modal.close();
    }
  });
}

window.addEventListener('load', createGallery);

console.log(galleryItems);
