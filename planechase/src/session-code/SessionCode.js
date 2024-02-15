import React from 'react'
import './SessionCode.css'

export default function SessionCode({sessionCode}) {
  return (
    <div className='session'>
      <p>Shareable Link: https://planechase-2024.vercel.app/{sessionCode}</p>
    </div>
  );
}