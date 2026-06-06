
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
    email: user?.email || "",
    address: "",
    phone: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedData = { ...userData, [e.target.name]: e.target.value };
    setUserData(updatedData);
    dispatch(setPaymentData({ user: updatedData, price: total }));
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 font-poppins">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        <div className="bg-white rounded-lg shadow p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-[#004E64] mb-6">Your Information</h2>
          <form className="space-y-4">
            {["name", "email", "address", "phone"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700 font-medium mb-1 capitalize">{field}</label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={`Enter your ${field}`}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#004E64] focus:border-transparent transition"
                  value={(userData as any)[field]}
                  onChange={handleInputChange}
                  required
                />
              </div>
            ))}
          </form>
        </div>

        
        <div className="bg-white rounded-lg shadow p-8 border border-gray-200 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-[#004E64] mb-4">Payment Method</h2>
            <select
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#004E64] focus:border-transparent transition mb-6"
              value={paymentMethod}
              onChange={handlePaymentChange}
              required
            >
              <option value="">-- Choose Payment Method --</option>
              <option value="cashOnDelivery">Cash On Delivery</option>
              <option value="stripe">Stripe Payment</option>
            </select>

            
            <div className="p-4 rounded-md border border-gray-200 mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-2">Order Summary</h3>
              <div className="flex justify-between text-gray-700 mb-1">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-1">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 mt-2 border-t pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-[#FF6B35] hover:bg-[#e55b2b] text-white font-semibold py-3 rounded-md transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
