import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmOrder } from '../Slice/OrderSlice';
import { QRCodeSVG } from 'qrcode.react';
import { IndianRupee } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import {Helmet} from 'react-helmet-async'

const Payment = () => {
  const upiId = import.meta.env.VITE_UPI_ID;
  const upiName = import.meta.env.VITE_UPI_NAME;

  const location = useLocation();
  const dispatch = useDispatch();
  const { item, price, quantity, totalPrice } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiApp, setUpiApp] = useState('super.money');

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const orderDetails = {
      item,
      quantity,
      totalPrice,
      customerName: formData.get('name'),
      mobile: formData.get('mobile'),
      address: formData.get('address'),
      paymentMethod,
      upiApp: paymentMethod === 'UPI' ? upiApp : null,
    };

    dispatch(confirmOrder(orderDetails));

    // ✅ Toast notification
    toast.success(`Your Order for ${item} is Confirmed!!!`, {
      duration: 4000,
      position: 'top-center',
    });
  };

  if (!item)
    return <p className="text-center mt-20 text-red-600"> No item selected.</p>;

  return (
    <>
      <Helmet>
        <title>Urban Eats | Payments </title>
        <meta
          name="description"
          content="Securely complete your payment with Urban Eats. We support multiple payment options to ensure a smooth, fast, and hassle-free checkout experience."
        />
      </Helmet>
      <form
        onSubmit={handleConfirmOrder}
        className="min-h-screen bg-gray-100 p-6 flex justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {/* Left: Payment Methods */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">
              Payment Method
            </h2>

            {[
              { label: 'UPI', value: 'UPI' },
              { label: 'Credit / Debit / ATM Card', value: 'Card Payment' },
              { label: 'Net Banking', value: 'Net Banking' },
              { label: 'Cash on Delivery', value: 'Cash On Delivery' },
            ].map((option) => (
              <div
                key={option.value}
                className={`border rounded-lg p-3 cursor-pointer transition ${
                  paymentMethod === option.value
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setPaymentMethod(option.value)}
              >
                <label className="cursor-pointer flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value={option.value}
                    checked={paymentMethod === option.value}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="hidden"
                  />
                  <span className="font-medium">{option.label}</span>
                </label>
              </div>
            ))}
          </div>

          {/* Middle: Payment Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Payment Details
            </h2>

            {/* ✅ UPI Section */}
            {paymentMethod === 'UPI' && (
              <>
                <div>
                  <p className="font-medium text-sm mb-2">Select a UPI App:</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'super.money',
                      'Paytm',
                      'Google Pay',
                      'PhonePe',
                      'CRED',
                    ].map((app) => (
                      <label
                        key={app}
                        className={`border rounded-lg py-2 px-3 flex items-center justify-between cursor-pointer transition ${
                          upiApp === app
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="upiApp"
                          value={app}
                          checked={upiApp === app}
                          onChange={(e) => setUpiApp(e.target.value)}
                          className="hidden"
                        />
                        <span className="text-sm">{app}</span>
                        {upiApp === app && (
                          <span className="text-emerald-500 text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <p className="font-medium">Scan to Pay</p>
                  <QRCodeSVG
                    value={`upi://pay?pa=${upiId}&pn=${encodeURIComponent(
                      upiName
                    )}&am=${totalPrice}&cu=INR`}
                    size={180}
                  />
                  <p className="text-sm text-gray-600">
                    Amount: <IndianRupee className="inline h-4 w-4" />{' '}
                    {totalPrice}
                  </p>
                </div>
              </>
            )}

            {/* ✅ Card Payment */}
            {paymentMethod === 'Card Payment' && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Card Number"
                  maxLength="16"
                  required
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
                />
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    required
                    className="w-1/2 border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    maxLength="3"
                    required
                    className="w-1/2 border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  required
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
                />
              </div>
            )}

            {/* ✅ Net Banking */}
            {paymentMethod === 'Net Banking' && (
              <div className="space-y-3 text-sm">
                <select
                  required
                  className="w-full border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="">Select Bank</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="sbi">SBI Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="axis">Axis Bank</option>
                </select>
              </div>
            )}

            {/* ✅ Cash On Delivery */}
            {paymentMethod === 'Cash On Delivery' && (
              <p className="text-green-600 text-sm">
                You can pay with cash or card when your order is delivered.
              </p>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">
              Order Summary
            </h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Item</span>
                <span>{item}</span>
              </div>
              <div className="flex justify-between">
                <span>Quantity</span>
                <span>{quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{price * quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>₹{totalPrice - price * quantity}</span>
              </div>
              <div className="flex justify-between font-bold text-blue-600">
                <span>Total Amount</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md">
              <strong>5% Cashback</strong> – Claim now with payment offers!
            </div>

            <h3 className="text-md font-semibold pt-4 border-t">
              Delivery Details
            </h3>
            <div className="space-y-2 text-sm">
              <input
                type="text"
                name="name"
                placeholder="Customer Name"
                required
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <input
                type="tel"
                name="mobile"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                required
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
              />
              <textarea
                name="address"
                rows="3"
                placeholder="Delivery Address"
                required
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-emerald-400 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-md font-semibold hover:bg-emerald-700 transition"
            >
              Confirm & Pay ₹{totalPrice}
            </button>
          </div>
        </div>
      </form>

      {/* Toast container */}
      <Toaster />
    </>
  );
};

export default Payment;
