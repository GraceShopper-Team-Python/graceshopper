import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../store/cart';
import { fetchProduct } from '../store/singleProduct';

class SingleProduct extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.productId;
    this.props.fetchProduct(id);
  }

  // deleteToCart() {}

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
});

export default connect(mapState, mapDispatch)(SingleProduct);
