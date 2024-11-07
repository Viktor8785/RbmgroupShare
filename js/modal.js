const modalWindow = document.querySelector(".modal-call");
const modalCallWrapper = document.querySelector(".modal-call_wrapper");
const modalClose = document.querySelector(".modal-call_close");
const headerRecall = document.querySelector("#header-recall");
const footerRecall = document.querySelector("#footer-recall");
const footerRecallMobile = document.querySelector("#footer-recall-mobile");
const buttonPhone = document.querySelector("#button-phone");
const callInputPhone = document.querySelector("#call-input-phone");
const buttonWhatsapp = document.querySelector("#button-whatsapp");

export function modal() {
  if(modalWindow) {
    let recallInputCompleted = false;
    let recallInputNameCompleted = false;
    let recallInputUnmasked;

    buttonPhone.disabled = true;


    document.addEventListener('click', (e) => {
      if(!e.composedPath().includes(modalCallWrapper) &&
        !e.composedPath().includes(headerRecall) &&
        !e.composedPath().includes(footerRecall) &&
        !e.composedPath().includes(footerRecallMobile) &&
        modalWindow.classList.contains('modal-call--active')) {
          modalWindow.classList.remove('modal-call--active');
      }
    });

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
