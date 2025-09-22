import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getData } from "@/redux/api/features/checkout/checkoutSlice";
import { setPaymentData } from "@/redux/api/features/payment/paymentSlice";
import { selectCurrentUser } from "@/redux/api/features/auth/authSlice";

interface IUserData {
  name: string;
  email: string;
  address: string;
  phone: string;
}

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
    const user = useSelector(selectCurrentUser);
  const { cart = [], subtotal = 0, shipping = 0, total = 0 } = location.state || {};

  const [userData, setUserData] = useState<IUserData>({
    name: "",
    email: user?.email as string,
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    dispatch(setPaymentData({ user: userData, price:total }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    if (!userData.name || !userData.email || !userData.address || !userData.phone) {
      alert("Please fill all fields");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }
    dispatch(
      getData({
        user: userData,
        cart,
        subtotal,
        shipping,
        total,
        paymentMethod,
      })
    );
    if (paymentMethod === "cashOnDelivery") {
      navigate("/success", { state: { userData, cart, subtotal, shipping, total } });
    } else if (paymentMethod === "stripe") {
      navigate("/payment", { state: { userData, cart, subtotal, shipping, total } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Your Information</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={user?.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="123 Main Street"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={userData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 234 567 890"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={userData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <label className="block mb-2 text-gray-700 font-medium">Select a method</label>
            <select
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400"
              value={paymentMethod}
              onChange={handlePaymentChange}
              required
            >
              <option value="">-- Choose Payment Method --</option>
              <option value="cashOnDelivery">Cash On Delivery</option>
              <option value="stripe">Stripe Payment</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className="mt-8 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            Place Order
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
