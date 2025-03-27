// src/App.js
import React from 'react';
import Piano from './Piano';
import './Piano.css';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: "center"}}> Piano Lessons </h1>
      <Piano />
    </div>
  );
}

export default App;