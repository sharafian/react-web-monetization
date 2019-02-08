import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useWebMonetizationCounter } from 'react-web-monetization';

const App = () => {
  const monetizationDetails = useWebMonetizationCounter()

  return <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        {JSON.stringify(monetizationDetails)}
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  </div>
}

export default App;
