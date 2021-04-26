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
      <div className="single-product flex">
        <div className="image">
          <img src={selectedProduct.imageUrl} />
        </div>
        <div className="info">
          <h2>{selectedProduct.name}</h2>
          <h3>${(selectedProduct.price / 100).toFixed(2)}</h3>
          <h4>Description: </h4>
          <p>{selectedProduct.description}</p>
          <button
            onClick={() =>
              this.props.addToCart(this.props.auth.id, selectedProduct.id)
            }
          >
            Add To Cart
          </button>
        </div>
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
