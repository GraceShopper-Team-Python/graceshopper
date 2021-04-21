import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { fetchProduct } from '../store/singleProduct'

class Cart extends React.Component {
  async componentDidMount() {
    this.props.fetchCart(1);
  }
  render() {

    return (
    <div>
      <Link to={'/checkout'} >Go to checkout?</Link>
    </div>
    );
  }
}

// const mapState = (state) => ({
//   cart: state.cart,
// });

const mapState = (state) => {
  console.log(state)
  return {
    cart: state.cart,
    products: state.productsReducer,
  };
};


export default connect(mapState, null)(Cart);
