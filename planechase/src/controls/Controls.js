import React from 'react'
import Whitespace from '../img/symbols/WHITESPACE.png'
import './Controls.css'

export default function Controls({currentResult, cost, handleRollFunction, handleResetFunction, handleResetGameFunction, handlePrevFunction, handleNextFunction}) {
  return (
    <div className='controls'>
      <div className='buttons'>
        <button className='button roll' onClick={handleRollFunction}>Roll</button>
        <button className='button reset' onClick={handleResetFunction}>Reset</button>
      </div>
      <div className='buttons'>
        <button className='button prev' onClick={handlePrevFunction}>Prev Plane</button>
        <button className='button next' onClick={handleNextFunction}>Next Plane</button>
      </div>
      <div className='display'>
        <img key={Date.now()}
            src={currentResult.image}
            className='result-img'
            alt={Whitespace}
        />
        <h4>Result: {currentResult.name}</h4>
        <h4>Your next roll costs {cost} mana</h4>
        <button className='button reset-game' onClick={handleResetGameFunction}>Reset Game</button>
      </div>
    </div>
  );
}