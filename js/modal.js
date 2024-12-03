const modalWindow = document.querySelector(".modal-call");
const modalCallWrapper = document.querySelector(".modal-call_wrapper");
const modalClose = document.querySelector(".modal-call_close");
const headerRecall = document.querySelector("#header-recall");
const headerRecallDesktop = document.querySelector("#header-recall-desktop");
const footerRecallDesktop = document.querySelector("#footer-recall-desktop");
const footerRecall = document.querySelector("#footer-recall");
const footerRecallMobile = document.querySelector("#footer-recall-mobile");
const buttonPhone = document.querySelector("#button-phone");
const callInputPhone = document.querySelector("#call-input-phone");
const buttonWhatsapp = document.querySelector("#button-whatsapp");

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

export function modal() {
  if(modalWindow) {
    let recallInputCompleted = false;
    let recallInputNameCompleted = false;
    let recallInputUnmasked;

    buttonPhone.disabled = true;


    if(sale && arendator && bsale && consult1 && consult2 && consult3 && financeConsult1 && financeConsult2 && dealsCall1 && dealsCall2 && arendatorCall) {
      document.addEventListener('click', (e) => {
        if(!e.composedPath().includes(modalCallWrapper) &&
          !e.composedPath().includes(headerRecall) &&
          !e.composedPath().includes(headerRecallDesktop) &&
          !e.composedPath().includes(footerRecallDesktop) &&
          !e.composedPath().includes(footerRecall) &&
          !e.composedPath().includes(footerRecallMobile) &&
          !e.composedPath().includes(sale) &&
          !e.composedPath().includes(arendator) &&
          !e.composedPath().includes(bsale) &&
          !e.composedPath().includes(consult1) &&
          !e.composedPath().includes(consult2) &&
          !e.composedPath().includes(consult3) &&
          !e.composedPath().includes(financeConsult1) &&
          !e.composedPath().includes(financeConsult2) &&
          !e.composedPath().includes(dealsCall1) &&
          !e.composedPath().includes(dealsCall2) &&
          !e.composedPath().includes(arendatorCall) &&
          modalWindow.classList.contains('modal-call--active')) {
            modalWindow.classList.remove('modal-call--active');
        }
      });
    } else {
      document.addEventListener('click', (e) => {
        if(!e.composedPath().includes(modalCallWrapper) &&
          !e.composedPath().includes(headerRecall) &&
          !e.composedPath().includes(headerRecallDesktop) &&
          !e.composedPath().includes(footerRecallDesktop) &&
          !e.composedPath().includes(footerRecall) &&
          !e.composedPath().includes(footerRecallMobile) &&
          modalWindow.classList.contains('modal-call--active')) {
            modalWindow.classList.remove('modal-call--active');
        }
      });
    }

    modalClose.addEventListener('click', () => {
      modalWindow.classList.remove('modal-call--active');
    });

    buttonPhone.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalWindow.classList.remove('modal-call--active');
    });

    buttonWhatsapp.addEventListener('click', () => {
      modalWindow.classList.remove('modal-call--active');
    });

    const phoneMask = new IMask(callInputPhone, {
      mask: "+{7}(000)000-00-00",
      lazy: false,
    });

    phoneMask.on('complete', () => {
      recallInputCompleted = true;
      buttonPhone.disabled = false;
      recallInputUnmasked = phoneMask.unmaskedValue;
    });
    phoneMask.on('accept', () => {
      recallInputCompleted = false;
      buttonPhone.disabled = true;
    });
  }
}
