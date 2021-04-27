import React from "react";
import { snakePuns } from "../miscellany/jokes";
import { fetchOrders } from "../store/orders";
import { connect } from "react-redux";

const snakeJokes = snakePuns[Math.floor(Math.random() * snakePuns.length)];

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    const { orders } = this.props;
    return (
      <div className="orders checkout">
        <h2>Order History:</h2>
        {Object.keys(orders).length ? (
          <div className="checkout-item">
            {Object.keys(orders).map((order) => {
              return (
                <div className="order" key={order}>
                  <h4>Order: {order}</h4>
                  <h4>Order Date: {orders[order].orderDate}</h4>
                  {orders[order].products.map((product) => (
                    <div key={product.name}>
                      <p>Item: {product.name}</p>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  ))}
                  <h4>
                    Order Total: $
                    {orders[order].products
                      .reduce(
                        (accum, product) =>
                          accum +
                          Number((product.price * product.quantity) / 100),
                        0
                      )
                      .toFixed(2)}
                  </h4>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <h4>No previous orders, enjoy a snake pun free of charge!</h4>
            <div>{snakeJokes}</div>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  orders: state.orders,
});

const mapDispatch = (dispatch) => ({
  fetchOrders: () => dispatch(fetchOrders()),
});

export default connect(mapState, mapDispatch)(OrderHistory);
