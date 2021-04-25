import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { deleteFromCart } from "../store/cart";
import { me } from "../store/auth";

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.fetchCart(this.props.auth.id);
  }

  render() {
    const products = this.props.cart;
    return (
      <div>
        <div>
          {Object.keys(products).map((product) => (
            <div key={product}>
              <h4>{products[product].name}</h4>
              <h4>${Number(products[product].price / 100).toFixed(2)}</h4>
              <button
                onClick={() =>
                  this.props.deleteFromCart(this.props.auth.id, product)
                }
              >
                Remove Item From Cart
              </button>
            </div>
          ))}
        </div>
        <Link to={"/checkout"}>Go to checkout?</Link>
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
  loadInitialData: () => dispatch(me()),
  fetchCart: (userId) => dispatch(fetchCart(userId)),
  deleteFromCart: (userId, productId) =>
    dispatch(deleteFromCart(userId, productId)),
});

export default connect(mapState, mapDispatch)(Cart);
