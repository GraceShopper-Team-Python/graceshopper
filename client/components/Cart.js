import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { subtractFromCart, deleteFromCart, addToCart } from '../store/cart';


class Cart extends React.Component {


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
                      this.props.addToCart(product)
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      this.props.subtractFromCart(product)
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
                      this.props.deleteFromCart(product)
                    }
                  >
                    Remove Item From Cart
                  </button>
                </div>
              ))}
            </div>
            <Link to={'/confirmation'}>Finalize Order?</Link>
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
  };
};

const mapDispatch = (dispatch) => ({
  addToCart: (productId) => dispatch(addToCart(productId)),
  subtractFromCart: (productId) =>
    dispatch(subtractFromCart(productId)),
  deleteFromCart: (productId) =>
    dispatch(deleteFromCart(productId)),
});

export default connect(mapState, mapDispatch)(Cart);
