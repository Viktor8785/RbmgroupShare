import {header} from './header.js';
import {footer} from './footer.js';
import {modal} from './modal.js';
import {sliderInit} from './slider.js'
import {initMap, createMarkerList, deleteMarkerList, markerList} from './map.js';
import {loadData} from './load.js';

const cardList = document.querySelector('.card-list');
const cards = cardList.children;

const buttonWrapper = document.querySelector('.pagination-site-number-wrapper');
const filterRent = document.querySelector('#filter-rent');
// const buttons = buttonWrapper.querySelectorAll('button');
const recallLink = document.querySelector('.recall_link');

const inputWrapper1 = document.querySelector('#input-wrapper-1');
const inputWrapper2 = document.querySelector('#input-wrapper-2');
const inputs1 = inputWrapper1.querySelectorAll('input');
const inputs2 = inputWrapper2.querySelectorAll('input');
const inputAll = document.querySelector('#all-rent');

const map = document.querySelector("#map");

const bSale = document.querySelector("#bsale");
const bSaleMobile = document.querySelector("#bsale-mobile");
const bSaleTitle = document.querySelector("#bsale-title");
const priceBSale = document.querySelector("#price-bsale");
const priceBSaleMax = document.querySelector("#price-bsale-max");
const priceRent = document.querySelector("#price-rent");
const priceRentMax = document.querySelector("#price-rent-max");
const squareMin = document.querySelector('#square-min');
const squareMax = document.querySelector('#square-max');
const location = document.querySelector('#location');

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

initFilterFormFromURL(null);
loadCardsData(currentPage);

window.addEventListener('popstate', function() {
  initFilterFormFromURL('popstate');
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

filterRent.addEventListener('change', (evt) => {
  if(evt.target.name === 'rentPriceMin' ||
   evt.target.name === 'rentPriceMax' ||
   evt.target.name === 'businessSalePriceMin' ||
   evt.target.name === 'businessSalePriceMax' ||
   evt.target.name === 'squareMin' ||
   evt.target.name === 'squareMax' ||
   evt.target.name === 'location') {
    return;
   }
  handleInput(evt);
});

function handleInput(evt) {
  const filterRentInputs = filterRent.querySelectorAll('input');
  if(evt.target.name === 'actual') {
    filterRentInputs.forEach(item => {
      if(item.name === 'actualMobile') {
        item.checked = evt.target.checked;
      }
    })
  }
  if(evt.target.name === 'actualMobile') {
    filterRentInputs.forEach(item => {
      if(item.name === 'actual') {
        item.checked = evt.target.checked;
      }
    })
  }
  if(evt.target.name === 'occupied') {
    filterRentInputs.forEach(item => {
      if(item.name === 'occupiedMobile') {
        item.checked = evt.target.checked;
      }
    })
  }
  if(evt.target.name === 'occupiedMobile') {
    filterRentInputs.forEach(item => {
      if(item.name === 'occupied') {
        item.checked = evt.target.checked;
      }
    })
  }
  if(evt.target.name === 'businessSale') {
    filterRentInputs.forEach(item => {
      if(item.name === 'businessSaleMobile') {
        item.checked = evt.target.checked;
      }
    })
  }
  if(evt.target.name === 'businessSaleMobile') {
    filterRentInputs.forEach(item => {
      if(item.name === 'businessSale') {
        item.checked = evt.target.checked;
      }
    })
  }

  const params = getFormData();
  let delay = inputDelay;
  if(evt.target.type === 'checkbox') {
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
  const formData = new FormData(filterRent);
  const params = {};
  formData.forEach((value, key) => {
    if(value) {
      if(key === 'rentPriceMin' || key === 'rentPriceMax' || key === 'businessSalePriceMin' || key === 'businessSalePriceMax') {
        params[key] = value.replace(/[^0-9]/g, '');
      } else {
        if(key === 'businessSaleMobile') {
          key = 'businessSale';
        }
        if(key === 'occupiedMobile') {
          key = 'occupied';
        }
        if(key === 'actualMobile') {
          key = 'actual';
        }
        params[key] = value;
      }
    }
  });
  return params;
}

function initFilterFormFromURL(type) {
  const urlParams = new URLSearchParams(window.location.search);
  const filterRentInputs = filterRent.querySelectorAll('input');
  filterRentInputs.forEach(input => {
    const paramValue = urlParams.get(input.name);
    if (paramValue !== null) {
      if (input.type === 'checkbox') {
        input.checked = (paramValue === input.value);
        if(input.name === 'actual') {
          filterRentInputs.forEach(item => {
            if(item.name === 'actualMobile') {
              item.checked = input.checked;
            }
          });
        }
        if(input.name === 'occupied') {
          filterRentInputs.forEach(item => {
            if(item.name === 'occupiedMobile') {
              item.checked = input.checked;
            }
          });
        }
        if(input.name === 'businessSale') {
          priceBSale.disabled = false;
          priceBSaleMax.disabled = false;
          bSaleTitle.classList.remove('business-sale_disabled');
          filterRentInputs.forEach(item => {
            if(item.name === 'businessSaleMobile') {
              item.checked = input.checked;
            }
          });
        }
      } else if (input.type === 'text') {
        if(input.name === 'rentPriceMin' || input.name === 'rentPriceMax' || input.name === 'businessSalePriceMin' || input.name === 'businessSalePriceMax') {
          input.value = transformPriceRent(paramValue);
        } else {
          input.value = paramValue;
        }
      }
    } else {
      if (input.type === 'checkbox') {
        if(input.name === 'actual' || input.name === 'actualMobile') {
          if(!type) {
            input.checked = true;
            filterRentInputs.forEach(item => {
              if(item.name === 'actualMobile') {
                item.checked = true;
              }
            });
            const params = {};
            for (const [key, value] of urlParams.entries()) {
              params[key] = value;
            }
            params['actual'] = 'on';
            updateURL(params);
          }
        } else if(input.name === 'occupiedMobile') {
          const paramValue = urlParams.get('occupied');
          if(paramValue) {
            input.checked = true;
          }
        } else if(input.name === 'businessSaleMobile') {
          const paramValue = urlParams.get('businessSale');
          if(paramValue) {
            input.checked = true;
          }
        } else {
          input.checked = false;
        }
      } else if (input.type === 'text') {
        input.value = '';
      }

      if(input.name === 'occupied') {
        filterRentInputs.forEach(item => {
          if(item.name === 'occupiedMobile') {
            item.checked = false;
          }
        });
      }
      if(input.name === 'businessSale') {
        priceBSale.disabled = true;
        priceBSaleMax.disabled = true;
        bSaleTitle.classList.add('business-sale_disabled');
        filterRentInputs.forEach(item => {
          if(item.name === 'businessSaleMobile') {
            item.checked = false;
          }
        });
      }
    }
  });
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

priceRentMax.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

priceRentMax.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
});


priceRent.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

priceRent.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
});

