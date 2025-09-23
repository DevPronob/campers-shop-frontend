import { TProduct } from '@/types/productTypes'
import { useNavigate } from 'react-router-dom'

function productCard({ product }: { product: TProduct }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate()
    const nagivateToDetail = (name: string) => {
        console.log(name)
        navigate(`/product/${name}`)
    }
    return (
        <div className=''>
            <div className="flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-4">
                <div className="flex bg-white rounded-lg shadow dark:bg-gray-800 flex-col items-center w-[270px] h-[460px]">
                    <div className="relative w-full w-[250px] h-[234px] mt-[10px] flex justify-center items-center">
                        <img src={product.imageUrls[1]} alt="shopping image"
                            className="object-cover w-[250px]  md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none" />
                    </div>
                    <form className="flex-auto p-6">
                        <div className="flex flex-wrap h-[132px]">
                            <p></p>
                            <h1 className="flex-auto text-[16px] font-semibold dark:text-gray-50">{product.name}</h1>
                            <div className="text-[16px] font-semibold text-[#21b3f1] dark:text-gray-300">${product.price}</div>
                            <div className="flex-none w-full mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">{product.stock > 1 ? "in stock" : "out of stock"}</div>
                        </div>
                        {/* <div className="flex items-baseline mt-4 mb-6 text-gray-700 dark:text-gray-300">
                            <div className="flex space-x-2">

                                <label className="text-center">

                                    <input type="radio"
                                        className="flex items-center justify-center w-6 h-6 accent-violet-600 bg-gray-100 rounded-lg dark:bg-gray-600"
                                        name="size" value="xs"/>XS
                                </label>
                                <label className="text-center">
                                    <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                        value="s">S
                                </label>
                                <label className="text-center">
                                    <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                        value="m">M
                                </label>
                                <label className="text-center">
                                    <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                        value="l">L
                                </label>
                                <label className="text-center">
                                    <input type="radio" className="flex items-center justify-center w-6 h-6 accent-violet-600" name="size"
                                        value="xl">XL
                                </label>
                            </div>
                            <a href="#"
                                className="hidden ml-auto text-sm text-gray-500 underline md:block dark:text-gray-300">Size
                                Guide
                            </a>
                        </div> */}
                        <div className="flex mb-4 text-sm font-medium ">
                            {/* #21b3f1 */}
                            {product.stock > 1 ?
                                <button onClick={() => nagivateToDetail(product._id)} type="button"
                                    className="py-2 px-4 bg-[#ffffff] border border-[#21b3f1] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg">Details</button>
                                :
                                <button disabled={true} type="button"
                                    className="py-2 px-4 bg-[#ffffff] border border-[#21b3f1] text-black w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[#21b3f1] focus:ring-offset-2 focus:ring-offset-indigo-200 hover:bg-[#21b3f1] hover:text-white rounded-lg">Details</button>
                            }
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default productCard