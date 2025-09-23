/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from 'react';
import { useGetSingleProductsQuery, useUpdateProductsMutation } from '@/redux/api/features/products/productApi';
import axios from 'axios';
import toast from 'react-hot-toast';

interface UpdateModelProps {
  productId: string;
  closePopup: () => void;
}
function UpdateModel({ productId }: UpdateModelProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState<any>();
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState<any>();
    const [rating, setRatings] = useState<any>();
    const [description, setDescription] = useState('');
    const { data: product, error, isLoading } = useGetSingleProductsQuery(productId);
    const [updateProducts] = useUpdateProductsMutation();
    console.log(productId, "producttt")

    const [selectedImages, setSelectedImages] = useState([]);
    console.log(productId, "productIIIIII")

    useEffect(() => {
        if (product) {
            setName(product?.data?.name);
            setPrice(product?.data?.price);
            setCategory(product?.data?.category);
            setStock(product?.data?.stock);
            setRatings(product?.data?.ratings);
            setDescription(product?.data?.description);
        }
    }, [product]);

    const handleImageChange = (event:any) => {
        const files = event.target.files;
        const imageArray:any = Array.from(files);
        setSelectedImages(imageArray);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        try {
            // Upload images
            const imageUrls = await Promise.all(
                selectedImages.map(async (image) => {
                    const formData = new FormData();
                    formData.append('image', image);
                    const response = await axios.post('https://api.imgbb.com/1/upload?key=3865938eefff3a14cd02acc91c1d32e1', formData);
                    return response.data.data.url;
                })
            );

            // Prepare updated product data
            const updatedProduct:any = {
                name,
                price,
                category,
                stock,
                rating,
                description,
            };
            if (imageUrls.length > 0) {
                updatedProduct.imageUrls = imageUrls;
            }
            // Update product
            const response = await updateProducts({
                id: productId,
                ...updatedProduct,
            });

            console.log('Product updated:', response);
           ( document.getElementById('my_modal_4') as any).close();
        } catch (error) {
            toast.error("There was an error updating the product:")
        }
    };

    if (isLoading) {
        return <div role="status" >
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
        </div >
    }
    if (error) {
        toast.error("There was an error updating the product:")
    }

    return (
        <div>
            {/* <button className="btn bg-[#21b3f1] text-white" onClick={() => document.getElementById('my_modal_4').showModal()}>Update Product</button> */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box">
                    <h2 className="text-center text-xl font-semibold py-2">Update Product</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 mt-10">
                        <div>
                            <label className='text-[14px] font-semibold my-3'>Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Product Name"
                                className="input w-full input-bordered my-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className='text-[14px] font-semibold my-3'>Price</label>
                            <input
                                name="price"
                                type="text"
                                placeholder="Product Price"
                                className="input w-full input-bordered my-3"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value as any))}
                                required
                            />
                        </div>
                        <div>
                            <label className='text-[14px] font-semibold my-3'>Category</label>
                            <input
                                name="category"
                                type="text"
                                placeholder="Product Category"
                                className="input w-full input-bordered my-3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className='text-[14px] font-semibold my-3'>Stock</label>
                            <input
                                name="stock"
                                type="text"
                                placeholder="Product Stock"
                                className="input w-full input-bordered my-3"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label className='text-[14px] font-semibold my-3'>Description</label>
                            <input
                                name="description"
                                type="text"
                                placeholder="Product Description"
                                className="input w-full input-bordered my-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />

                        </div>

                        <div className="flex items-center justify-center w-full">

                            <input
                                type="file"
                                id="images"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                        </div>

                        <br />
                        <input className="btn bg-[#21b3f1] text-white w-full" type="submit" value="Submit" />
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => (document.getElementById('my_modal_4') as any).close()}>✕</button>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default UpdateModel;
