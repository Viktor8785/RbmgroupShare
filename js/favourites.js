import {header} from './header.js';
import {footer} from './footer.js';
import {modal} from './modal.js';
import {sliderInit} from './slider.js';
import {initMap, createMarkerList, deleteMarkerList, markerList} from './map.js';

const map = document.querySelector("#map");
const cardList = document.querySelector('.card-list');
const cards = cardList.children;
const recall = document.querySelector('.favourites_recall');

const watchList = JSON.parse(localStorage.getItem('favorites'));

// if(!cards || !cards.length) {
//   recall.classList.add('favourites_recall--opened');
// }

if(!watchList || !watchList.length) {
  recall.classList.add('favourites_recall--opened');
} else {
  cardList.classList.remove('card-list--empty');
}

[...cards].forEach(card => {
  const slider = card.querySelector('.card_wrapper');
  sliderInit(slider, card, 5);
  markFavotites(card);
});

function markFavotites(card) {
  let watchList = JSON.parse(localStorage.getItem('favorites'));
  const objectNumber = card.querySelector(".stickers_item");
  const objectHeart = card.querySelector(".stickers-icon");
  const objectHeartRed = card.querySelector(".stickers-icon_red");
  const objectNumberItem = objectNumber.innerText;
  if(watchList && watchList.length){
    const findIndex = watchList.indexOf(objectNumberItem);
    if(findIndex >= 0) {
      objectHeart.classList.remove('stickers-icon--view');
      objectHeartRed.classList.add('stickers-icon_red--view');
    }
  }
}

let loadMap = false;

initMap().then(map => {
  loadMap = true;
  let cardsCoords =[];
  let data;

  [...cards].forEach(card => {
    data = {
      lon: 30.28 + Math.random() / 10,
      lat: 59.88 + Math.random() / 10,
    }
    cardsCoords.push(data)
  });

  if(cardsCoords.length && !markerList.length) {
    deleteMarkerList(map);
    createMarkerList(cardsCoords, map);
  }
});

header();
footer();
modal();
