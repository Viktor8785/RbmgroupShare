import {header} from './header.js';
import {footer} from './footer.js';
import {modal} from './modal.js';
import {initMap, createMarkerList, deleteMarkerList, changeCenter, ZOOM} from './map.js';

const data = {
  lon: 30.370089,
  lat: 59.938523,
};

const map = document.querySelector("#map");
const buttonsWrapper = document.querySelector(".main-main_subtitle-wrapper");
const buttons = document.querySelector(".main-main_subbutton-container");
const down = document.querySelector(".main-main_down");

buttonsWrapper.addEventListener('click', () => {
  if (buttons.classList.contains('main-main_subbutton-container--open')) {
    buttons.classList.remove('main-main_subbutton-container--open');
    down.classList.remove('main-main_down--up');
  } else {
    buttons.classList.add('main-main_subbutton-container--open');
    down.classList.add('main-main_down--up');
  }
});

let loadMap = false;

initMap().then(map => {
  loadMap = true;
  const location = {
    center: [data.lon, data.lat],
    zoom: ZOOM
  }
  changeCenter(location);
  deleteMarkerList(map);
  createMarkerList([data], map);
});

header();
footer();
modal();
