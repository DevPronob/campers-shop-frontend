
import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useCreatePaymentWithUserMutation } from "@/redux/api/features/checkout/checkoutApi";
import { useCreateOrderMutation } from "@/redux/api/features/order/order.api";
import { useSelector, useDispatch } from "react-redux";
import { selectPaymentUser } from "@/redux/api/features/payment/paymentSlice";
import { selectCurrentUser } from "@/redux/api/features/auth/authSlice";
import cartApi from "@/redux/api/features/cart/cartApi";
import { toast } from "sonner";

type CartItem = {
  productId: { _id: string };
  price: number;
  quantity: number;
};

type Cart = {
  data: {
    _id: string;
    items: CartItem[];
  };
};

type CheckoutFormProps = {
  price: number;
  cart: Cart;
};

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, cart }) => {
  const [payment] = useCreatePaymentWithUserMutation();
  const [createOrder] = useCreateOrderMutation();

  const user = useSelector(selectPaymentUser);
  const owner = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    if (!price || price <= 0) return;

    const createPaymentIntent = async () => {
      try {
        const res = await fetch(
          "https://campers-ecom-backend.vercel.app/api/payment/createPayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ price: Math.round(price * 100) }),
          }
        );
        const data = await res.json();
        setClientSecret(data?.data?.clientSecret);
      } catch (err) {
        console.log(err);
        setCardError("Unable to process payment.");
      }
    };

    createPaymentIntent();
  }, [price]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCardError("");
    if (!stripe || !elements || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError("Card element not found");
      return;
    }

    setProcessing(true);

    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user?.name || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
        },
      });

      if (result.error) {
        setCardError(result.error.message || "Payment failed");
        setProcessing(false);
        return;
      }

      if (result.paymentIntent?.status === "succeeded") {
        setTransactionId(result.paymentIntent.id);
        const toastId = toast.loading("Processing payment...");
        const paymentRes = await payment({
          name: user?.name ?? "",
          email: user?.email ?? "",
          address: user?.address ?? "",
          phone: user?.phone ?? "",
          amount: price,
          quantity: cart?.data?.items?.length || 0,
          products: cart?.data?.items?.map((i) => i.productId._id),
          stripePaymentId: result.paymentIntent.id,
        }).unwrap();

        console.log(cart?.data?._id,(owner as any)?._id,price ,"paymentRes");
       const res2 = await createOrder({
          cartId: cart?.data?._id,
          paymentId: paymentRes?.data?._id,
          userId: (owner as any)?._id,
          status: "paid",
          totalPrice: price,
        });
        console.log(res2, "orderRes");
        dispatch(cartApi.util.invalidateTags(["cart"]));
        card.clear();

        toast.success("Payment successful!", { id: toastId });

        navigate("/success", {
          state: {
            transactionId: result.paymentIntent.id,
            total: price,
          },
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Payment or order failed!");
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Stripe Payment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-300 rounded-md p-4">
          <CardElement />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            processing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#012b36] hover:bg-blue-600"
          }`}
        >
          {processing ? "Processing..." : `Pay ৳${price.toFixed(2)}`}
        </button>
      </form>

      {cardError && (
        <p className="text-red-600 mt-4 text-center">{cardError}</p>
      )}

      {transactionId && (
        <p className="text-green-600 mt-4 text-center">
          Payment Successful: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;