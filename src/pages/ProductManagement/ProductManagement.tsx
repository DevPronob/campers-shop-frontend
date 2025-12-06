/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AddProductModal from "@/components/ui/AddProductModal";
import DeleteModal from "@/components/ui/DeleteModal";
import UpdateModel from "@/components/ui/UpdateModel";
import { useGetProductsWithoutFilterQuery } from "@/redux/api/features/products/productApi";
import { TProduct } from "@/types/productTypes";

function ProductManagement() {
  const { data } = useGetProductsWithoutFilterQuery(undefined);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);

  const openDelete = (product: TProduct) => {
    setSelectedProduct(product);
    setIsOpenDelete(true);
  };

  const openUpdate = (product: TProduct) => {
    setSelectedProduct(product);
    setIsOpenUpdate(true);
  };

  const closePopup = () => {
    setSelectedProduct(null);
    setIsOpenDelete(false);
    setIsOpenUpdate(false);
  };

  return (
    <div>
      <div className="mx-auto px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <h2 className="font-semibold text-gray-700 text-center text-2xl">
            Product Management
          </h2>
          <AddProductModal />
        </div>

        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#21b3f1] text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Product Image</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Price</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {data?.data.map((items: TProduct) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    key={items._id}
                  >
                    <td className="p-4">
                      <img
                        src={items?.imageUrls[0]}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Product"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {items.name}
                    </td>
                    <td className="px-6 py-4">{items.price}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {items.category}
                    </td>
                    <td className="px-6 py-4 flex items-center pt-8 gap-3">
                      <button
                        onClick={() => openUpdate(items)}
                        className="font-medium btn bg-[#21b3f1] text-white"
                      >
                        Update Product
                      </button>
                      <button
                        onClick={() => openDelete(items)}
                        className="font-medium btn bg-red-700 text-white"
                      >
                        Delete Product
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isOpenUpdate && selectedProduct && (
        <UpdateModel productId={selectedProduct._id} closePopup={closePopup} />
      )}

      {isOpenDelete && selectedProduct && (
        <DeleteModal items={selectedProduct} closePopup={closePopup} />
      )}
    </div>
  );
}

export default ProductManagement;
