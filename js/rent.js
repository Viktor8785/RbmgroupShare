const dropdownRent=document.querySelector("#rent-dropdown"),inputRent=document.querySelector("#rent-input"),bSale=document.querySelector("#bsale"),bSaleTitle=document.querySelector("#bsale-title"),bSaleInput1=document.querySelector("#bsale-input1"),bSaleInput2=document.querySelector("#bsale-input2"),headerNav=document.querySelector("#header-nav"),headerNavWrapper=document.querySelector("#header-nav-wrapper"),headerMenu=document.querySelector("#header-menu"),headerLogo=document.querySelector("#header-logo"),headerClose=document.querySelector("#header-close");function show(e){inputRent.value=e}dropdownRent.onclick=function(){dropdownRent.classList.toggle("active")},bSale.addEventListener("click",(e=>{bSale.checked?(bSaleTitle.classList.remove("bussines-sale_disabled"),bSaleInput1.disabled=!1,bSaleInput2.disabled=!1):(bSaleTitle.classList.add("bussines-sale_disabled"),bSaleInput1.disabled=!0,bSaleInput2.disabled=!0,bSaleInput1.value="",bSaleInput2.value="")})),window.addEventListener("click",(e=>{!e.composedPath().includes(dropdownRent)&&dropdownRent.classList.contains("active")&&dropdownRent.classList.toggle("active")})),window.addEventListener("touchstart",(e=>{!e.composedPath().includes(dropdownRent)&&dropdownRent.classList.contains("active")&&dropdownRent.classList.toggle("active")})),headerMenu.addEventListener("click",(e=>{headerMenu.classList.add("header_menu--opened"),headerNav.classList.add("header_nav--opened"),headerNavWrapper.classList.add("header_nav-wrapper--opened"),headerLogo.classList.add("header_logo--opened"),headerClose.classList.add("header_close--opened")})),headerClose.addEventListener("click",(e=>{headerMenu.classList.remove("header_menu--opened"),headerNav.classList.remove("header_nav--opened"),headerNavWrapper.classList.remove("header_nav-wrapper--opened"),headerLogo.classList.remove("header_logo--opened"),headerClose.classList.remove("header_close--opened")}));