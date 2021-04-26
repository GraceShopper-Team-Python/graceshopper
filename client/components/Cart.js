import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCart, subtractFromCart } from '../store/cart';
import { deleteFromCart, addToCart } from '../store/cart';
import { me } from '../store/auth';

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.fetchCart();
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
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
  fetchCart: () => dispatch(fetchCart()),
  addToCart: (productId) => dispatch(addToCart(productId)),
  subtractFromCart: (productId) =>
    dispatch(subtractFromCart(productId)),
  deleteFromCart: (productId) =>
    dispatch(deleteFromCart(productId)),
  updateItem: (productId, direction) =>
    dispatch(updateItem(productId, direction)),
});

export default connect(mapState, mapDispatch)(Cart);
