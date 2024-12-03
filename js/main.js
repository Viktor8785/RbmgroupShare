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
const sale = document.querySelector("#main-main-sale");
const arendator = document.querySelector("#main-main-arendator");
const bsale = document.querySelector("#main-main-bsale");
const consult1 = document.querySelector("#main-main-consult1");
const consult2 = document.querySelector("#main-main-consult2");
const consult3 = document.querySelector("#main-main-consult3");
const financeConsult1 = document.querySelector("#main-finance-consult1");
const financeConsult2 = document.querySelector("#main-finance-consult2");
const dealsCall1 = document.querySelector("#main-deals-call1");
const dealsCall2 = document.querySelector("#main-deals-call2");
const arendatorCall = document.querySelector("#main-arendator-call");
const modalWindow = document.querySelector(".modal-call");

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

sale.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

arendator.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

bsale.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

consult1.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

consult2.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

consult3.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

financeConsult1.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

financeConsult2.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

dealsCall1.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

dealsCall2.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

arendatorCall.addEventListener('click', (ev) => {
  if(modalWindow) {
    modalWindow.classList.add('modal-call--active');
  }
});

header();
footer();
modal();
