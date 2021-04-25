import axios from "axios";

const TOKEN = "token";

const initialState = {};

// action types
const SET_CART = "SET_CART";
const DELETE_ITEM = "DELETE_ITEM";
const ADDED_ITEM = "ADDED_ITEM";
const SUBTRACTED_ITEM = "SUBTRACTED_ITEM";

//action creators
export const setCart = (cartObj) => {
  return {
    type: SET_CART,
    cartObj,
  };
};

export const deleteItem = (productId) => {
  return {
    type: DELETE_ITEM,
    productId,
  };
};

export const addedItem = (item) => {
  return {
    type: ADDED_ITEM,
    item,
  };
};

export const subtractedItem = (productId) => {
  return {
    type: SUBTRACTED_ITEM,
    productId,
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
        dispatch(setCart(cart));
      }
    } catch (err) {
      throw err;
    }
  };
};

export const addToCart = (userId, productId) => {
  return async (dispatch, getState) => {
    const cart = getState().cart;
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {
        const headers = {
          headers: {
            authorization: token,
          },
        };
        if (cart[productId]) {
          const { data: product } = await axios.put(
            `/api/cart/${userId}/${productId}`,
            { increment: 1 },
            {
              headers: { authorization: token },
            }
          );
          dispatch(addedItem(product));
        } else {
          const { data: product } = await axios.post(
            `/api/cart/${userId}/${productId}`,
            null,
            headers
          );
          dispatch(addedItem(product));
        }
      } else {
        const { data: product } = await axios.get(`/api/products/${productId}`);
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
      if (token) {
        await axios.delete(`/api/cart/${userId}/${productId}`, {
          headers: { authorization: token },
        });
      }
      dispatch(deleteItem(productId));
    } catch (err) {
      throw err;
    }
  };
};

// remove cart thunk make check quantity
// if quantity is 1 dispatch delete from cart
// else axios put call to update quantity
export const subtractFromCart = (userId, productId) => {
  return async (dispatch, getState) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const cart = getState().cart;
      if (token) {
        if (cart[productId].quantity === 1) {
          dispatch(deleteFromCart(userId, productId));
        } else {
          await axios.put(
            `/api/cart/${userId}/${productId}`,
            { decrement: 1 },
            {
              headers: { authorization: token },
            }
          );
        }
      } else {
        if (cart[productId].quantity === 1) {
          dispatch(deleteFromCart(userId, productId));
        }
      }
      dispatch(subtractedItem(productId));
    } catch (error) {
      throw error;
    }
  };
};

export default function cartsReducer(state = initialState, action) {
  let newCart = { ...state };
  switch (action.type) {
    case SET_CART:
      return action.cartObj;
    case ADDED_ITEM: {
      if (newCart[action.item.id]) {
        newCart[action.item.id].quantity++;
      } else {
        newCart[action.item.id] = {
          quantity: 1,
          price: action.item.price,
          name: action.item.name,
          description: action.item.description,
          imageUrl: action.item.imageUrl,
        };
      }
      return newCart;
    }
    case DELETE_ITEM: {
      delete newCart[action.productId];
      return newCart;
    }
    case SUBTRACTED_ITEM: {
      newCart[action.productId].quantity--;
      return newCart;
    }
    default:
      return state;
  }
}
