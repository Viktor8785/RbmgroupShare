import {header, checkFavorites} from './header.js';
import {footer} from './footer.js';
import {modal} from './modal.js';
import {initMap, createMarkerList, deleteMarkerList, changeCenter, ZOOM} from './map.js';

const formRecall = document.querySelector(".object-sale_recall");
const pictureContainer = document.querySelector(".object-sale_picture-container");
const objectPhotos = document.querySelector("#picture-container").children;
const photos = document.querySelector(".object-sale_photos-wrapper").children;
const arrowLeft = document.querySelector("#arrow-left");
const arrowRight = document.querySelector("#arrow-right");
const modalRecall = document.querySelector("#modal-recall");
const modalRecallClose = document.querySelector("#modal-recall-close");
const recallButton = document.querySelector(".object-sale-recall_button");
const recallInput = document.querySelector("#recall-input");
const recallInputName = document.querySelector("#recall-input-name");
const objectNumber = document.querySelector(".object-sale_stickers-item");
const objectHeart = document.querySelector("#object-heart");
const objectHeartRed = document.querySelector("#object-heart-red");
const objectHeartMob = document.querySelector("#object-heart-mob");
const objectHeartRedMob = document.querySelector("#object-heart-red-mob");

const headerHeart = document.querySelector("#header-heart");
const headerHeartEmpty = document.querySelector("#header-heart-empty");
const headerHeartRed = document.querySelector("#header-heart-red");
const headerHeartBlueEmpty = document.querySelector("#header-heart-blue-empty");
const headerHeartBlueRed = document.querySelector("#header-heart-blue-red");

const data = {
  lon: 30.349012,
  lat: 59.930534,
};
let currentIndex = 0;
let indexMax = 0;

let recallInputCompleted = false;
let recallInputNameCompleted = false;
let recallInputUnmasked;

recallButton.disabled = true;

document.addEventListener('click', (e) => {
  if(!e.composedPath().includes(modalRecall) && !e.composedPath().includes(recallButton) && modalRecall.classList.contains('modal-recall--opened')) {
    modalRecall.classList.remove('modal-recall--opened');
  }
})

let watchList = JSON.parse(localStorage.getItem('favorites'));
const objectNumberItem = objectNumber.innerText;
if(watchList && watchList.length){
  const findIndex = watchList.indexOf(objectNumberItem);
  if(findIndex >= 0) {
    objectHeart.classList.remove('object-sale_stickers-icon--active');
    objectHeartRed.classList.add('object-sale_stickers-icon--active');
    objectHeartMob.classList.remove('object-sale_stickers-icon--active');
    objectHeartRedMob.classList.add('object-sale_stickers-icon--active');
  }
}

objectHeart.addEventListener('click', () => {
  watchList = JSON.parse(localStorage.getItem('favorites'));
  if(!watchList) {
    localStorage.setItem('favorites', JSON.stringify([objectNumberItem]));
  }else {
    const findIndex = watchList.indexOf(objectNumberItem);
    if(findIndex < 0) {
      watchList.push(objectNumberItem);
      localStorage.setItem('favorites', JSON.stringify(watchList));
    } else {
      return;
    }
  }
  objectHeart.classList.remove('object-sale_stickers-icon--active');
  objectHeartRed.classList.add('object-sale_stickers-icon--active');
  checkFavorites();
});

objectHeartMob.addEventListener('click', () => {
  watchList = JSON.parse(localStorage.getItem('favorites'));
  if(!watchList) {
    localStorage.setItem('favorites', JSON.stringify([objectNumberItem]));
  }else {
    const findIndex = watchList.indexOf(objectNumberItem);
    if(findIndex < 0) {
      watchList.push(objectNumberItem);
      localStorage.setItem('favorites', JSON.stringify(watchList));
    } else {
      return;
    }
  }
  objectHeartMob.classList.remove('object-sale_stickers-icon--active');
  objectHeartRedMob.classList.add('object-sale_stickers-icon--active');
  checkFavorites();
});

