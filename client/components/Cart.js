import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { subtractFromCart, deleteFromCart, addToCart } from "../store/cart";

class Cart extends React.Component {
  render() {
    const products = this.props.cart;
    return (
      <div className="cart">
        {Object.keys(products).length ? (
          <div>
            <div>
              <h2>Shopping Cart: </h2>
              {Object.keys(products).map((product) => (
                <div key={product} className="cart-item flex">
                  <div className="image">
                    <img src={products[product].imageUrl} />
                  </div>
                  <div className="info">
                    <div className="flex">
                      <h4>{products[product].name}</h4>
                      <a
                        className="qty-btn"
                        onClick={() => this.props.addToCart(product)}
                      >
                        +
                      </a>
                      <a
                        className="qty-btn"
                        onClick={() => this.props.subtractFromCart(product)}
                      >
                        -
                      </a>
                      <a
                        className="btn"
                        onClick={() => this.props.deleteFromCart(product)}
                      >
                        Remove Item From Cart
                      </a>
                    </div>
                    <div className="flex">
                      <p>Quantity: {products[product].quantity}</p>
                      <p>
                        Price: $
                        {Number(products[product].price / 100).toFixed(2)}
                      </p>
                      <p>
                        Item Total: $
                        {Number(
                          (products[product].price *
                            products[product].quantity) /
                            100
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link className="btn" to={"/confirmation"}>
              Checkout
            </Link>
          </div>
        ) : (
          <div className="empty">
            <h2>Your Cart Is Empty</h2>
            <Link className="btn" to={"/products"}>
              Back To All Products
            </Link>
          </div>
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
  subtractFromCart: (productId) => dispatch(subtractFromCart(productId)),
  deleteFromCart: (productId) => dispatch(deleteFromCart(productId)),
});

export default connect(mapState, mapDispatch)(Cart);
