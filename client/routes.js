import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/home";
import SingleProduct from "./components/SingleProduct";
import { me } from "./store";
import AllProducts from "./components/AllProducts";
import { fetchCart } from "./store/cart";
import Confirmation from "./components/Confirmation";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData();
    await this.props.fetchCart(this.props.auth.id);
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {!isLoggedIn && (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/confirmation" component={Confirmation} />
          <Route path="/checkout" component={Checkout} />
          <Route path='/orders' component={OrderHistory} />
          <Route exact path="/products" component={AllProducts} />
          <Route path="/products/:productId" component={SingleProduct} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
    fetchCart: (userId) => dispatch(fetchCart(userId)),
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
