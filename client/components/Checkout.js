import React from 'react';
import { snakePuns } from '../miscellany/jokes';

const snakeJokes = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const snakeJokes1 = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const snakeJokes2 = snakePuns[Math.floor(Math.random() * snakePuns.length)];

export default function Checkout() {
  return (
    <div>
      <h4>Checked Out 👀</h4>
      <h4>{snakeJokes}</h4>
      <h4>{snakeJokes1}</h4>
      <h4>{snakeJokes2}</h4>
    </div>
  );
}
