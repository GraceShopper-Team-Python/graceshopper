import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.fetchCart(this.props.auth.id);
  }
  render() {
    const products = this.props.cart.products || [];
    return (
      <div>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.imageUrl} />
              <h4>{product.name}</h4>
              <h4>{product.price / 100}</h4>
            </div>
          ))}
        </div>
        <Link to={"/checkout"}>Go to checkout?</Link>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log(state);
  return {
    cart: state.cart,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
  fetchCart: (id) => dispatch(fetchCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
