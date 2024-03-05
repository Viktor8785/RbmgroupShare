import {sliderInit} from './slider.js'
import {cardRent} from './card-rent-template.js';
import {cardSale} from './card-sale-template.js';
import {cardBsale} from './card-bsale-template.js';
import {RENT, SALE, BSALE} from './deals.js';

export var objectList = [];

function createObject(deal, object) {
  const div = document.createElement('div');
  switch (deal) {
    case RENT: {
      div.innerHTML = cardRent;
      break;
    }
    case SALE: {
      div.innerHTML = cardSale;
      break;
    }
    case BSALE: {
      div.innerHTML = cardBsale;
      break;
    }
  }
  const container = div.querySelector(".slider_container");
  const pictures = container.querySelectorAll(".card_picture");
  [...pictures][0].classList.add('card_picture--active');
  const card = div.firstElementChild;
  card.classList.add('card--deal');
  return card;
}

export function createObjectList(deal, objects, cardList) {
  const cards = cardList.children;
  if(cards && cards.length) {
    for(let i = cards.length - 1; i >= 0; i--)
    cards[i].remove();
  }
  objectList = [];
  for(let i = 0; i < objects.length; i++) {
    const card = createObject(deal, objects[i]);
    objectList.push(objects[i]);
    cardList.append(card);
    const slider = [...cards][i].querySelector('.card_wrapper');
    sliderInit(slider, card, 5);
  }
}
