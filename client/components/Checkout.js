import React from "react";
import { snakePuns } from "../miscellany/jokes";
import { checkoutGifs } from "../miscellany/gifs";

const snakeJokes = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const snakeJokes1 = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const snakeJokes2 = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const checkoutGif =
  checkoutGifs[Math.floor(Math.random() * checkoutGifs.length)];

export default function Checkout() {
  return (
    <div className="confirmation offset">
      <div>
        <h2>Order Submitted</h2>
        <h4>{snakeJokes}</h4>
        <h4>{snakeJokes1}</h4>
        <h4>{snakeJokes2}</h4>
        <img className="gif" src={checkoutGif} />
      </div>
    </div>
  );
}
