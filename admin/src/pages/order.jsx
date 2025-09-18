import React from 'react';

const Order = () => {
  const orders = [
    {
      id: 1,
      customer: "John Smith",
      date: "2023-05-15",
      total: 25.99,
      status: "Delivered",
      items: 3
    },
    {
      id: 2,
      customer: "Emily Johnson",
      date: "2023-05-16",
      total: 42.50,
      status: "Processing",
      items: 5
    },
    {
      id: 3,
      customer: "Michael Brown",
      date: "2023-05-17",
      total: 18.75,
      status: "Shipped",
      items: 2
    }
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='flex w-full justify-center items-start py-4 sm:py-8'>
      <div className='flex flex-col w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200 w-full'>
          <h1 className='font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-center lg:text-left'>Order Management</h1>
          
          <div className='flex flex-col gap-4 sm:gap-6'>
            {orders.map((order) => (
              <div key={order.id} className='border border-gray-200 rounded p-4 sm:p-6'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-start gap-4'>
                  <div className='flex-1'>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4'>
                      <h3 className='font-bold text-gray-800'>Order #{order.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3'>
                      <div>
                        <p className='text-gray-600 text-sm'>Customer</p>
                        <p className='font-medium'>{order.customer}</p>
                      </div>
                      <div>
                        <p className='text-gray-600 text-sm'>Date</p>
                        <p className='font-medium'>{order.date}</p>
                      </div>
                      <div>
                        <p className='text-gray-600 text-sm'>Items</p>
                        <p className='font-medium'>{order.items}</p>
                      </div>
                      <div>
                        <p className='text-gray-600 text-sm'>Total</p>
                        <p className='font-semibold text-orange-500'>${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='flex gap-2 md:flex-col lg:flex-row'>
                    <button className='py-2 px-4 bg-blue-100 text-blue-700 rounded font-medium hover:bg-blue-200 transition-colors text-sm'>
                      View Details
                    </button>
                    <button className='py-2 px-4 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors text-sm'>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;