import axios from "axios";

const initialState = {};

const TOKEN = "token";

// action types
const SET_CART = "SET_CART";
const UPDATE_CART = "UPDATE_CART";
const DELETE_ITEM = "DELETE_ITEM";

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
        const token = window.localStorage.getItem(TOKEN);
        const { data: cart } = await axios.get(`/api/cart/${userId}`, {
          headers: { Authorization: token },
        });
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
      const token = window.localStorage.getItem(TOKEN);
      const { data: product } = await axios.post(
        `/api/cart/${userId}/${productId}`,
        {
          headers: { Authorization: token },
        }
      );
    } catch (err) {
      throw err;
    }
  };
};

export const deleteFromCart = (userId, productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      await axios.delete(`/api/cart/${userId}/${productId}`, {
        headers: { Authorization: token },
      });
      dispatch(deleteItem(productId));
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
