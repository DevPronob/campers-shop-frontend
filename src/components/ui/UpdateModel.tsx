/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  useGetSingleProductsQuery,
  useUpdateProductsMutation,
} from "@/redux/api/features/products/productApi";
import axios from "axios";
import toast from "react-hot-toast";

interface UpdateModelProps {
  productId: string;
  closePopup: () => void;
}

function UpdateModel({ productId, closePopup }: UpdateModelProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<any>();
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<any>();
  const [rating, setRatings] = useState<any>();
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);

  const { data: product, error, isLoading } =
    useGetSingleProductsQuery(productId);
  const [updateProducts] = useUpdateProductsMutation();

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

  const handleImageChange = (event: any) => {
    const files = event.target.files;
    const imageArray: any = Array.from(files);
    setSelectedImages(imageArray);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const imageUrls = await Promise.all(
        selectedImages.map(async (image) => {
          const formData = new FormData();
          formData.append("image", image);
          const response = await axios.post(
            "https://api.imgbb.com/1/upload?key=3865938eefff3a14cd02acc91c1d32e1",
            formData
          );
          return response.data.data.url;
        })
      );

      const updatedProduct: any = {
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

      await updateProducts({
        id: productId,
        ...updatedProduct,
      });

      toast.success("Product updated successfully");
      closePopup();
    } catch (err) {
      toast.error("There was an error updating the product");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">Loading...</div>
    );
  }
  if (error) {
    toast.error("Failed to load product data");
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold">Update Product</h2>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={closePopup}
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3">
            <div>
              <label className="text-sm font-semibold">Name</label>
              <input
                type="text"
                className="input w-full input-bordered my-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Price</label>
              <input
                type="number"
                className="input w-full input-bordered my-2"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Category</label>
              <input
                type="text"
                className="input w-full input-bordered my-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Stock</label>
              <input
                type="number"
                className="input w-full input-bordered my-2"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold">Description</label>
              <input
                type="text"
                className="input w-full input-bordered my-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            <button
              className="btn bg-[#21b3f1] text-white w-full mt-4"
              type="submit"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateModel;
