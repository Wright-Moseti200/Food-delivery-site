import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://food-delivery-site-ljqp.onrender.com/api/product/getusersorders");
      
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch("https://food-delivery-site-ljqp.onrender.com/api/product/updateorderstatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: orderId,
          status: newStatus
        })
      });

      if (response.ok) {
        // Update local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        console.log("Order status updated successfully");
      } else {
        console.log("Failed to update order status");
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Food processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out for delivery':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className='flex w-full justify-center items-start py-4 sm:py-8'>
        <div className='flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-600">Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full justify-center items-start py-4 sm:py-8'>
      <div className='flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6'>
            <h1 className='font-bold text-xl sm:text-2xl text-center lg:text-left'>Order Management</h1>
            <button
              onClick={fetchAllOrders}
              className="mt-2 sm:mt-0 flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Orders
            </button>
          </div>
          
          <div className='flex flex-col gap-4 sm:gap-6'>
            {orders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">No orders found</p>
                <p className="text-gray-400 mt-2">Orders will appear here once customers place them</p>
              </div>
            ) : (
              orders.map((order) => (
                <div key={order._id || order.id} className='border border-gray-200 rounded p-4 sm:p-6'>
                  <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                    <div className='flex-1'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3'>
                        <h3 className='font-bold text-gray-800'>Order #{order._id?.slice(-8) || order.id?.slice(-8)}</h3>
                        <div className="flex items-center gap-2">
                          <select 
                            value={order.status || 'Food processing'}
                            onChange={(e) => handleStatusChange(order._id || order.id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-opacity-50 ${getStatusStyle(order.status)}`}
                          >
                            <option value="Food processing">Food processing</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div>
                          <p className='text-gray-600 text-sm'>Customer</p>
                          <p className='font-medium'>{order.names || order.delivery_info?.firstname} {order.delivery_info?.lastname}</p>
                          <p className='text-xs text-gray-500'>{order.email}</p>
                        </div>
                        <div>
                          <p className='text-gray-600 text-sm'>Phone</p>
                          <p className='font-medium'>{order.delivery_info?.phone}</p>
                        </div>
                        <div>
                          <p className='text-gray-600 text-sm'>Address</p>
                          <p className='font-medium text-xs'>{order.delivery_info?.street}, {order.delivery_info?.city}</p>
                        </div>
                        <div>
                          <p className='text-gray-600 text-sm'>Total</p>
                          <p className='font-semibold text-orange-500'>
                            ${order.products?.reduce((total, product) => {
                              const price = product.price || (product.price_data?.unit_amount || 0) / 100;
                              const quantity = product.quantity || 1;
                              return total + (price * quantity);
                            }, 0).toFixed(2)}
                          </p>
                          <p className='text-xs text-gray-500'>
                            {order.products?.length || 0} items
                          </p>
                        </div>
                      </div>

                      {/* Ordered Items */}
                      <div className='mt-4'>
                        <p className='text-gray-600 text-sm mb-2'>Ordered Items:</p>
                        <div className='flex flex-wrap gap-2'>
                          {order.products?.slice(0, 5).map((product, index) => (
                            <span key={index} className='bg-gray-100 px-2 py-1 rounded text-xs'>
                              {product.name || product.price_data?.product_data?.name} x{product.quantity || 1}
                            </span>
                          ))}
                          {order.products?.length > 5 && (
                            <span className='bg-gray-100 px-2 py-1 rounded text-xs'>
                              +{order.products.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;