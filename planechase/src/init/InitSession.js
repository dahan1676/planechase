import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPlanes, makeNewSession, searchScryfall } from '../tools/fetches.js';
import { shuffleDeck, getMappedPlaneList } from '../tools/utils.js';
import { planeImages } from '../tools/consts.js';
import './InitSession.css';

export default function NewSession() {
  function makeShuffledPlanarDeck(planeList) {
    const mappedPlaneList = getMappedPlaneList(planeList, planeImages);
    const shuffledDeck = shuffleDeck(mappedPlaneList);
    return shuffledDeck
  }

  function updateSearchText(event) {
    const textVal = event.target.value;
    const searchVals = getSearchRequests(textVal);
    setSearchText(searchVals);
  }

  function getSearchRequests(searchString) {
    // split the string and add them back unless it goes above 900 chars
    // any names past the 900 chars will get put into a new search request
    // scryfall search only supports 1000 characters

    const searchRequests = [];
    var searchTerms = '(';
    const splitTerms = searchString.split('\n').map(entry => {return `name:"${entry}"`});
    for (var i = 0; i < splitTerms.length; i++) {
      const term = splitTerms[i];
      if (searchTerms.length > 1) {
        searchTerms = searchTerms.concat(' or ', term);
      } else {
        searchTerms = searchTerms.concat(term);
      }
      

      if ((searchTerms.length > 900) || (i >= splitTerms.length - 1)) {
        searchTerms = searchTerms.concat(') and (type:plane or type:phenomenon)');
        searchRequests.push(searchTerms.slice());
        searchTerms = '(';
      }
    }

    return searchRequests;
  }

  async function handleSearch() {
    // return results for each search then append them
    const copiedSearchText = searchText.slice();
    const searchTextPromises = copiedSearchText.map(function(text) {
      return searchScryfall(text);
    });

    Promise.all(searchTextPromises).then((results) => {
      var combinedResults = [];
      results.forEach(result => {
        combinedResults = combinedResults.concat(result);
      });

      handleAll(combinedResults);
    });
  }

  async function handleAll(inputPlaneList) {
    getAllPlanes().then(planeList => {
      console.log('planeList: ' + planeList.length);
      if (inputPlaneList) {
        planeList = planeList.filter(plane => {return inputPlaneList.indexOf(plane.name.toLowerCase()) > -1});
      }
      const shuffledPlanarDeck = makeShuffledPlanarDeck(planeList);
      const firstPlane = shuffledPlanarDeck.pop();
      
      makeNewSession(firstPlane, shuffledPlanarDeck).then(newSession => {
        console.log(newSession);
        navigate(`/${newSession.code}`, { state: newSession });
      });
    });
  }

  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  return (
    <div className='controls'>
      <h1>Planechase</h1>
      <p>Enter a list of planes and phenomena</p>
      <div className='input'>
        <textarea placeholder='Ex:&#10;Gavony&#10;Planewide Disaster&#10;Unyaro&#10;Etc...' onChange={event => updateSearchText(event)} />
      </div>
      <div className='buttons'>
        <button className='submit' onClick={handleSearch}>Search</button>
        <button className='submit' onClick={handleAll}>Give me all the planes!</button>
      </div>
    </div>
  );
}