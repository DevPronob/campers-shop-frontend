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
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center py-16 px-4 font-poppins">
      <div className="max-w-3xl w-full">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-10">
          <h1 className="text-3xl font-bold text-[#004E64] text-center mb-4">
            Payment
          </h1>
          <p className="text-center text-gray-800 mb-6 text-lg">
            Total Amount: <span className="font-semibold text-[#FF6B35]">${totalAmount.toFixed(2)}</span>
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
