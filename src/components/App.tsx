/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import './App.css';

import Container from './Container';

function App() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column' }} className="App">
      <h1>Yieldify Bouncey</h1>
      <Container />
      <p>Click the rectangle to see your balls bounce</p>
    </main>
  );
}

export default App;
