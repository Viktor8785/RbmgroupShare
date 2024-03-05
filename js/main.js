import {header} from './header.js';
import {sliderInit} from './slider.js'
import {cardBsale} from './card-bsale-template.js';
import {cardSale} from './card-sale-template.js';
import {cardRent} from './card-rent-template.js';

const cardList = document.querySelector('.card-list');
const cards = cardList.children;

createCards(cardRent, 0);
createCards(cardSale, 1);
createCards(cardBsale, 2);
createCards(cardRent, 3);

function createCards(template, index) {
  const div = document.createElement('div');
  div.innerHTML = template;
  const container = div.querySelector(".slider_container");
  const pictures = container.querySelectorAll(".card_picture");
  [...pictures][0].classList.remove('card_picture--active');
  const picture = [...pictures][index].cloneNode(true);
  picture.classList.add('card_picture--active');
  [...pictures][index].remove();
  container.insertAdjacentElement('afterbegin', picture);
  cardList.insertAdjacentElement('afterbegin', div.firstElementChild);
};

[...cards].forEach(card => {
  const slider = card.querySelector('.card_wrapper');
  sliderInit(slider, card, 5);
})

header();
