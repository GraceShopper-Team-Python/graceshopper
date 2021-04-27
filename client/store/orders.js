import axios from "axios";

const initialState = [];

// action types
const SET_ORDERS = "SET_ORDERS";
const TOKEN = 'token'
//action creators
export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

// thunk creator
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data: orders } = await axios.get(`/api/users/orders`, {
          headers: { authorization: token },
        });
        dispatch(setOrders(orders));
      }
    } catch (err) {
      throw err;
    }
  };
};

//reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
