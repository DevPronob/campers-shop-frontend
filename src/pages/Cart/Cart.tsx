import { useEffect, useState } from "react";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/redux/api/features/cart/cartApi";
import { TCartItem } from "@/types/productTypes";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<TCartItem[]>([]);
  const { data, isLoading } = useGetCartQuery(undefined);
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  useEffect(() => {
    if (data?.data?.items) {
      setCartItems(data.data.items);
    }
  }, [data]);
  const handleIncrease = async (item: TCartItem) => {
    console.log("Increasing quantity for item:", item._id);
    setCartItems((prev) =>
      prev.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );

    try {
      await updateCart({
        productId: item.productId._id,
        quantity: item.quantity + 1,
      }).unwrap();
    } catch (error) {
      console.log(error)
      console.error("Failed to increase quantity", error);
    }
  };
  const handleDecrease = async (item: TCartItem) => {
    console.log("Decreasing quantity for item:", item);
    if (item.quantity <= 1) {
      return handleDelete(item._id);
    }

    setCartItems((prev) =>
      prev.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
      )
    );

    try {
      await updateCart({
        id: item.productId._id,
        quantity: item.quantity - 1,
      }).unwrap();
    } catch (error) {
      console.error("Failed to decrease quantity", error);
    }
  };
  const handleDelete = async (id: string) => {
    setCartItems((prev) => prev.filter((i) => i._id !== id));

    try {
      await deleteCart({ id }).unwrap();
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const shipping = 8;
  const total = subtotal + shipping;

  if (isLoading) {
    return <p className="text-center py-10">Loading cart...</p>;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-center">Your Cart</h1>

        <div className="mx-auto mt-8 max-w-2xl">
          <div className="bg-white shadow-md">
            <div className="px-4 py-6 sm:px-8 sm:py-10">

              
              {cartItems.length > 0 ? (
                <ul className="-my-8">
                  {cartItems.map((item) => (
                    <li
                      key={item._id}
                      className="flex flex-col space-y-3 py-6 sm:flex-row sm:space-x-5"
                    >
                      <img
                        className="h-24 w-24 rounded-lg object-cover"
                        src={item.productId?.imageUrls?.[0] || '/placeholder.svg'}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                        alt={item.productId?.name || 'Product Image'}
                      />

                      <div className="flex flex-1 justify-between">
                        <div>
                          <p className="font-semibold">
                            {item.productId.name}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-black hover:text-white"
                          >
                            -
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => handleIncrease(item)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-black hover:text-white"
                          >
                            +
                          </button>

                          <p className="font-semibold text-[#21b3f1]">
                            ${item.productId.price}
                          </p>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-gray-500 hover:text-red-600"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center py-6 text-gray-500">
                  Your cart is empty.
                </p>
              )}

              
              <div className="mt-6 border-t border-b py-4">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6 flex justify-between text-lg font-semibold">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>

              
              <button
                disabled={cartItems.length === 0}
                onClick={() =>
                  navigate("/checkout", {
                    state: { cart: cartItems, subtotal, shipping, total },
                  })
                }
                className="mt-6 w-full bg-[#004E64] py-4 text-white font-semibold rounded disabled:opacity-50"
              >
                Checkout
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
