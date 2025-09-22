import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useGetCartQuery } from '@/redux/api/features/cart/cartApi';
import CheckoutForm from './CheckoutForm';
import { cartTotalAmount, getAmounts } from '@/utils/cartTotal';

const stripePromise = loadStripe(
  'pk_test_51HVdTWBLa4QtAMbzJF8fESJt8K44YI2RpHvgDeomDGPXujOgO65ZODQda0qJjd7KiMCyuKPq1NpAfrpXYhaw5VTG00f5DSaCaY'
);

function Payment() {
  const { data } = useGetCartQuery(undefined);
  const amounts = getAmounts(data);
  const totalAmount = cartTotalAmount(amounts);

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Checkout</h1>
          <p className="text-center text-gray-600 mb-8">
            Total Amount: <span className="font-semibold">${totalAmount.toFixed(2)}</span>
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm cart={data || []} price={totalAmount} />
          </Elements>
        </div>
      </div>
    </div>
  );
}

export default Payment;
