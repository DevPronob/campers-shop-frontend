import  { useState } from 'react';
import ProductCard from '../../components/ui/ProductCard';
import FilterContainer from '@/components/ui/FilterContainer';
import { useGetProductsQuery } from '@/redux/api/features/products/productApi'; // Assuming Product type definition
import { TProduct } from '@/types/productTypes';

function Products() {
    const [priceRange, setPriceRange] = useState([10, 100]); // Adjusted default price range
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name');

    const { data} = useGetProductsQuery({
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category: category || undefined,
        sort: sort || undefined,
        searchTerm: search || undefined,
    });

    return (
        <div className="px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[30%,70%] gap-4">
                <div>
                    <FilterContainer
                        search={search}
                        setSort={setSort}
                        sort={sort}
                        setSearch={setSearch}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        category={category}
                        setCategory={setCategory}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data?.data.map((item: TProduct) => (
                        <ProductCard key={item._id} product={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
