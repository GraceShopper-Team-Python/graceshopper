import axios from "axios";

const TOKEN = "token";

const initialState = {};

// action types
const SET_CART = "SET_CART";
const DELETE_ITEM = "DELETE_ITEM";
const ADDED_ITEM = "ADDED_ITEM";

//action creators
export const setCart = (cartObj) => {
  return {
    type: SET_CART,
    cartObj,
  };
};

export const deleteItem = (cart) => {
  return {
    type: DELETE_ITEM,
    cart,
  };
};

export const addedItem = (item) => {
  return {
    type: ADDED_ITEM,
    item,
  };
};

// thunk creator
export const fetchCart = (userId) => {
  return async (dispatch) => {
    try {
      if (userId) {
        const token = window.localStorage.getItem(TOKEN);
        const { data: cart } = await axios.get(`/api/cart/${userId}`, {
          headers: { authorization: token },
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
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const headers = {
          headers: {
            authorization: token,
          },
        };
        const { data: product } = await axios.post(
          `/api/cart/${userId}/${productId}`,
          null,
          headers
        );
        console.log(product);
        dispatch(addedItem(product));
      }
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
        headers: { authorization: token },
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
    case ADDED_ITEM: {
      let newCart = Object.assign({}, state);
      if (!state.products.some((product) => product.id === action.item.id)) {
        newCart.products.push(action.item);
      } else {
        newCart.products = newCart.products.map((product) => {
          if (product.id === action.item.id) {
            product.quantity++;
          }
        });
      }
      return newCart;
    }
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
