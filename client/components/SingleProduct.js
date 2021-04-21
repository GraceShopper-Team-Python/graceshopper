import React from 'react'
import {connect} from 'react-redux'
import { fetchProduct } from '../store/singleProduct'
import Cart from './Cart'

class SingleProduct extends React.Component {

componentDidMount() {
  const id = this.props.match.params.productId;
  this.props.fetchProduct(id);
  console.log('mounted!')
  }
  render(){
    return (
      <div>
        Look! its {this.props.selectedProduct.name}
        <Cart />
      </div>
    )
  }
}

const mapState = (state) => ({
  selectedProduct: state.selectedProduct,
})

const mapDispatch = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
})

export default connect(mapState, mapDispatch)(SingleProduct)
