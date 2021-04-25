import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

class Confirmation extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.fetchCart(this.props.auth.id);
  }

  render() {
    const products = this.props.cart;
    console.log(this.props);
    return (
      <div>
        <div>
          {Object.keys(products).map((product) => (
            <div key={product}>
              <h4>{products[product].name}</h4>
              <h4>${Number(products[product].price / 100).toFixed(2)}</h4>
              <h4>Quantity: {products[product].quantity}</h4>
              <h4>
                Quantity Total: $
                {Number(
                  (products[product].price * products[product].quantity) / 100
                ).toFixed(2)}
              </h4>
            </div>
          ))}
          <h4>SubTotal: ${Object.keys(products).reduce((accum, product) => (
            accum + Number(((products[product].price * products[product].quantity) / 100
                ))
          ), 0).toFixed(2)
        }</h4>
        </div>
        <Link to={"/checkout"}>Go to Checkout.</Link>
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
});

export default connect(mapState, mapDispatch)(Confirmation);
