const elementTemplateMarker = document.querySelector('#marker-template').content;

export var loadMap;
export var markerList = [];
export const CENTER = [30.349012, 59.930534];
export const ZOOM = 13;
let mapCurrent;

export async function initMap() {
  await ymaps3.ready;

  const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer} = ymaps3;

  const map = new YMap(
      document.getElementById('map'),
      {
        location: {
          center: CENTER,
          zoom: ZOOM
        }
      }
  );
  map.addChild(new YMapDefaultSchemeLayer({}));
  map.addChild(new YMapDefaultFeaturesLayer({}));
  mapCurrent = map;
  return new Promise(resolve => {
    loadMap = map;
    resolve(map);
  });
}

function createMarker(object) {
  let markerCurrent = null;
  const {YMapMarker} = ymaps3;
  const template = elementTemplateMarker.cloneNode(true);
  const markerElement = document.createElement('div');
  markerElement.appendChild(template);
  const balloonElement = markerElement.querySelector('.balloon');
  markerElement.addEventListener('click', () => {
    balloonElement.classList.add('balloon--open');
    markerElement.parentElement.style.zIndex = 1;
    markerCurrent = markerElement;
  });
  document.addEventListener('click', (e) => {
    if(!e.composedPath().includes(markerElement) && balloonElement.classList.contains('balloon--open')) {
      markerCurrent.parentElement.style.zIndex = 0;
      markerCurrent = null;
      balloonElement.classList.remove('balloon--open');
    }
  })
  const marker = new YMapMarker({coordinates: [object.lon, object.lat]}, markerElement);
  return marker;
}

export function createMarkerList(objects, map) {
  objects.forEach(object => {
    const marker = createMarker(object);
    map.addChild(marker);
    markerList.push(marker);
  })
}

export function deleteMarkerList(map) {
  markerList.forEach(marker => {
    map.removeChild(marker);
  })
  markerList = [];
}

export function setLocation(location) {
  if(mapCurrent) {
    mapCurrent.setLocation({location: location});
  }
}

export function changeCenter(location) {
  if(mapCurrent) {
    mapCurrent.update({location: location});
  }
}
