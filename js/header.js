const headerNav = document.querySelector("#header-nav");
const headerNavWrapper = document.querySelector("#header-nav-wrapper");
const headerMenu = document.querySelector("#header-menu");
const headerLogo = document.querySelector("#header-logo");
const headerSearch = document.querySelector("#header-search");
const headerSearchBlue = document.querySelector("#header-search-blue");
const headerHeart = document.querySelector("#header-heart");
const headerHeartEmpty = document.querySelector("#header-heart-empty");
const headerHeartRed = document.querySelector("#header-heart-red");
const headerHeartBlueEmpty = document.querySelector("#header-heart-blue-empty");
const headerHeartBlueRed = document.querySelector("#header-heart-blue-red");
const headerClose = document.querySelector("#header-close");
const headerSearchWrapper = document.querySelector("#header-search-wrapper");
const headerPhone = document.querySelector("#header-phone");
const headerRecall = document.querySelector("#header-recall");
const headerRecallDesktop = document.querySelector("#header-recall-desktop");
const headerForm = document.querySelector("#header-form");
const headerFormDesc = document.querySelector("#header-form-desc");
const modal = document.querySelector(".modal-call");
const mediaQueryDesktopSmall = window.matchMedia('(min-width: 1440px)');

mediaQueryDesktopSmall.addEventListener('change', handleWidthChangeDesktopSmall);

function handleWidthChangeDesktopSmall(e) {
  if (e.matches) {
    headerMenu.classList.remove("header_menu--opened");
    headerNav.classList.remove("header_nav--opened");
    headerNavWrapper.classList.remove("header_nav-wrapper--opened");
    headerLogo.classList.remove("header_logo--opened");
    headerClose.classList.remove("header_close--opened");
    headerSearchWrapper.classList.remove("header_search-wrapper--opened");
  }
};

export function header() {

  headerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  headerFormDesc.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  headerMenu.addEventListener('click', (ev) => {
    headerMenu.classList.add("header_menu--opened");
    headerNav.classList.add("header_nav--opened");
    headerNavWrapper.classList.add("header_nav-wrapper--opened");
    headerSearch.classList.add("header_search--opened");
    headerSearchBlue.classList.add("header_search-blue--opened");
    headerSearchBlue.classList.remove("header_search-blue--active");
    if(headerHeart) {
      headerHeart.classList.add("header_heart--opened");
    }
    headerLogo.classList.add("header_logo--opened");
    headerClose.classList.add("header_close--opened");
    if(headerSearchWrapper.classList.contains("header_search-wrapper--opened")) {
      headerSearchWrapper.classList.remove("header_search-wrapper--opened");
    }
  });

  headerClose.addEventListener('click', (ev) => {
    headerMenuClose();
  });

  headerPhone.addEventListener('click', (ev) => {
    if(headerMenu.classList.contains("header_menu--opened")) {
      headerMenuClose();
    }
  });

  headerRecall.addEventListener('click', (ev) => {
    if(headerMenu.classList.contains("header_menu--opened")) {
      headerMenuClose();
    }
    if(modal) {
      modal.classList.add('modal-call--active');
    }
  });

  headerRecallDesktop.addEventListener('click', (ev) => {
    if(modal) {
      modal.classList.add('modal-call--active');
      console.log(modal.classList)
    }
  });

  headerSearch.addEventListener('click', (ev) => {
    headerSearchWrapper.classList.toggle("header_search-wrapper--opened");
    headerSearch.classList.toggle("header_search--active");
    headerSearchBlue.classList.toggle("header_search-blue--active");
  });

  headerSearchBlue.addEventListener('click', (ev) => {
    headerSearchWrapper.classList.toggle("header_search-wrapper--opened");
    headerSearch.classList.toggle("header_search--active");
    headerSearchBlue.classList.toggle("header_search-blue--active");
  });

  checkFavorites();

  function headerMenuClose() {
    headerMenu.classList.remove("header_menu--opened");
    headerNav.classList.remove("header_nav--opened");
    headerNavWrapper.classList.remove("header_nav-wrapper--opened");
    headerSearch.classList.remove("header_search--opened");
    headerSearch.classList.remove("header_search--active");
    headerSearchBlue.classList.remove("header_search-blue--opened");
    if(headerHeart) {
      headerHeart.classList.remove("header_heart--opened");
    }
    headerLogo.classList.remove("header_logo--opened");
    headerClose.classList.remove("header_close--opened");
  }

}

export function checkFavorites() {
  let watchList = JSON.parse(localStorage.getItem('favorites'));
  if(watchList && watchList.length){
    headerHeartEmpty.classList.remove('header_heart--view');
    headerHeartRed.classList.add('header_heart-red--view');
    headerHeartBlueEmpty.classList.remove('header_heart-blue--view');
    headerHeartBlueRed.classList.add('header_heart-blue-red--view');
  } else {
    headerHeartEmpty.classList.add('header_heart--view');
    headerHeartRed.classList.remove('header_heart-red--view');
    headerHeartBlueEmpty.classList.add('header_heart-blue--view');
    headerHeartBlueRed.classList.remove('header_heart-blue-red--view');
  }
}

