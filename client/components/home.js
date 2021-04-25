import React from 'react';
import { connect } from 'react-redux';
import { snakePuns } from '../miscellany/jokes';
import { snakeImages } from '../miscellany/SnakeImages';

const snakeJokes = snakePuns[Math.floor(Math.random() * snakePuns.length)];
const snakeSrc = snakeImages[Math.floor(Math.random() * snakeImages.length)];
const snakeSrc1 = snakeImages[Math.floor(Math.random() * snakeImages.length)];

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  return (
    <div>
      <h5>{username ? <h3>Welcome, {username}</h3> : <h3>Welcome</h3>}</h5>
      <h5>{snakeJokes}</h5>
      <img src={snakeSrc} />
      <img src={snakeSrc1} />
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
