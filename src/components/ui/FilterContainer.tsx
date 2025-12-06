/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useGetProductsWithoutFilterQuery } from "@/redux/api/features/products/productApi";
import { TProduct } from "@/types/productTypes";
import toast from "react-hot-toast";

interface FilterContainerProps {
  search: string;
  setSearch: (val: string) => void;
  sort: string;
  setSort: (val: string) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  category: string;
  setCategory: (val: string) => void;
}

const FilterContainer = ({
  search,
  setSort,
  sort,
  setSearch,
  setPriceRange,
  category,
  setCategory,
}: FilterContainerProps) => {
  const { data: products, error, isLoading } =
    useGetProductsWithoutFilterQuery(undefined);
    const prices = products?.data?.map((item: TProduct) => item.price) || [];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 1000;

  const [localPrice, setLocalPrice] = useState<number[]>([minPrice, maxPrice]);
 


  // Sync localPrice with parent state
  useEffect(() => {
    setPriceRange(localPrice);
  }, [localPrice, setPriceRange]);

  // Update localPrice if products change
  useEffect(() => {
    setLocalPrice([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-200 animate-spin fill-blue-600"
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  if (error) {
    toast.error("Failed to get data");
  }

  const uniqueCategories: any[] = [
    ...new Set(products?.data?.map((item: TProduct) => item.category)),
  ];

  const handleReset = () => {
    setSearch("");
    setSort("");
    setCategory("");
    setPriceRange([0, 1000]);
    setLocalPrice([0, 1000]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 space-y-6">
      <div className="space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
        >
          <option value="">Sort by</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="name">Name</option>
          <option value="stock">Stock</option>
        </select>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {uniqueCategories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                category === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Price Range</h3>
        <Slider
          range
          min={minPrice}
          max={maxPrice}
          value={localPrice}
          onChange={(val) => setLocalPrice(val as number[])}
          allowCross={false}
          trackStyle={[{ backgroundColor: "#004E64" }]}
          handleStyle={[
            { borderColor: "#004E64" },
            { borderColor: "#004E64" },
          ]}
        />
        <div className="flex justify-between text-sm font-medium text-gray-600">
          <span>${localPrice[0]}</span>
          <span>${localPrice[1]}</span>
        </div>
      </div>

      <button
        onClick={handleReset}
        className="w-full py-2 rounded-xl bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterContainer;
