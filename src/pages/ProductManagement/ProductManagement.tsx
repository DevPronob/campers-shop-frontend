/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState } from 'react';
import AddProductModal from '@/components/ui/AddProductModal';
import DeleteModal from '@/components/ui/DeleteModal';
import UpdateModel from '@/components/ui/UpdateModel';
import { useGetProductsWithoutFilterQuery } from '@/redux/api/features/products/productApi';
import { TProduct } from '@/types/productTypes';

function ProductManagement() {
    const { data } = useGetProductsWithoutFilterQuery(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store the selected product

    const openPopup = (product: any) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const openUpdate = (product: any) => {
        (document.getElementById('my_modal_4') as any).showModal()
        setSelectedProduct(product);
        setIsOpenUpdate(true); // Set isOpenUpdate to true to open the UpdateModel
    };

    const closePopup = () => {
        setSelectedProduct(null);
        setIsOpen(false);
        setIsOpenUpdate(false); // Ensure isOpenUpdate is set to false when closing the modal
    };

    return (
        <div>
            <div className="mx-auto px-4 py-8 sm:px-8">
                <div className="flex items-center justify-between pb-6">
                    <div>
                        <h2 className="font-semibold text-gray-700 text-center text-2xl">Product Management</h2>

                    </div>
                    <div className="flex items-center justify-between">
                        <AddProductModal />
                    </div>
                </div>
                <div className="overflow-y-hidden rounded-lg border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#21b3f1] text-left text-xs font-semibold uppercase tracking-widest text-white">
                                    <th className="px-5 py-3">Product Image</th>
                                    <th className="px-5 py-3">name</th>
                                    <th className="px-5 py-3">price</th>
                                    <th className="px-5 py-3">category</th>
                                    <th className="px-5 py-3">actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500">
                                {
                                    data?.data.map((items: TProduct) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={items._id}>
                                            <td className="p-4">
                                                <img src={items?.imageUrls[0]} className="w-16 md:w-32 max-w-full max-h-full" alt="Product Image" />
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {items.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {items.price}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {items.category}
                                            </td>
                                            <td className="px-6 py-4 flex items-center pt-8 gap-3">
                                                <a onClick={() => openUpdate(items)} className="font-medium btn bg-[#21b3f1] text-white ">Update Product</a>
                                                <a onClick={() => openPopup(items)} className="font-medium btn bg-red-700 text-white dark:text-red-500 ">Delete Product</a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isOpenUpdate && <UpdateModel productId={(selectedProduct as any)?._id} closePopup={closePopup} />}
            {isOpen && <DeleteModal items={selectedProduct} closePopup={closePopup} />}
        </div>
    );
}

export default ProductManagement;
