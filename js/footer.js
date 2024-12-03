const footerRecall = document.querySelector("#footer-recall");
const footerRecallDesktop = document.querySelector("#footer-recall-desktop");
const footerRecallMobile = document.querySelector("#footer-recall-mobile");
const modal = document.querySelector(".modal-call");

export function footer() {

  footerRecall.addEventListener('click', (ev) => {
    if(modal) {
      modal.classList.add('modal-call--active');
    }
  });

  footerRecallMobile.addEventListener('click', (ev) => {
    if(modal) {
      modal.classList.add('modal-call--active');
    }
  });

  footerRecallDesktop.addEventListener('click', (ev) => {
    if(modal) {
      modal.classList.add('modal-call--active');
    }
  });
}

