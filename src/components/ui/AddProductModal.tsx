import { useCreateProductsMutation } from "@/redux/api/features/products/productApi";
import { useEffect, useState } from "react";

function AddProductModal() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [createProducts] = useCreateProductsMutation();

  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [imagePreviews]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews(previews);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const imageUrls = await Promise.all(
        selectedImages.map(async (image) => {
          const imageFormData = new FormData();
          imageFormData.append("image", image);

          const response = await fetch(
            "https://api.imgbb.com/1/upload?key=3865938eefff3a14cd02acc91c1d32e1",
            {
              method: "POST",
              body: imageFormData,
            }
          );

          const result = await response.json();
          return result.data.url;
        })
      );

      const productData = {
        name: formData.get("name") as string,
        price: Number(formData.get("price")),
        category: formData.get("category") as string,
        stock: Number(formData.get("stock")),
        ratings: Number(formData.get("rating")),
        description: formData.get("description") as string,
        imageUrls,
      };

      const data = await createProducts(productData).unwrap();

      console.log("Product created:", data);

      setSelectedImages([]);
      setImagePreviews([]);

      (
        document.getElementById("my_modal_3") as HTMLDialogElement
      )?.close();

      event.currentTarget.reset();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <button
        className="btn !bg-[var(--accent-primary-bg)] text-white"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        Add Product
      </button>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-3xl bg-base-100 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Add New Product</h2>
            <p className="text-gray-500 mt-2">
              Create a new product for your store inventory
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label font-medium">
                  Product Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Camping Backpack"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">
                  Category
                </label>
                <input
                  name="category"
                  type="text"
                  placeholder="Backpacks"
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
                  name="price"
                  type="number"
                  placeholder="99"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Stock</label>
                <input
                  name="stock"
                  type="number"
                  placeholder="50"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label font-medium">Rating</label>
                <input
                  name="rating"
                  type="number"
                  step="0.1"
                  placeholder="4.8"
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
                name="description"
                rows={4}
                placeholder="Write a short product description..."
                className="textarea textarea-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label font-medium">
                Product Images
              </label>

              <label
                htmlFor="images"
                className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-gray-400 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>

                <p className="font-medium">
                  Click to upload product images
                </p>

                <p className="text-sm text-gray-500">
                  PNG, JPG, WEBP supported
                </p>

                {selectedImages.length > 0 && (
                  <p className="mt-3 text-primary font-semibold">
                    {selectedImages.length} image(s) selected
                  </p>
                )}

                <input
                  id="images"
                  name="images"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                  required
                />
              </label>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                  {imagePreviews.map((preview, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden border border-base-300 shadow-sm"
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          URL.revokeObjectURL(
                            imagePreviews[index]
                          );

                          const updatedImages = [
                            ...selectedImages,
                          ];
                          const updatedPreviews = [
                            ...imagePreviews,
                          ];

                          updatedImages.splice(index, 1);
                          updatedPreviews.splice(index, 1);

                          setSelectedImages(updatedImages);
                          setImagePreviews(updatedPreviews);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                      >
                        ✕
                      </button>

                      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="btn flex-1 bg-primary text-white border-none hover:scale-[1.02] transition"
              >
                Create Product
              </button>

              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  (
                    document.getElementById(
                      "my_modal_3"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                Cancel
              </button>
            </div>
          </form>

          <button
            type="button"
            className="btn btn-circle btn-ghost absolute right-4 top-4"
            onClick={() =>
              (
                document.getElementById(
                  "my_modal_3"
                ) as HTMLDialogElement
              )?.close()
            }
          >
            ✕
          </button>
        </div>
      </dialog>
    </>
  );
}

export default AddProductModal;