import { getMappedPlane } from './utils';
import { planeImages } from './consts.js';

function getHeadersJson() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Request-Headers': '*',
    'Access-Control-Allow-Origin': '*'
  }
}

export async function getSession(sessionCode) {
//   curl --location 'https://us-east-1.aws.data.mongodb-api.com/app/data-napyt/endpoint/data/v1/action/findOne' \
// --header 'Content-Type: application/json' \
// --header 'Access-Control-Request-Headers: *' \
// --header 'api-key: kqhoHk09XphZcWMeBlGUOgDSXwvQDDkkn5mRXreTwyV6afivwZYiTnit6JSt7JyO' \
// --header 'Accept: application/json' \
// --data '{
//       'dataSource': 'dhuber-cluster-0',
//       'database': 'planechase',
//       'collection': 'sessions',
//       'filter': { '_id': 'ABCD'  }
//   }'

  console.log('getting session ' + sessionCode);
  return await fetch(`https://dhuber.pythonanywhere.com/planechaseSessions/getSession/${sessionCode}/`)
    .then(response => response.json())
    .then(data => {
      const plane = getMappedPlane(data[1].fields, planeImages);
      plane['id'] = data[1].pk;
      return {
        code: data[0].pk,
        plane: plane,
        rollCost: data[0].fields.rollCost,
        rollResult: data[0].fields.rollResult,
        planarDeck: data[0].fields.planarDeck
      };
    })
    .catch(error => console.log('error getting sessions: ' + error));
}

export async function makeNewSession(activePlane, planarDeck) {
  const options = {
    method: 'POST',
    headers: getHeadersJson,
    body: JSON.stringify(planarDeck)
  };

  return await fetch(`https://dhuber.pythonanywhere.com/planechaseSessions/makeSession/${activePlane.id}/`, options)
    .then(response => response.json())
    .then(data => {
      const plane = getMappedPlane(data[1].fields, planeImages);
      return {
        code: data[0].pk,
        plane: plane,
        rollCost: data[0].fields.rollCost,
        rollResult: data[0].fields.rollResult,
        planarDeck: data[0].fields.planarDeck
      };
    })
    .catch(error => console.log('error making session: ' + error));
}

export async function getAllPlanes() {
  console.log('getAllPlanes');
  return await fetch(`https://dhuber.pythonanywhere.com/planechaseSessions/getWebcamFriendlyPlanes/`)
    .then(response => response.json())
    .catch(error => console.log('error getting all planes: ' + error));
}

export async function updateSession(sessionCode, data) {
  const options = {
    method: 'POST',
    headers: getHeadersJson,
    body: JSON.stringify(data)
  };

  return await fetch(`https://dhuber.pythonanywhere.com/planechaseSessions/updateSession/${sessionCode}/`, options)
    .then(response => response.json())
    .then(data => {
      const plane = getMappedPlane(data[1].fields, planeImages);
      return {
        code: data[0].pk,
        plane: plane,
        rollCost: data[0].fields.rollCost,
        rollResult: data[0].fields.rollResult,
        planarDeck: data[0].fields.planarDeck
      };
    })
    .catch(error => console.log('error making session: ' + error));
}

export async function searchScryfall(searchTerms) {
  return await fetch (`https://api.scryfall.com/cards/search?q=${searchTerms}`)
    .then(response => response.json())
    .then(response => {
      const data = response.data;
      const planeNames = data.map(plane => {
        // const splitUri = `${plane.scryfall_uri.split('/').splice(4).join('-').split('?').splice(0, 1).join('')}.jpg`;
        // return splitUri;
        return plane.name.toLowerCase();
      });
      return planeNames;
    })
    .catch(error => console.log('error getting scryfall search'));
}