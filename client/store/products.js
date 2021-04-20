import axios from 'axios';

const initialState = [];

// action types
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creators
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// thunk creator
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get('/api/products');
      dispatch(setProducts(products));
    } catch (err) {
      throw err;
    }
  };
};

//reducer
export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
