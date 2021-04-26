import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/products";
import React, { Component } from "react";

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div className="flex all-products">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <div className="image">
                <img src={product.imageUrl} />
              </div>
              <div className="info">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
                <p>${product.price.toFixed(2)}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.productsReducer,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
