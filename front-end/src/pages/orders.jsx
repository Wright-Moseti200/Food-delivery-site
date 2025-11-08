import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth-token");
      
      if (!token) {
        console.log("No authentication token found");
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/api/users/getuserorders', {
        method: 'GET',
        headers: {
          'auth-token': localStorage.getItem("auth-token"),
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || data || []);
      } else {
        console.log('Failed to fetch orders');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshOrders = () => {
    fetchUserOrders();
  };

  useEffect(() => {
    fetchUserOrders();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center mt-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Loading your orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Your Orders</h1>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base">
              Track your food orders and delivery status
            </p>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={refreshOrders}
            className="mt-4 lg:mt-0 flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-colors text-sm sm:text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Orders
          </button>
        </div>

        {/* Orders List - Full Width Cards */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <p className="text-gray-500 text-lg">No orders found</p>
              <p className="text-gray-400 mt-2">Your orders will appear here once you place them</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id || order.id}
                className="bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow w-full h-[140px] flex"
              >
                {/* Left Section - Order Info */}
                <div className="flex-1 p-4 border-r border-gray-200">
                  <div className="flex justify-between items-start h-full">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Food processing' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'On the way' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status || 'Processing'}
                        </span>
                        <p className="text-xs text-gray-500">#{order._id?.slice(-8) || order.id?.slice(-8)}</p>
                      </div>
                      <p className="text-sm font-semibold text-gray-800 mb-1">
                        {order.delivery_info?.firstname} {order.delivery_info?.lastname}
                      </p>
                      <p className="text-xs text-gray-600">
                        {order.delivery_info?.city}, {order.delivery_info?.state} • {order.delivery_info?.phone}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">{formatDate(order.createdAt)}</p>
                    </div>
                    
                    {/* Order Total */}
                    <div className="text-right">
                      <span className="text-lg font-bold text-orange-500">
                        ${order.products?.reduce((total, product) => {
                          const price = product.price || (product.price_data?.unit_amount || 0) / 100;
                          const quantity = product.quantity || 1;
                          return total + (price * quantity);
                        }, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Ordered Items */}
                <div className="w-2/3 p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Ordered Items</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {order.products?.slice(0, 4).map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="font-medium text-gray-800 truncate text-xs">
                          {product.name || product.price_data?.product_data?.name || 'Unknown Item'}
                        </span>
                        <div className="flex items-center gap-1 text-gray-600">
                          <span className="text-xs">x{product.quantity || 1}</span>
                          <span className="font-semibold text-gray-800 text-xs">
                            ${((product.price || (product.price_data?.unit_amount || 0) / 100) * (product.quantity || 1)).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                    {order.products?.length > 4 && (
                      <div className="col-span-2 text-center">
                        <p className="text-xs text-gray-500">
                          +{order.products.length - 4} more items
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;