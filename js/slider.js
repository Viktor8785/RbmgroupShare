let sliderList,sliderTrack,slides,arrows,prev,next,slideWidth,lastTrf,posThreshold,slidesCount,cardIds=[],cardIndex=0,cards=[],currentCardIndex=-1,slideIndex=0,posInit=0,posX1=0,posX2=0,posY1=0,posY2=0,posFinal=0,isSwipe=!1,isScroll=!1,allowSwipe=!0,transition=!0,nextTrf=0,prevTrf=0,trfRegExp=/([-0-9.]+(?=px))/;const getEvent=function(){return cards.forEach(((e,s)=>{event.composedPath().includes(e)&&(currentCardIndex=s,console.log(currentCardIndex))})),-1!==event.type.search("touch")?event.touches[0]:event},slide=function(){transition&&(sliderTrack.style.transition="transform .5s"),sliderTrack.style.transform=`translate3d(-${slideIndex*slideWidth}px, 0px, 0px)`},swipeStart=function(){let e=getEvent();allowSwipe&&(transition=!0,nextTrf=(slideIndex+1)*-slideWidth,prevTrf=(slideIndex-1)*-slideWidth,posInit=posX1=e.clientX,posY1=e.clientY,sliderTrack.style.transition="",document.addEventListener("touchmove",swipeAction),document.addEventListener("mousemove",swipeAction),document.addEventListener("touchend",swipeEnd),document.addEventListener("mouseup",swipeEnd))},swipeAction=function(){let e=getEvent(),s=+sliderTrack.style.transform.match(trfRegExp)[0];if(posX2=posX1-e.clientX,posX1=e.clientX,posY2=posY1-e.clientY,posY1=e.clientY,!isSwipe&&!isScroll){let e=Math.abs(posY2);e>7||0===posX2?(isScroll=!0,allowSwipe=!1):e<7&&(isSwipe=!0)}if(isSwipe){if(0===slideIndex){if(posInit<posX1)return void setTransform(s,0);allowSwipe=!0}if(slideIndex===--slidesCount){if(posInit>posX1)return void setTransform(s,lastTrf);allowSwipe=!0}if(posInit>posX1&&s<nextTrf||posInit<posX1&&s>prevTrf)return void reachEdge();sliderTrack.style.transform=`translate3d(${s-posX2}px, 0px, 0px)`}},swipeEnd=function(){posFinal=posInit-posX1,isScroll=!1,isSwipe=!1,document.removeEventListener("touchmove",swipeAction),document.removeEventListener("mousemove",swipeAction),document.removeEventListener("touchend",swipeEnd),document.removeEventListener("mouseup",swipeEnd),allowSwipe?(Math.abs(posFinal)>posThreshold&&(posInit<posX1?slideIndex--:posInit>posX1&&slideIndex++),posInit!==posX1?(allowSwipe=!1,transition&&(sliderTrack.style.transition="transform .5s"),sliderTrack.style.transform=`translate3d(-${slideIndex*slideWidth}px, 0px, 0px)`):allowSwipe=!0):allowSwipe=!0},setTransform=function(e,s){e>=s&&e>s&&(sliderTrack.style.transform=`translate3d(${s}px, 0px, 0px)`),allowSwipe=!1},reachEdge=function(){transition=!1,swipeEnd(),allowSwipe=!0};export function sliderInit(e,s,t){slidesCount=t,cards[cardIndex]=s,cardIds[cardIndex]=s.id,cardIndex++,sliderList=e.querySelector(".card_slider"),sliderTrack=e.querySelector(".slider_container"),slides=e.querySelectorAll(".card_picture"),slideWidth=slides[0].offsetWidth,lastTrf=--slidesCount*slideWidth,posThreshold=.35*slides[0].offsetWidth,sliderTrack.style.transform="translate3d(0px, 0px, 0px)",sliderTrack.addEventListener("transitionend",(()=>allowSwipe=!0)),sliderList.addEventListener("touchstart",swipeStart),sliderList.addEventListener("mousedown",swipeStart)}