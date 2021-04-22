import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";


class Cart extends React.Component {
  async componentDidMount() {
    this.props.fetchCart(this.props.auth.id);
  }
  render() {
    const products = this.props.cart.products || []
    return (
    <div>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h4>{product.name}</h4>
            <h4>{product.price / 100}</h4>
          </div>
        ))}
      </div>
      <Link to={'/checkout'} >Go to checkout?</Link>
    </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  fetchCart: (id) => dispatch(fetchCart(id)),
});


export default connect(mapState, mapDispatch)(Cart);
