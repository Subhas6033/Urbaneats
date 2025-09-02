import React from 'react';
import { useSelector } from 'react-redux';
import {
  ShoppingBag,
  Truck,
  Calendar,
  Users,
  ClipboardList,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Order = () => {
  const orders = useSelector((state) => state.order.confirmedOrders || []);
  const cateringOrders = useSelector(
    (state) => state.order.cateringOrders || []
  );

  const hasOrders = orders.length > 0 || cateringOrders.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-emerald-600 mb-6">My Orders</h1>

      {!hasOrders ? (
        <div className="flex flex-col items-center justify-center text-center py-20">
          <ShoppingBag className="h-20 w-20 text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg mb-3">
            You haven’t placed any orders yet.
          </p>
          <Link
            to="/menu"
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Normal Food Orders */}
          {orders.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Food Orders
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {orders.map((order, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-sm text-gray-500">Order ID</span>
                        <span className="text-sm font-semibold">
                          #{i + 1001}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Item:</span>
                        <span className="font-medium">
                          {order.item || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Quantity:</span>
                        <span>{order.quantity || 1}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total:</span>
                        <span className="font-semibold text-emerald-600">
                          ₹{order.totalPrice || 0}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status:</span>
                        <span className="flex items-center gap-1 text-blue-600">
                          <Truck className="h-4 w-4" /> On the Way
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-xs text-gray-500 border-t pt-2">
                      Delivery to: {order.address || 'No address provided'}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Catering Orders */}
          {cateringOrders.length > 0 && (
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Catering Orders
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cateringOrders.map((order, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-lg transition"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b pb-2">
                        <span className="text-sm text-gray-500">
                          Catering ID
                        </span>
                        <span className="text-sm font-semibold">
                          #{i + 5001}
                        </span>
                      </div>
                      <p className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-emerald-600" />
                        <span>{order.date || 'Not set'}</span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-emerald-600" />
                        <span>{order.guests || 0} Guests</span>
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <ClipboardList className="h-4 w-4 text-emerald-600" />
                        <span>{order.notes || 'No notes provided'}</span>
                      </p>
                    </div>

                    <div className="mt-4 text-xs text-gray-500 border-t pt-2">
                      Booked by:{' '}
                      <span className="font-medium">{order.name}</span>
                      <br />
                      Contact: {order.mobile}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
