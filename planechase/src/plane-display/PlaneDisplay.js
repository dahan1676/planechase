import React from 'react';
import whitespace from '../img/symbols/WHITESPACE.png';
import './PlaneDisplay.css';

export default function PlaneDisplay({activePlane}) {
    const planeUrl = activePlane ? activePlane.url : null;
    const planeName = activePlane ? activePlane.name : null;
    return (
        <div className='plane'>
            <img key={Date.now()}
                src={planeUrl}
                className='plane-img'
                alt={whitespace}
            />
            <h1>{planeName}</h1>
        </div>
    ); 
}