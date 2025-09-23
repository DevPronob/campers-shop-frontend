/* eslint-disable @typescript-eslint/no-explicit-any */


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function SearchAndSortingContainer({  setSort,  setSearch,    setCategory }: any) {

    const handleReset = (e:any) => {
        e.preventDefault();
        setSort(undefined)
        setSearch(undefined)
        // setPriceRange([10, 100])
        setCategory('')
    };
    return (
        <div className="m-10">
            <div className="flex flex-col">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                    <form>
                        <div className="relative mb-6 w-full sm:flex sm:items-center sm:justify-between rounded-md">

                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                className="h-12 w-full sm:w-80 px-4 py-2 border border-gray-100 bg-gray-100 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Search..."
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="status" className="text-sm font-medium text-gray-600">Sort by</label>
                            <select
                                onChange={(e) => setSort(e.target.value)}
                                id="status"
                                className="mt-2 block w-full  px-4 py-2 border border-gray-100 bg-gray-100 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                            >
                                <option value="price">Price</option>
                                <option value="category">Category</option>
                                <option value="name">Name</option>
                                <option value="stock">Stock</option>
                            </select>
                        </div>

                        <div className="mt-6 grid w-full grid-cols-2 gap-4 sm:flex sm:justify-end">
                            <button
                                onClick={handleReset}
                                className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchAndSortingContainer