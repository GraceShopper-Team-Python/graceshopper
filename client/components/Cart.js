import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart, subtractFromCart } from "../store/cart";
import { deleteFromCart, addToCart } from "../store/cart";
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
        {Object.keys(products).length ? (
          <div>
            <div>
              {Object.keys(products).map((product) => (
                <div key={product}>
                  <h4>{products[product].name}</h4>
                  <h4>${Number(products[product].price / 100).toFixed(2)}</h4>
                  <h4>Quantity: {products[product].quantity}</h4>
                  <button
                    onClick={() =>
                      this.props.addToCart(this.props.auth.id, product)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      this.props.subtractFromCart(this.props.auth.id, product)
                    }
                  >
                    -
                  </button>
                  <h4>
                    Quantity Total: $
                    {Number(
                      (products[product].price * products[product].quantity) /
                        100
                    ).toFixed(2)}
                  </h4>
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
            <Link to={"/confirmation"}>Finalize Order?</Link>
          </div>
        ) : (
          <h2>Your Cart Is Empty</h2>
        )}
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
  addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
  subtractFromCart: (userId, productId) =>
    dispatch(subtractFromCart(userId, productId)),
  deleteFromCart: (userId, productId) =>
    dispatch(deleteFromCart(userId, productId)),
});

export default connect(mapState, mapDispatch)(Cart);
