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
  // Cart state always has data array
  const [cart, setCart] = useState<{ data: TCartItem[] }>({ data: [] });

  // API hooks
  const { data } = useGetCartQuery(undefined);
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  console.log(data,"data")

  // Normalize API response
  useEffect(() => {
    if (data) {
      setCart({ data: Array.isArray(data) ? data : data.data });
    }
  }, [data]);

  // Increase quantity
  const handleIncrease = async (item: TCartItem) => {
    const updatedCart = cart.data.map((i) =>
      i.productId._id === item.productId._id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    );
    setCart({ data: updatedCart });

    try {
     const res = await updateCart({ id: item._id, quantity: item.quantity + 1 }).unwrap();
     console.log(res)
    } catch (error) {
      console.log(error)
    }
  };

  // Decrease quantity
  const handleDecrease = async (item: TCartItem) => {
    if (item.quantity <= 1) return handleDelete(item._id);

    const updatedCart = cart.data.map((i) =>
      i.productId._id === item.productId._id
        ? { ...i, quantity: i.quantity - 1 }
        : i
    );
    setCart({ data: updatedCart });

    try {
      await updateCart({ id: item._id, quantity: item.quantity - 1 }).unwrap();
    } catch (error) {
      console.error("Failed to update cart", error);
    }
  };

  // Delete item
  const handleDelete = async (id: string) => {
    setCart({ data: cart.data.filter((i) => i._id !== id) });

    try {
      await deleteCart({ id });
    } catch (error) {
      console.error("Failed to delete item", error);
    }
  };

  // Subtotal, shipping, total calculation
  const subtotal = cart.data.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  const shipping = 8.0;
  const total = subtotal + shipping;

  return (
    <div>
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-semibold text-center">Your Cart</h1>
          </div>
          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow-md">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  {cart.data.length > 0 ? (
                    <ul className="-my-8">
                      {cart.data.map((items) => (
                        <li
                          key={items._id}
                          className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="shrink-0">
                            <img
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={items.productId.imageUrls[0]}
                              alt={items.productId.name}
                            />
                          </div>
                          <div className="relative flex flex-1 flex-col justify-between">
                            <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-5">
                                <p className="text-base font-semibold text-gray-900">
                                  {items.productId.name}
                                </p>
                              </div>
                              <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p className="shrink-0 w-20 text-base font-semibold text-[#21b3f1] sm:order-2 sm:ml-8 sm:text-right">
                                  ${items.productId.price}
                                </p>
                                <div className="sm:order-1">
                                  <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                    <button
                                      onClick={() => handleDecrease(items)}
                                      className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    >
                                      -
                                    </button>
                                    <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                      {items.quantity}
                                    </div>
                                    <button
                                      onClick={() => handleIncrease(items)}
                                      className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                              <button
                                onClick={() => handleDelete(items._id)}
                                type="button"
                                className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-center py-4 text-gray-500">
                      Your cart is empty.
                    </p>
                  )}
                </div>
                <div className="mt-6 border-t border-b py-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${shipping.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">
                      USD{" "}
                    </span>
                    ${total.toFixed(2)}
                  </p>
                </div>
                <div className="mt-6 text-center">
                  <button disabled={cart.data.length === 0}
  onClick={() => navigate("/checkout",  { state: { cart: cart.data, subtotal, shipping, total } })}
  className="group inline-flex w-full items-center justify-center rounded-md bg-[#21b3f1] px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow"
>
  Checkout
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
