
import { useGetOrderOverviewQuery } from '@/redux/api/features/order/order.api';
import  { useEffect, useState } from 'react';

function Overview() {
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);
  const { data, isLoading, isError } = useGetOrderOverviewQuery(undefined);

  const totalOrders = data?.data?.totalOrder || 0;
  const totalSpent = data?.data?.totalPrice || 0;
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setRecentlyViewed(items);
  }, []);

  if (isLoading) {
    return <p className="p-5">Loading...</p>;
  }

  if (isError) {
    return <p className="p-5 text-red-500">Error loading data</p>;
  }

  return (
    <div className="p-5">
      <div className="bg-white rounded-xl shadow-md p-5 space-y-6">

        <h2 className="text-xl font-bold">Dashboard Overview</h2>

        
        <div className="flex gap-4">
          <div className="flex-1 bg-blue-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-blue-700">
              {totalOrders}
            </p>
          </div>

          <div className="flex-1 bg-green-100 p-4 rounded-lg text-center">
            <p className="text-gray-600">Total Spent</p>
            <p className="text-2xl font-bold text-green-700">
              ৳{totalSpent}
            </p>
          </div>
        </div>

        
        <div>
          <h3 className="font-semibold mb-3">Recently Viewed</h3>

          {recentlyViewed.length === 0 ? (
            <p className="text-gray-500 text-sm">
              No recently viewed products
            </p>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {recentlyViewed.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-36 bg-gray-50 p-2 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.imageUrls?.[0] || '/placeholder.svg'}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                    alt={item.name}
                    className="h-24 w-full object-cover rounded-md mb-2"
                  />

                  <p className="text-sm font-medium truncate">
                    {item.name}
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    ৳{item.price}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Overview;