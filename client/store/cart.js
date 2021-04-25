import axios from 'axios';

const initialState = {};

// action types
const SET_CART = 'SET_CART';
const UPDATE_CART = 'UPDATE_CART';
const DELETE_ITEM = 'DELETE_ITEM';

//action creators
export const setCart = (cartObj) => {
  return {
    type: SET_CART,
    cartObj,
  };
};

export const updateCart = (cartObj) => {
  return {
    type: UPDATE_CART,
    cartObj,
  };
};

export const deleteItem = (cart) => {
  return {
    type: DELETE_ITEM,
    cart,
  };
};

// thunk creator
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        // /api/cart/${userId} should send array of product objects
        const { data: cart } = await axios.get(`/api/cart/${userId}`);
        console.log(cart);
        dispatch(setCart(cart));
      }
    } catch (err) {
      throw err;
    }
  };
};

export const addToCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.post(
        `/api/cart/${userId}/${productId}`
      );
    } catch (err) {
      throw err;
    }
  };
};

export const deleteFromCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/cart/${userId}/${productId}`);
      dispatch(deleteItem(productId));
    } catch (err) {
      throw err;
    }
  };
};

export const updateItem = (userId, productId, direction) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(
        `/api/cart/${userId}/${productId}/${direction}`
      );
      dispatch(updateCart(updated));
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
    case UPDATE_CART:
      return [...state, action.cartObj];
    case DELETE_ITEM:
      return {
        ...state,
        products: state.products.filter((product) => {
          return product.id !== action.cart;
        }),
      };
    default:
      return state;
  }
}
