import {header} from './header.js';
import { getObjects } from "./load-objects.js";
import {initMap, createMarkerList, deleteMarkerList, changeCenter, CENTER, ZOOM} from './map.js';
import {RENT, SALE, BSALE} from './deals.js';

const photos = document.querySelectorAll(".photos_picture");
const objectPhotos = document.querySelectorAll(".object-sale_picture");

initMap().then(map => {
  const object = getObjects(RENT, 1, 1);
  const location = {
    center: [object.data[0].lon, object.data[0].lat],
    zoom: ZOOM
  }
  changeCenter(location);
  deleteMarkerList(map);
  createMarkerList(object.data, map);
});

photos.forEach((photo, index) => {
  photo.addEventListener('click', (ev) => {
    objectPhotos.forEach(objectPhoto => {
      if(objectPhoto.classList.contains('object-sale_picture--active')) {
        objectPhoto.classList.remove('object-sale_picture--active');
      }
    });
    [...objectPhotos][index].classList.add('object-sale_picture--active');
  });
});

header();
