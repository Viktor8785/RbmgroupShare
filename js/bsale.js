import {header} from './header.js';
import {footer} from './footer.js';
import {modal} from './modal.js';
import {sliderInit} from './slider.js'
import {initMap, createMarkerList, deleteMarkerList, markerList} from './map.js';
import {loadData} from './load.js';

const cardList = document.querySelector('.card-list');
const cards = cardList.children;
const buttonWrapper = document.querySelector('.pagination-site-number-wrapper');
const filterBSale = document.querySelector('#filter-bsale');
// const buttons = buttonWrapper.querySelectorAll('button');

const inputWrapper1 = document.querySelector('#input-wrapper-1');
const inputWrapper2 = document.querySelector('#input-wrapper-2');
const inputs1 = inputWrapper1.querySelectorAll('input');
const inputs2 = inputWrapper2.querySelectorAll('input');
const inputAll = document.querySelector('#all-bsale');
const recallLink = document.querySelector('.recall_link');

const map = document.querySelector("#map");

const dropdownPyback = document.querySelector("#payback-dropdown");
const inputPayback = document.querySelector("#payback-input")
const optionsPayback = document.querySelectorAll(".options_item--payback")
const budget1 = document.querySelector("#budget1");
const budget2 = document.querySelector("#budget2");
const budget3 = document.querySelector("#budget3");
const budget4 = document.querySelector("#budget4");
const budget5 = document.querySelector("#budget5");
const bSalePrice = document.querySelector("#bsale-price-min");
const bSalePriceMax = document.querySelector("#bsale-price-max");
const profit = document.querySelector("#profit");

let loadMap = false;
const inputs = [...inputs1, ...inputs2];

let currentPage = 1;
const scrollEnd = 100;
const scrollEndMin = 10;
const scrollDelay = 100;
const inputDelay = 1000;
let lastCall = 0;
let lastScrollTop = 0;
let isLoading = false;
let lastPage = false;
let timeoutId;

initFilterFormFromURL();
loadCardsData(currentPage);

window.addEventListener('popstate', function() {
  initFilterFormFromURL();
  currentPage = 1;
  isLoading = false;
  loadCardsData(currentPage);
});

function loadCardsData(page) {
  isLoading = true;
  loadData(page).then(cards => {
    isLoading = false;
  }).catch(error => {
    isLoading = false;
  });
}

function throttle(callback, delay) {
  return function() {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      callback();
      lastCall = now;
    }
  };
}

function handleScroll() {
  const currentScroll = cardList.scrollTop;
  let scrollBottom = cardList.scrollHeight - cardList.scrollTop - cardList.clientHeight;
  if (currentScroll > lastScrollTop) {
    if (scrollBottom < scrollEnd && scrollBottom > scrollEndMin && !isLoading && !lastPage) {
      currentPage += 1;
      loadCardsData(currentPage);
    }
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

cardList.addEventListener('scroll', throttle(handleScroll, scrollDelay));

filterBSale.addEventListener('change', (evt) => {
  if(evt.target.name === 'bsalePriceMin' ||
   evt.target.name === 'bsalePriceMax' ||
   evt.target.name === 'profit') {
    return;
   }
  handleInput(evt);
});

function handleInput(evt) {
  const params = getFormData();
  let delay = inputDelay;
  if(!evt.target.type || evt.target.type === 'checkbox') {
    delay = 0;
  } else {
    delay = inputDelay;
  }
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    updateURL(params);
    currentPage = 1;
    loadCardsData(currentPage);
  }, delay);
}

function updateURL(params) {
  const url = new URL(window.location);
  url.search = new URLSearchParams(params).toString();
  history.pushState(null, '', url);
}

function getFormData() {
  const formData = new FormData(filterBSale);
  const params = {};
  formData.forEach((value, key) => {
    if(value) {
      switch(key) {
        case 'bsalePriceMin': {
          params[key] = value.replace(/[^0-9]/g, '');
          break;
        }
        case 'bsalePriceMax': {
          params[key] = value.replace(/[^0-9]/g, '');
          break;
        }
        case 'profit': {
          params[key] = value.replace(/[^0-9]/g, '');
          break;
        }
        case 'budget': {
          break;
        }
        case 'paybackBsale': {
          if(value === '12 месяцев') {
            params[key] = '12';
          }
          if(value === '24 месяца') {
            params[key] = '24';
          }
          break;
        }
        default: {
          params[key] = value;
          break;
        }
      }
    }
  });
  return params;
}

function initFilterFormFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const filterRentInputs = filterBSale.querySelectorAll('input');
  filterRentInputs.forEach(input => {
    const paramValue = urlParams.get(input.name);
    if (paramValue !== null) {
      if (input.type === 'checkbox') {
        input.checked = (paramValue === input.value);
      } else if (input.type === 'text') {
          if(input.name === 'bsalePriceMin' || input.name === 'bsalePriceMax' || input.name === 'profit') {
            input.value = transformPriceRent(paramValue);
          } else if(input.name === 'paybackBsale') {
              if(paramValue === '12') {
                input.value = '12 месяцев';
              }
              if(paramValue === '24') {
                input.value = '24 месяца';
              }
          } else {
            input.value = paramValue;
          }
      }
    } else {
      if (input.type === 'checkbox') {
        input.checked = false;
      } else if (input.type === 'text') {
          if(input.name === 'paybackBsale') {
            input.value = 'Любая';
          } else {
              input.value = '';
          }
      }
    }
  });
}

function transformPriceRent(evt) {
  evt = evt.replace(/[^0-9]/g, '');
  evt = evt.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return evt;
}

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

bSalePriceMax.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

bSalePriceMax.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
});


bSalePrice.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

bSalePrice.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
  budget1.checked = false;
  budget2.checked = false;
  budget3.checked = false;
  budget4.checked = false;
  budget5.checked = false;
});

profit.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

profit.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
});


filterBSale.addEventListener('submit', (evt) => {
  evt.preventDefault();
});

// buttons.forEach(button => {
//   button.addEventListener('click', () => {
//     buttons.forEach(item => {
//       if(item.classList.contains('active')) {
//         item.classList.remove('active');
//       }
//     })
//     button.classList.add('active');
//   });
// });

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

optionsPayback.forEach(option => {
  option.addEventListener('click', (ev) => {
    inputPayback.value = ev.target.innerText;
    handleInput(ev);
  });
});

dropdownPyback.onclick = function() {
  dropdownPyback.classList.toggle("active");
}

budget1.addEventListener('click', (ev) => {
  bSalePrice.value = '500 000';
});
budget2.addEventListener('click', (ev) => {
  bSalePrice.value = '1 000 000';
});
budget3.addEventListener('click', (ev) => {
  bSalePrice.value = '2 000 000';
});
budget4.addEventListener('click', (ev) => {
  bSalePrice.value = '3 000 000';
});
budget5.addEventListener('click', (ev) => {
  bSalePrice.value = '5 000 000';
});

window.addEventListener('click', (ev) => {
  if (!ev.composedPath().includes(dropdownPyback) && dropdownPyback.classList.contains("active")) {
    dropdownPyback.classList.toggle("active");
  }
});

window.addEventListener('touchstart', (ev) => {
  if (!ev.composedPath().includes(dropdownPyback) && dropdownPyback.classList.contains("active")) {
    dropdownPyback.classList.toggle("active");
  }
});

header();
footer();
modal();
