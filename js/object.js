import{header}from"./header.js";const photos=document.querySelectorAll(".photos_picture"),objectPhotos=document.querySelectorAll(".object-sale_picture");photos.forEach(((e,t)=>{e.addEventListener("click",(e=>{objectPhotos.forEach((e=>{e.classList.contains("object-sale_picture--active")&&e.classList.remove("object-sale_picture--active")})),[...objectPhotos][t].classList.add("object-sale_picture--active")}))})),header();