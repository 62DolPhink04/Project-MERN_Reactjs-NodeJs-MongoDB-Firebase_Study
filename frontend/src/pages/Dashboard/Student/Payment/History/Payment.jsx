import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import CheckOutPayment from "../../CheckOutPayment";
import "./Payment.css";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);

const Payment = () => {
  const location = useLocation();
  // console.log(location);
  const price = location?.state?.price;
  const cartItm = location?.state?.itemId;

  if (!price) {
    return <Navigate to="/dashboard/my-selected" />;
  }

  return (
    <div className="my-40 stripe-custom-class">
      <Elements stripe={stripePromise}>
        <CheckOutPayment price={price} cartItm={cartItm} />
      </Elements>
    </div>
  );
};

export default Payment;
