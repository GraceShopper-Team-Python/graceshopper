import axios from 'axios';

// action types
const SET_PRODUCT = 'SET_PRODUCT';

//action creators
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

// thunk creator
export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(setProduct(product));
    } catch (err) {
      throw err;
    }
  };
};

const initialState = {};

//reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
