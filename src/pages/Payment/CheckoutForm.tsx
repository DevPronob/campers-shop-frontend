import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { TCartItem } from "@/types/productTypes";
import { useCreatePaymentWithUserMutation } from "@/redux/api/features/checkout/checkoutApi";
import { useSelector } from "react-redux";
import { selectPaymentUser } from "@/redux/api/features/payment/paymentSlice";
import { toast } from "sonner";
import cartApi from "@/redux/api/features/cart/cartApi";
// import { selectCurrentUser } from "@/redux/api/features/auth/authSlice";

interface CheckoutFormProps {
  price: number;
  cart: TCartItem[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ price, cart }) => {
  const [payment] = useCreatePaymentWithUserMutation();
  const user = useSelector(selectPaymentUser);
  // const loginUser = useSelector(selectCurrentUser)
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  console.log(user,"user")

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const res = await fetch("https://campers-ecom-backend.vercel.app/api/payment/createPayment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ price }),
        });
        if (!res.ok) throw new Error("Failed to create payment intent");
        const data = await res.json();
        setClientSecret(data?.data?.clientSecret);
        cartApi.util.invalidateTags(['cart']);

      } catch {
        setCardError("Unable to process payment at this time.");
      }
    };
    if (price > 0) createPaymentIntent();
  }, [price]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setCardError("");
    const card = elements.getElement(CardElement);
    if (!card) {
      setCardError("Card element not found");
      setProcessing(false);
      return;
    }
    if (!clientSecret) {
      setCardError("Payment is not ready. Please try again later.");
      setProcessing(false);
      return;
    }
    const result = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } });
    if (result.error) {
      setCardError(result.error.message || "Payment failed");
      setProcessing(false);
      return;
    }
    if (result.paymentIntent?.status === "succeeded") {
      setTransactionId(result.paymentIntent.id);
      const toastId = toast.loading("Processing payment...");
      try {
        await payment({
          name: user?.name || "",
          email: user?.email || "",
          address: user?.address || "",
          phone: user?.phone || "",
          stripePaymentId: result.paymentIntent.id,
        }).unwrap();
        toast.success("Payment successful!", { id: toastId });
        await fetch("https://campers-ecom-backend.vercel.app/api/payment/record", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            transactionId: result.paymentIntent.id,
            amount: price,
            cart,
          }),
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to process payment!", { id: toastId });
        console.log(err)
      }
      navigate("/success", { state: { transactionId: result.paymentIntent.id, cart, total: price } });
    }
    setProcessing(false);
  };


  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Stripe Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-300 rounded-md p-4">
          <CardElement
            options={{
              style: {
                base: { fontSize: "16px", color: "#424770", "::placeholder": { color: "#aab7c4" } },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || processing}
          className={`w-full py-3 rounded-md text-white font-semibold transition ${
            processing ? "bg-gray-400 cursor-not-allowed" : "bg-[#012b36] hover:bg-blue-600"
          }`}
        >
          {processing ? "Processing..." : `Pay $${price.toFixed(2)}`}
        </button>
      </form>
      {cardError && <p className="text-red-600 mt-4 text-center">{cardError}</p>}
      {transactionId && <p className="text-green-500 mt-4 text-center">Payment Successful: {transactionId}</p>}
    </div>
  );
};

export default CheckoutForm;
