import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './Homepage';
import Templates from './Templates';

function Appi() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
}

export default Appi;
