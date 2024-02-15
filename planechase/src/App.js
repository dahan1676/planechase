import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import ExistingSession from './init/ExistingSession';
import InitSession from './init/InitSession';

export default function App() {
  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<InitSession />} />
        <Route path='/:inputSessionCode' element={<ExistingSession />} />
      </Routes>
    </Router>
  );
}