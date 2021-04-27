import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productsReducer from "./products";
import singleProductReducer from "./singleProduct";
import cartReducer from "./cart";
import auth from "./auth";
import ordersReducer from "./orders";

const reducer = combineReducers({
  auth,
  productsReducer,
  selectedProduct: singleProductReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
