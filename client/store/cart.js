import axios from "axios";

const initialState = [];

// action types
const SET_CART = "SET_CART";

//action creators
export const setCart = (cartObj) => {
  return {
    type: SET_CART,
    cartObj,
  };
};

// thunk creator
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        // /api/cart/${userId} should send array of product objects
        const { data: cart } = await axios.get(`/api/cart/${userId}`);
        if (cart) {
          dispatch(setCart(cart));
        }
      }
    } catch (err) {
      throw err;
    }
  };
};

//reducer
export default function cartsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cartObj;
    default:
      return state;
  }
}
