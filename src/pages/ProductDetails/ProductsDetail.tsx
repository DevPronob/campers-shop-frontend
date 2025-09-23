/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateCartMutation } from '@/redux/api/features/cart/cartApi';
import { decrement, increment } from '@/redux/api/features/cart/cartSlice';
import { useGetSingleProductsQuery } from '@/redux/api/features/products/productApi';
import { RootState } from '@/redux/store';
import  { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


function ProductsDetail() {
    const [productSlider, setProductslider] = useState(0);
    const { id } = useParams();
    const { data: detailProduct, error, isLoading } = useGetSingleProductsQuery(id);
    const cartQuantity = useSelector((state:RootState) => state.cart.quantity);
    const dispatch = useDispatch();
    const [createCart, { data }] = useCreateCartMutation(undefined);

const handleCart = async () => {
  if (!detailProduct?.data?._id) {
    console.error("Product ID is missing");
    return;
  }

  try {
    const payload = {
      productId: detailProduct.data._id,
      quantity: cartQuantity || 1,
    };
    console.log(payload)

    const res = await createCart(payload).unwrap();
    console.log("Cart created:", res);
    toast.success("Product Added to Cart Successfully");
  } catch (err: any) {
    console.error("Failed to add product to cart", err?.data || err);
    toast.error("Failed Product Added to Cart");
  }
};
    if (isLoading) {
        return < div role="status" >
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div >
    }

    if (error) {
        toast.error("Failed Product Added to Cart")
    }
    if (data) {
        toast.success("Product Added to Cart Successfully")
    }

    return (
        <div>
            <div>
                <section className="overflow-hidden bg-white pb-11 font-poppins dark:bg-gray-800">
                    <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
                        <div className="flex flex-wrap -mx-4">
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="sticky top-0 z-50 overflow-hidden ">
                                    <div className="relative mb-6 lg:mb-10 lg:h-2/4 ">
                                        <img src={detailProduct?.data.imageUrls[productSlider]} alt=""
                                            className="object-cover w-full lg:h-full " />
                                    </div>
                                    <div className="flex-wrap hidden md:flex ">
                                        {
                                            detailProduct?.data.imageUrls?.map((item:string, index:number) => (
                                                <div className="w-1/2 p-2 sm:w-1/4">
                                                    <div
                                                        className="block border border-blue-300 dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                                        <img onClick={() => setProductslider(index)} src={item} alt=""
                                                            className="object-cover w-full lg:h-20" />
                                                    </div>
                                                </div>
                                            ))
                                        }

                                        {/* <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div>
                            <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div>
                            <div className="w-1/2 p-2 sm:w-1/4">
                                <a href="#"
                                    className="block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300">
                                    <img src="https://i.postimg.cc/PqYpFTfy/pexels-melvin-buezo-2529148.jpg" alt=""
                                        className="object-cover w-full lg:h-20"/>
                                </a>
                            </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/2 ">
                                <div className="lg:pl-20">
                                    <div className="mb-8 ">
                                        <h2 className="max-w-xl mt-2 mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                                            {detailProduct?.data.name}</h2>
                                        <div className="flex items-center">
                                            {/* <ul className="flex mr-2">
                                                <Stack spacing={1}>
                                                    <Rating name="size-small" value={detailProduct?.reviews} size="small" />
                                                </Stack>
                                            </ul> */}

                                        </div>
                                        <p className="max-w-md mb-8 text-gray-700 text-[15px]">
                                            {detailProduct?.data.description}
                                        </p>

                                        <p className="inline-block font-bold text-[#21b3f1] mb-4">
                                            {/* <span>{detailProduct?.offerPrice}</span> */}
                                            <span
                                                className="text-[16px] font-bold">${detailProduct?.data.price}</span>
                                        </p>



                                        <p className="text-sm">{`${detailProduct?.data.stock} in stock`}</p>
                                    </div>
                                    <div className="flex items-center ">
                                        {/* <h2 className="w-16 mr-6 text-xl font-bold dark:text-gray-400">
                                Colors:</h2>
                            <div className="flex flex-wrap -mx-2 -mb-2">
                               
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 ">
                                    <div className="w-6 h-6 bg-cyan-300"></div>
                                </button>
                                <button
                                    className="p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-green-300 "></div>
                                </button>
                                <button
                                    className="p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400">
                                    <div className="w-6 h-6 bg-red-200 "></div>
                                </button>
                            </div> */}
                                    </div>
                                    <div className="flex items-center mb-8">
                                        <h2 className="w-16 text-xl font-bold dark:text-gray-400">
                                            Size:</h2>
                                        <div className="flex flex-wrap -mx-2 -mb-1">
                                            {detailProduct?.size}
                                            {/* <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">XL
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">S
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">M
                                </button>
                                <button
                                    className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">XS
                                </button> */}
                                        </div>
                                    </div>
                                    <div className="w-32 mb-8 ">
                                        <label 
                                            className="w-full text-xl font-semibold text-gray-700 dark:text-gray-400">Quantity</label>
                                        <div className="relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg">
                                            <button
                                                onClick={() => dispatch(decrement())}
                                                className="w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400">
                                                <span className="m-auto text-2xl font-thin">-</span>
                                            </button>
                                            <input type="number"
                                                min="0"

                                                className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                                                value={cartQuantity} />
                                            <button onClick={() => dispatch(increment())}
                                                className="w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400">
                                                <span className="m-auto text-2xl font-thin">+</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap items-center -mx-4 ">
                                        <div className="w-full px-4 mb-4 lg:w-1/2 lg:mb-0">

                                            {detailProduct?.data.stock > 1 ?
                                                <button onClick={handleCart} type="button"
                                                    className="py-2 px-4 bg-[#ffffff] border border-[#21b3f1] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg">Add To Cart</button>
                                                :
                                                <button disabled={true} type="button"
                                                    className="py-2 px-4 bg-[#ffffff] border border-[#21b3f1] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg">Add To Cart</button>
                                            }

                                        </div>
                                        <div className="w-full px-4 mb-4 lg:mb-0 lg:w-1/2">
                                            <button type="button"
                                                className="py-2 px-4 bg-[#ffffff] border border-[#21b3f1] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg">Add To Wishlist</button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default ProductsDetail