// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
// Import your Login and Register components here
// import Login from './components/Login';
// import Register from './components/Register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Uncomment these lines once you have Login and Register components */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
