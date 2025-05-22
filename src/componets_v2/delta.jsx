import React, { useState } from 'react';
const DeltaComponent = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="delta-container">
      <h1>Delta Component</h1>
      <div className="counter-section">
        <p>Current Count: {count}</p>
        <button onClick={() => setCount(count