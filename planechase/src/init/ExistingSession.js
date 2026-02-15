import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getSession, updateSession } from '../tools/fetches.js';
import { dieOptions, planeImages } from '../tools/consts.js';
import { getDieResultFromName, shuffleDeck } from '../tools/utils.js';
import PlaneDisplay from '../plane-display/PlaneDisplay.js';
import Controls from '../controls/Controls.js';
import './ExistingSession.css';

export default function Planechase() {
  function handlePlaneClick() {
    var newPlanarDeck = [];
    var newDiscard = discard;
    if (planarDeck.length > 0) {
      newPlanarDeck = planarDeck;
      newDiscard.push(activePlane);
    } else {
      newPlanarDeck = shuffleDeck(fullPlanarDeck);
      newDiscard = [];
    }

    const newPlane = newPlanarDeck.pop();
    console.log('newPlane: ' + newPlane);
    setDiscard(newDiscard);
    setActivePlane(newPlane);
    setPlanarDeck(newPlanarDeck);
    
    const updates = {
      plane: newPlane,
      planarDeck: newPlanarDeck
    };
    updateSession(session.code, updates);
  }

  function handleRoll() {
    const randomIdx = Math.floor(Math.random() * dieOptions.length);
    const newResult = dieOptions[randomIdx];
    const newCost = rollCost + 1;

    setRollResult(newResult);
    setRollCost(newCost);
    const updates = {
      rollCost: newCost,
      rollResult: newResult.name
    };
    updateSession(session.code, updates);
  }

  function handleReset() {
    setRollCost(0);
    setRollResult(dieOptions[0]);
    const updates = {
      rollCost: 0,
      rollResult: 'Blank'
    };
    updateSession(session.code, updates);
  }

  function handlePrev() {
    if (discard.length > 0) {
      const newDiscard = discard.slice();
      const newPlanarDeck = planarDeck.slice();
      const newActivePlane = newDiscard.pop();
      newPlanarDeck.push(activePlane);
      setActivePlane(newActivePlane);
      setPlanarDeck(newPlanarDeck);
      setDiscard(newDiscard);
      const updates = {
        plane: newActivePlane,
        planarDeck: newPlanarDeck
      };
      updateSession(session.code, updates);
    }
  }

  function handleResetGame() {
    if (window.confirm('This will reshuffle the planar deck and reset the die count.\nAre you sure you want to reset the game?')) {
      const resetDeck = shuffleDeck(fullPlanarDeck);
      const newPlane = resetDeck.pop();
      setActivePlane(newPlane);
      setPlanarDeck(resetDeck);
      setRollCost(0);
      setRollResult(dieOptions[0]);
      setDiscard([]);

      const updates = {
        rollCost: 0,
        rollResult: 'Blank',
        plane: newPlane,
        planarDeck: resetDeck
      };
      updateSession(session.code, updates);
    }
  }

  // const chatSocket = new WebSocket('ws://localhost:8000/session/');

  // chatSocket.onmessage = function(e) {
  //   const data = JSON.parse(e.data);
  //   const message = data['message'];
  //   console.log('message' + message);
  // }

  // chatSocket.onclose = function(e) {
  //   console.log('Chat socket closed');
  // }

  // function sendMessage(message) {
  //   console.log('sending message');
  //   chatSocket.send(JSON.stringify({
  //     'message': message
  //   }));
  // }

  const { inputSessionCode } = useParams();
  const [activePlane, setActivePlane] = useState(null);
  const [fullPlanarDeck, setFullPlanarDeck] = useState([]);
  const [planarDeck, setPlanarDeck] = useState([]);
  const [discard, setDiscard] = useState([]);
  const [rollResult, setRollResult] = useState(dieOptions[0]);
  const [rollCost, setRollCost] = useState(0);
  const [session, setSession] = useState(null);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    function setStateInfo(session) {
      setSession(session);
      setActivePlane(session.plane);
      setRollResult(getDieResultFromName(session.rollResult));
      setRollCost(session.rollCost);
      setPlanarDeck(session.planarDeck);
  
      if (fullPlanarDeck.length === 0) {
        setFullPlanarDeck(session.planarDeck.slice(0));
      }
    }

    getSession(inputSessionCode, planeImages).then(session => {
      setStateInfo(session);
    });
    setTimeout(() => {
      setTimer(timer + 1);
    }, '2000');
  }, [timer]);

  return (
    <div className='container'>
      <div className='controls'>
        <Controls currentResult={rollResult} cost={rollCost} handleRollFunction={handleRoll} 
        handleResetFunction={handleReset} handleResetGameFunction={handleResetGame} handlePrevFunction={handlePrev} handleNextFunction={handlePlaneClick}/>
      </div>
      <div className='display'>
        <PlaneDisplay activePlane={activePlane}/>
      </div>
    </div>
  );
}
