import { dieOptions } from './consts';

export function shuffleDeck(deck) {
  var deckCopy = deck.slice();
  var m = deckCopy.length, temp, indexToRandomize;

  while (m) {
    indexToRandomize = Math.floor(Math.random() * m--);
    temp = deckCopy[m];
    deckCopy[m] = deckCopy[indexToRandomize];
    deckCopy[indexToRandomize] = temp;
  }

  return deckCopy;
}

export function makeFullPlaneUrl(planeUrl) {
  return planeUrl.indexOf('who') === 0 ? `./who/${planeUrl}` : `./mtg/${planeUrl}`;
}

export function getMappedPlaneList(planeList, imageMap) {
  return planeList.map(plane => {
    return getMappedPlane(plane, imageMap);
  });
}

export function getMappedPlane(plane, imageMap) {
  if (plane && plane.url) {
    const urlKey = makeFullPlaneUrl(plane.url);
    plane.url = imageMap[urlKey];
    return plane;
  }
  return plane;
}

export function getDieResultFromName(dieResultName) {
  return dieOptions.find(option => {
    return option.name === dieResultName;
  });
}

export function importAll(r, set) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace(`../img/webcam-friendly/planes/${set}`, '')] = r(item);
  });
  return images;
}