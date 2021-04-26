import React from "react";
import { snakePuns } from "../miscellany/jokes";

const snakeJokes = snakePuns[Math.floor(Math.random() * snakePuns.length)];

export default function OrderHistory() {
  return (
    <div>
      <h4>Orders:</h4>
      
      <h4>{snakeJokes}</h4>
    </div>
  );
}
