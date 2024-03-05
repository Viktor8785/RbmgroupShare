import {RENT, SALE, BSALE} from './deals.js';

function getObjectsData(deal) {
  let count = 0;
  let data = [];
  switch (deal) {
    case RENT: {
      count = 255;
      data = [];
      for(let i=0; i < count; i++) {
        data.push(createObjectData(deal));
      }
      break;
    }
    case SALE: {
      count = 199;
      data = [];
      for(let i=0; i < count; i++) {
        data.push(createObjectData(deal));
      }
      break;
    }
    case BSALE: {
      count = 33;
      data = [];
      for(let i=0; i < count; i++) {
        data.push(createObjectData(deal));
      }
      break;
    }
  }
  return {
    count: count,
    data: data
  }
}

export function getObjects(deal, page, pageSize) {
  const objects = getObjectsData(deal);
  const start = page * pageSize;
  if(start < 0 || start >= objects.data.length) {
    return {
      count: objects.count,
      data: []
    }
  }
  let end = (page + 1) * pageSize;
  if(end < 0 ) {
    return {
      count: objects.count,
      data: []
    }
  }
  if(end >= objects.data.length) {
    end = objects.data.length
  }

  return {
    count: objects.count,
    data: objects.data.slice(start, end)
  }
}

function createObjectData(deal) {
  let price = '';
  switch (deal) {
    case RENT: {
      price = '250 000 ₽/м';
      break;
    }
    case SALE: {
      price = '400 000 000 ₽';
      break;
    }
    case BSALE: {
      price = '1 000 000 ₽/м';
      break;
    }
  }
  const data = {
    lon: 30.28 + Math.random() / 10,
    lat: 59.88 + Math.random() / 10,
    price: price
  }
  return data;
}

