import {header} from './header.js';
import {footer} from './footer.js';
import {modal} from './modal.js';
import {sliderInit} from './slider.js'
import {initMap, createMarkerList, deleteMarkerList, markerList} from './map.js';

const cardList = document.querySelector('.card-list');
const cards = cardList.children;
const buttonWrapper = document.querySelector('.pagination-site-number-wrapper');
const filterSale = document.querySelector('#filter-sale');
const priceSale = document.querySelector('#price-sale');
const priceSaleMax = document.querySelector('#price-sale-max');
const squareMin = document.querySelector('#square-min');
const squareMax = document.querySelector('#square-max');
const actual = document.querySelector('#actual-sale');
const buttons = buttonWrapper.querySelectorAll('button');

const inputWrapper1 = document.querySelector('#input-wrapper-1');
const inputWrapper2 = document.querySelector('#input-wrapper-2');
const inputs1 = inputWrapper1.querySelectorAll('input');
const inputs2 = inputWrapper2.querySelectorAll('input');
const inputAll = document.querySelector('#all-sale');
const recallLink = document.querySelector('.recall_link');

const map = document.querySelector("#map");

const windowHeight = document.documentElement.clientHeight;

const inputs = [...inputs1, ...inputs2];

map.style.height = windowHeight + 'px';
let loadMap = false;

actual.checked = true;

recallLink.addEventListener('click', () => {
  inputs.forEach(inp => {
    if(inp !== inputAll) {
      inp.checked = false;
    } else {
      inp.checked = true;
    }
  });
});

inputAll.addEventListener('click', () => {
  if(inputAll.checked === true) {
    inputs.forEach(inp => {
      if(inp !== inputAll) {
        inp.checked = false;
      }
    });
  }
});

inputs.forEach(inp => {
  if(inp !== inputAll) {
    inp.addEventListener('click', () => {
      if(inp.checked === true) {
        inputAll.checked = false;
      }
    });
  }
});

filterSale.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

priceSaleMax.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

priceSaleMax.addEventListener('input', (evt) => {
  evt.target.value = evt.target.value.replace(/[^0-9]/g, '');
  evt.target.value = evt.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});


priceSale.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

priceSale.addEventListener('input', (evt) => {
  evt.target.value = evt.target.value.replace(/[^0-9]/g, '');
  evt.target.value = evt.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
});

squareMin.addEventListener('keypress', (evt) => {
  if ((evt.which < 48 || evt.which > 57) && String.fromCharCode(evt.which) !== ',') {
      evt.preventDefault();
  }
});

squareMax.addEventListener('keypress', (evt) => {
  if ((evt.which < 48 || evt.which > 57) && String.fromCharCode(evt.which) !== ',') {
      evt.preventDefault();
  }
});

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(item => {
      if(item.classList.contains('active')) {
        item.classList.remove('active');
      }
    })
    button.classList.add('active');
  });
});

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
