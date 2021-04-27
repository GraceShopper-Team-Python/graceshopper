import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../store/cart";

class Confirmation extends React.Component {
  render() {
    const products = this.props.cart;
    return (
      <div className="checkout">
        <h2>Your Order:</h2>
        <div>
          {Object.keys(products).map((product) => (
            <div className="flex checkout-item" key={product}>
              <h4>{products[product].name}</h4>
              <p>Quantity: {products[product].quantity}</p>
              <p>Price: ${Number(products[product].price / 100).toFixed(2)}</p>
              <p>
                Item Total: $
                {Number(
                  (products[product].price * products[product].quantity) / 100
                ).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="place-order">
            <h3>
              Order Total: $
              {Object.keys(products)
                .reduce(
                  (accum, product) =>
                    accum +
                    Number(
                      (products[product].price * products[product].quantity) /
                        100
                    ),
                  0
                )
                .toFixed(2)}
            </h3>
            <Link
              className="btn"
              onClick={() => this.props.clearCart()}
              to={"/checkout"}
            >
              Place Order
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => ({
  clearCart: () => dispatch(clearCart()),
});

export default connect(mapState, mapDispatch)(Confirmation);
