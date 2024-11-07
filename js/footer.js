const footerSubscribe = document.querySelector("#footer-subscribe");
const footerRecall = document.querySelector("#footer-recall");
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
}

