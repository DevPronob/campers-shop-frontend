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

function UpdateModel({
  productId,
  closePopup,
}: UpdateModelProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [rating, setRatings] = useState<number>(0);
  const [description, setDescription] = useState("");

  const [selectedImages, setSelectedImages] = useState<File[]>(
    []
  );
  const [imagePreviews, setImagePreviews] = useState<
    string[]
  >([]);

  const { data: product, error, isLoading } =
    useGetSingleProductsQuery(productId);

  const [updateProducts] =
    useUpdateProductsMutation();

  useEffect(() => {
    if (product?.data) {
      setName(product.data.name);
      setPrice(product.data.price);
      setCategory(product.data.category);
      setStock(product.data.stock);
      setRatings(product.data.ratings);
      setDescription(product.data.description);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) =>
        URL.revokeObjectURL(preview)
      );
    };
  }, [imagePreviews]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(
      event.target.files || []
    );

    setSelectedImages(files);

    const previews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setImagePreviews(previews);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
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
        ratings: rating,
        description,
      };

      if (imageUrls.length > 0) {
        updatedProduct.imageUrls = imageUrls;
      }

      await updateProducts({
        id: productId,
        ...updatedProduct,
      }).unwrap();

      toast.success(
        "Product updated successfully"
      );

      closePopup();
    } catch (err) {
      console.error(err);
      toast.error(
        "There was an error updating the product"
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-10">
        Failed to load product data
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4">
      <div className="bg-base-100 rounded-3xl shadow-2xl max-w-3xl w-full p-8 relative max-h-[90vh] overflow-y-auto">

        <button
          type="button"
          className="btn btn-circle btn-ghost absolute right-4 top-4"
          onClick={closePopup}
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">
            Update Product
          </h2>

          <p className="text-gray-500 mt-2">
            Modify your product details
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label font-medium">
                Product Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-medium">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="label font-medium">
                Price ($)
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(Number(e.target.value))
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-medium">
                Stock
              </label>

              <input
                type="number"
                value={stock}
                onChange={(e) =>
                  setStock(Number(e.target.value))
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-medium">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                value={rating}
                onChange={(e) =>
                  setRatings(
                    Number(e.target.value)
                  )
                }
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="label font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label font-medium">
              Product Images
            </label>

            <label
              htmlFor="updateImages"
              className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition"
            >
              <p className="font-medium">
                Click to upload new images
              </p>

              <p className="text-sm text-gray-500">
                PNG, JPG, WEBP supported
              </p>

              {selectedImages.length > 0 && (
                <p className="mt-3 text-primary font-semibold">
                  {selectedImages.length} image(s)
                  selected
                </p>
              )}

              <input
                id="updateImages"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {imagePreviews.map(
                  (preview, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden border shadow-sm"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-full h-32 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          const imgs = [
                            ...selectedImages,
                          ];

                          const previews = [
                            ...imagePreviews,
                          ];

                          imgs.splice(
                            index,
                            1
                          );

                          previews.splice(
                            index,
                            1
                          );

                          setSelectedImages(
                            imgs
                          );

                          setImagePreviews(
                            previews
                          );
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white"
                      >
                        ✕
                      </button>

                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="btn flex-1 !bg-[var(--accent-primary-bg)] text-white border-none"
            >
              Update Product
            </button>

            <button
              type="button"
              className="btn btn-outline"
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateModel;