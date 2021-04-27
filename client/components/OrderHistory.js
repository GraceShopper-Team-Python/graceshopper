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
    console.log(orders)
    return (
      <div className='offset'>
        <h3>Order History:</h3>
        { Object.keys(orders).length ?
        <div>
          { Object.keys(orders).map((order) => {
            return (
              <div key={order}>
                <h4>Order: {order}</h4>
                <h4>Order Date: {orders[order].orderDate}</h4>
                {orders[order].products.map((product) => (
                  <div key={product.name}>
                    <h4>Item: {product.name}</h4>
                    <h4>Quantity: {product.quantity}</h4>
                  </div>
                ))}
                <h4>
                  Order Total:
                  ${orders[order].products
                    .reduce(
                      (accum, product) =>
                        accum +
                        Number(
                          (product.price *
                            product.quantity) /
                            100
                        ),
                      0
                    )
                    .toFixed(2)}
                </h4>
              </div>
            );
          })}
        </div>
        :
        <div>
        <h4>No previous orders, enjoy a snake pun free of charge!</h4>
        <div>{snakeJokes}</div>
        </div>
        }

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
