import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { snakePuns } from "../miscellany/jokes";
import { snakeImages } from "../miscellany/SnakeImages";

const snakeJokes = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const snakeSrc = snakeImages[Math.floor(Math.random() * snakeImages.length)];

// const getSnakeImg = () => {
//   let snakeImg;
//   setInterval(() => {
//     snakeImg = snakeImages[Math.floor(Math.random() * snakeImages.length)];
//   }, 5000);
//   return snakeImg;
// };

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;
  // const snakeImage = getSnakeImg();
  return (
    <div className="home">
      {username && <h3 className="welcome">Welcome, {username}</h3>}
      <div className="intro flex">
        <h2>Python Shopper</h2>
        <h4>{snakeJokes}</h4>
        <Link to="/products" className="btn">
          View All Products
        </Link>
      </div>
      <div
        className="images"
        style={{ backgroundImage: `url(${snakeSrc})` }}
      ></div>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
