/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCreateProductsMutation } from '@/redux/api/features/products/productApi';
import { useState } from 'react';

function AddProductModal() {
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [createProducts] = useCreateProductsMutation();

    const handleImageChange = (event:any) => {
        const files = event.target.files;
        setSelectedImages([...files]);
    };

    const handleSubmit = async (event:any) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const imageUrls = await Promise.all(
            selectedImages.map(async (image:any) => {
                formData.set('image', image);
                const response = await fetch('https://api.imgbb.com/1/upload?key=3865938eefff3a14cd02acc91c1d32e1', {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.json();
                return result.data.url;
            })
        );

        const productData = {
            name: formData.get('name'),
            price: Number(formData.get('price')),
            category: formData.get('category'),
            stock: Number(formData.get('stock')),
            ratings: Number(formData.get('rating')),
            description: formData.get('description'),
            imageUrls: imageUrls,
        };

        try {
            const { data } = await createProducts(productData).unwrap();
            console.log('Product created:', data);
            // Optionally dispatch an action or update local state on success
            // dispatch(productCreated(data));
            (document.getElementById('my_modal_3') as any).close();
        } catch (error) {
            console.error('Error creating product:', error);
            // Handle error state or display error message
        }
    };

    return (
        <>
            <button className="btn bg-[#21b3f1] text-white" onClick={() => (document.getElementById('my_modal_3') as any).showModal()}>Add Product</button>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <h2 className='text-center text-xl font-semibold py-2'>Add Product</h2>
                    <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 mt-10'>
                        <input name="name" type="text" placeholder="Product Name" className="input w-full input-bordered" required />
                        <input name="price" type="number" placeholder="Product Price" className="input w-full input-bordered" required />
                        <input name="category" type="text" placeholder="Product Category" className="input w-full input-bordered" required />
                        <input name="stock" type="number" placeholder="Product Stock" className="input w-full input-bordered" required />
                        <input name="rating" type="number" placeholder="Product Rating" className="input w-full input-bordered" required />
                        <input name="description" type="text" placeholder="Product Description" className="input w-full input-bordered" required />

                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="images" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <input type="file"
                                    id="images"
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    name="images"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    required />
                            </label>
                        </div>

                        <br />
                        <input className='btn  bg-[#21b3f1] text-white w-full' type="submit" value="Submit" />
                        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() =>( document.getElementById('my_modal_3') as any).close()}>✕</button>
                    </form>
                </div>
            </dialog>
        </>
    );
}

export default AddProductModal;
