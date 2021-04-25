import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store/cart";
import { me } from "../store/auth";

export default function Checkout() {
  return (<div>
    <h4>Checked Out 👀</h4>
  </div>);
}
