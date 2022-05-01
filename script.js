/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
const numberOfPhotos = 30;
const apiKey = 'bMG1CIKpZ5xi_fKTbfS3BZDRQRBUVW38dF215uTIvD4';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${numberOfPhotos}&orientation=portrait`;
let photos = [];
let arePhotosLoaded = false;
let imagesLoaded = 0;
let imagesToLoad;

// DOM elements
const imageContainerElem = document.getElementById('image-container');
const loaderElem = document.getElementById('loader');

// Functions

const imageLoaded = () => {
  imagesLoaded += 1;
  if (imagesLoaded === imagesToLoad) {
    arePhotosLoaded = true;

    // Removes initial loading features
    loaderElem.hidden = true;
    document.body.classList.remove('disable-scroll');
  }
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    if (!attributes[key]) {
      element.setAttribute(key, 'Photo');
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
};

const displayPhotos = () => {
  imagesLoaded = 0;
  imagesToLoad = photos.length;
  photos.forEach((photo) => {
    // Link to unsplahs photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: 'blank',
    });

    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.classList.add('image');
    // Check when each image is loaded
    img.addEventListener('load', imageLoaded);
    item.appendChild(img);
    imageContainerElem.appendChild(item);
  });
};
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photos = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
};

// Load more photos when scrolling
window.addEventListener('scroll', () => {
  // Triggers when the users is less than 1000px from the bottom of the total body
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    arePhotosLoaded
  ) {
    arePhotosLoaded = false;
    getPhotos();
  }
});

getPhotos();
