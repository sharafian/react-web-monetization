import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useMonetizationState, useMonetizationCounter } from 'react-web-monetization';

const ObjectTable = ({ obj }) => <table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(obj).map(key => <tr>
      <td>{key}</td>
      <td>{String(obj[key])}</td>
    </tr>)}
  </tbody>
</table>

const App = () => {
  const monetizationDetails = useMonetizationCounter()
  const monetizationState = useMonetizationState()

  return <div>
    <h1>React Web Monetization</h1>

    <h2>Web Monetization State</h2>
    <ObjectTable obj={monetizationState} />

    <h2>Web Monetization Counter</h2>
    <ObjectTable obj={monetizationDetails} />
  </div>
}

export default App;