objectHeartRed.addEventListener('click', () => {
  watchList = JSON.parse(localStorage.getItem('favorites'));
  const findIndex = watchList.indexOf(objectNumberItem);
  if(findIndex < 0) {
    return;
  }
  watchList.splice(findIndex, 1);
  localStorage.setItem('favorites', JSON.stringify(watchList));
  objectHeart.classList.add('object-sale_stickers-icon--active');
  objectHeartRed.classList.remove('object-sale_stickers-icon--active');
  checkFavorites();
});

objectHeartRedMob.addEventListener('click', () => {
  watchList = JSON.parse(localStorage.getItem('favorites'));
  const findIndex = watchList.indexOf(objectNumberItem);
  if(findIndex < 0) {
    return;
  }
  watchList.splice(findIndex, 1);
  localStorage.setItem('favorites', JSON.stringify(watchList));
  objectHeartMob.classList.add('object-sale_stickers-icon--active');
  objectHeartRedMob.classList.remove('object-sale_stickers-icon--active');
  checkFavorites();
});

recallInputName.addEventListener('input', () => {
  if(recallInputName.value.length) {
    recallInputNameCompleted = true;
  } else {
    recallInputNameCompleted = false;
  }
});

recallButton.addEventListener('click', () => {
  modalRecall.classList.add('modal-recall--opened');
});

modalRecallClose.addEventListener('click', () => {
  modalRecall.classList.remove('modal-recall--opened');
});

if(objectPhotos && objectPhotos.length) {
  indexMax = objectPhotos.length - 1;
}

initMap().then(map => {
  const location = {
    center: [data.lon, data.lat],
    zoom: ZOOM
  }
  changeCenter(location);
  deleteMarkerList(map);
  createMarkerList([data], map);
});

pictureContainer.addEventListener('mouseenter', () => {
  arrowLeft.classList.add('arrow-left--opened');
  arrowRight.classList.add('arrow-right--opened');
});

pictureContainer.addEventListener('mouseleave', () => {
  arrowLeft.classList.remove('arrow-left--opened');
  arrowRight.classList.remove('arrow-right--opened');
});

arrowLeft.addEventListener('click', () => {
  if(currentIndex > 0) {
    currentIndex--;
  } else {
    currentIndex = indexMax;
  }
  setPhotoActive();
});

arrowRight.addEventListener('click', () => {
  if(currentIndex < indexMax) {
    currentIndex++;
  } else {
    currentIndex = 0;
  }
  setPhotoActive();
});

if(photos && photos.length) {
  [...photos][0].classList.add('photos_picture--active');
}
if(objectPhotos && objectPhotos.length) {
  [...objectPhotos][0].classList.add('object-sale_picture--active');
}
[...photos].forEach((photo, index) => {
  photo.addEventListener('click', (ev) => {
    currentIndex = index;
    setPhotoActive();
  });
});

formRecall.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

function setPhotoActive() {
  [...objectPhotos].forEach(objectPhoto => {
    if(objectPhoto.classList.contains('object-sale_picture--active')) {
      objectPhoto.classList.remove('object-sale_picture--active');
    }
  });
  if(objectPhotos && currentIndex < objectPhotos.length) {
    [...objectPhotos][currentIndex].classList.add('object-sale_picture--active');
  }
  [...photos].forEach(item => {
    if(item.classList.contains('photos_picture--active')) {
      item.classList.remove('photos_picture--active');
    }
  });
  if(photos && currentIndex < photos.length) {
    [...photos][currentIndex].classList.add('photos_picture--active');
  }
}

const phoneMask = new IMask(recallInput, {
  mask: "+{7}(000)000-00-00",
  lazy: false,
});

phoneMask.on('complete', () => {
  recallInputCompleted = true;
  recallButton.disabled = false;
  recallInputUnmasked = phoneMask.unmaskedValue;
});
phoneMask.on('accept', () => {
  recallInputCompleted = false;
  recallButton.disabled = true;
});

header();
footer();
modal();
