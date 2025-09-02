import React from 'react';
import { useSelector } from 'react-redux';
import { IndianRupee, CheckCircle, Truck, Clock, Utensils } from 'lucide-react';

const Order = () => {
  const orders = useSelector((state) => state.order.confirmedOrders || []);

  const getSteps = (status) => {
    const steps = [
      { label: 'Order Placed', icon: Clock },
      { label: 'Preparing', icon: Utensils },
      { label: 'Out for Delivery', icon: Truck },
      { label: 'Delivered', icon: CheckCircle },
    ];

    const statusIndex = steps.findIndex((s) =>
      s.label.toLowerCase().includes(status.toLowerCase())
    );

    return steps.map((step, idx) => ({
      ...step,
      completed: idx <= statusIndex,
    }));
  };

  return (
    <div className="p-6">
      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-8">
          {orders.map((order, i) => {
            const steps = getSteps(order.status);

            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6"
              >
                {/* Order Info */}
                <h2 className="text-xl font-semibold text-emerald-600 mb-2">
                  {order.item}
                </h2>
                <p>
                  <strong>Quantity:</strong> {order.quantity}
                </p>
                <p className="flex items-center gap-1 font-bold text-gray-900">
                  <IndianRupee className="w-4 h-4" /> {order.totalPrice}
                </p>

                {/* Customer Info */}
                <div className="mt-4 border-t pt-3 text-sm text-gray-700">
                  <p>
                    <strong>Name:</strong> {order.customerName}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {order.mobile}
                  </p>
                  <p>
                    <strong>Address:</strong> {order.address}
                  </p>
                </div>

                {/* Progress Tracker */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold mb-2 text-gray-700">
                    Order Progress
                  </h3>
                  <div className="flex items-center justify-between relative">
                    {steps.map((step, idx) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={idx}
                          className={`flex flex-col items-center text-sm w-1/4 ${
                            step.completed
                              ? 'text-emerald-600'
                              : 'text-gray-400'
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 mb-1 ${
                              step.completed
                                ? 'bg-emerald-100 border-emerald-600'
                                : 'bg-gray-100 border-gray-300'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-center">{step.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Order;
