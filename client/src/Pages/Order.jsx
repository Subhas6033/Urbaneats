import React from 'react';
import { useSelector } from 'react-redux';
import { OrderCard } from '../Components/index';

const Order = () => {
  const orders = useSelector((state) => state.order.confirmedOrders || []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order, i) => (
            <OrderCard key={i} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
