import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";

const CheckOutPayment = ({ price, cartItm }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { currentUser, isLoading } = useUser();
  const [clientSecret, SetClientSecret] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  if (price < 0 || !price) {
    console.error("Price không hợp lệ:", price);
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setCart(classesId);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: price })
      .then((res) => {
        // console.log("Payment Intent Response:", res.data);
        SetClientSecret(res.data.clientSecret);
        // console.log("🚀 Client Secret từ backend:", res.data.clientSecret);
        // console.log("🚀 Client Secret từ backend:", clientSecret);
      })
      .catch((err) => console.log("Error:", err));
  }, [price]);

  const handleSubmit = async (event) => {
    setMessage("");
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe hoặc Elements chưa sẵn sàng!");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("Card Element không tồn tại!");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setMessage(error.message);
      return;
    }

    console.log("Payment Method:", paymentMethod);

    if (!clientSecret) {
      console.error("Client Secret không tồn tại!");
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: currentUser?.name || "unknown",
            email: currentUser?.email || "Anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Error confirming card payment:", confirmError);
      setMessage(confirmError.message);
      return;
    }

    console.log("Payment Intent:", paymentIntent);

    if (paymentIntent?.status === "succeeded") {
      console.log("Thanh toán thành công:", paymentIntent);
      setSucceeded(true);
      setMessage("Payment successful!");
    } else {
      console.warn("Thanh toán không thành công:", paymentIntent?.status);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Payment Amount: <span className="text-secondary">{price}$</span>
        </h1>
      </div>
      <div className="flex items-center justify-center min-h-[5vh] py-5">
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            }}
          />
          <div className="flex items-center justify-center gap-4">
            <button
              type="submit"
              disabled={isLoading || !stripe || !clientSecret}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300 transition text-sm w-auto"
            >
              Pay
            </button>
          </div>
          <div className="text-center">
            {message && <p className="text-red-500">{message}</p>}
            {succeeded && <p className="text-green-500">Payment successful!</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOutPayment;
