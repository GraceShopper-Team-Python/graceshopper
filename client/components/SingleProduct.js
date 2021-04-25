import React from "react";
import { connect } from "react-redux";

import { me } from "../store";
import { addToCart, fetchCart } from "../store/cart";
import { fetchProduct } from "../store/singleProduct";

class SingleProduct extends React.Component {
  async componentDidMount() {
    const id = this.props.match.params.productId;
    this.props.fetchProduct(id);
    await this.props.loadInitialData();
    await this.props.fetchCart(this.props.auth.id);
  }
  render() {
    const { selectedProduct } = this.props;
    return (
      <div>
        <img src={selectedProduct.imageUrl} />
        <h2>{selectedProduct.name}</h2>
        <p>{selectedProduct.description}</p>
        
        <button
          onClick={() =>
            this.props.addToCart(this.props.auth.id, selectedProduct.id)
          }
        >
          Add To Cart
        </button>
      </div>
    );
  }
}

const mapState = (state) => ({
  selectedProduct: state.selectedProduct,
  cart: state.cart,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),

  addToCart: (userId, productId) => dispatch(addToCart(userId, productId)),
  loadInitialData: () => dispatch(me()),
  fetchCart: (userId) => dispatch(fetchCart(userId)),
});

export default connect(mapState, mapDispatch)(SingleProduct);
