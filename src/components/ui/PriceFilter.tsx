
import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = ({ minPrice, maxPrice, onPriceChange }: any) => {
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice]);
  useEffect(() => {
    onPriceChange([minPrice, maxPrice]);
  }, [minPrice, maxPrice, onPriceChange]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Price Range</h3>
      <Slider
        range
        min={minPrice}
        max={maxPrice}
        value={priceRange[1]}
        onChange={(value) => setPriceRange(value as number[])}
        allowCross={true}
        trackStyle={[{ backgroundColor: "#004E64", height: 6 }]}
        handleStyle={[
          { borderColor: "#004E64", height: 20, width: 20, marginTop: -7, backgroundColor: "white" },
          { borderColor: "#004E64", height: 20, width: 20, marginTop: -7, backgroundColor: "white" },
        ]}
        railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
      />
      <div className="flex justify-between mt-3 text-gray-600 font-medium">
        <span>${priceRange[0]}</span>
        <span>${priceRange[1]}</span>
      </div>
    </div>
  );
};

export default PriceFilter;