function transformPriceRent(evt) {
  evt = evt.replace(/[^0-9]/g, '');
  evt = evt.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return evt;
}

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

squareMin.addEventListener('input', (evt) => {
  handleInput(evt);
});

squareMax.addEventListener('input', (evt) => {
  handleInput(evt);
});

priceBSaleMax.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

priceBSaleMax.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
});


priceBSale.addEventListener('keypress', (evt) => {
  if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
  }
});

priceBSale.addEventListener('input', (evt) => {
  evt.target.value = transformPriceRent(evt.target.value);
  handleInput(evt);
});

location.addEventListener('input', (evt) => {
  handleInput(evt);
});

filterRent.addEventListener('submit', (evt) => {
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

let loadMap = false;

[...cards].forEach(card => {
  const slider = card.querySelector('.card_wrapper');
  sliderInit(slider, card, 5);
  markFavorites(card);
});

function markFavorites(card) {
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

bSale.addEventListener('click', (ev) => {
  if (!bSale.checked) {
    bSaleTitle.classList.add('business-sale_disabled');
    priceBSale.disabled = true;
    priceBSaleMax.disabled = true;
    priceBSale.value = '';
    priceBSaleMax.value = '';
  } else {
    bSaleTitle.classList.remove('business-sale_disabled');
    priceBSale.disabled = false;
    priceBSaleMax.disabled = false;
  }
});

bSaleMobile.addEventListener('click', (ev) => {
  if (!bSaleMobile.checked) {
    bSaleTitle.classList.add('business-sale_disabled');
    priceBSale.disabled = true;
    priceBSaleMax.disabled = true;
    priceBSale.value = '';
    priceBSaleMax.value = '';
  } else {
    bSaleTitle.classList.remove('business-sale_disabled');
    priceBSale.disabled = false;
    priceBSaleMax.disabled = false;
  }
});

header();
footer();
modal();
