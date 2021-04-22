import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default function Checkout() {
  return (
    <div>
      <h3> Checked Out!</h3>
      <div>
       <Link to={'/products'}>Continue Shopping</Link>
      </div>
    </div>
  )
};
