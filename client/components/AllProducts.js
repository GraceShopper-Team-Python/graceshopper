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
      <div className="all-products offset">
        <div className="flex">
          {products.map((product) => {
            return (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="product"
              >
                <div className="image">
                  <img src={product.imageUrl} />
                </div>
                <div className="info">
                  <p>{product.name}</p>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </Link>
            );
          })}
        </div>
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
