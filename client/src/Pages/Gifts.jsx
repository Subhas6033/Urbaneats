import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Gift, Send, Heart, CreditCard, Smartphone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { confirmOrder } from '../Slice/OrderSlice';
import { FadeInScale, FadeInUp } from '../Utility/Animation';
import {Helmet} from 'react-helmet-async'

const GiftPage = () => {
  const dispatch = useDispatch();

  const giftOptions = [
    {
      id: 1,
      name: '₹500 Gift Card',
      price: 500,
      description: 'Perfect for any occasion.',
    },
    {
      id: 2,
      name: '₹1000 Gift Card',
      price: 1000,
      description: 'Give the gift of choice.',
    },
    {
      id: 3,
      name: 'Special Dessert Hamper',
      price: 1200,
      description: 'Curated treats for your loved ones.',
    },
  ];

  const [selectedGift, setSelectedGift] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    recipientName: '',
    message: '',
    email: '',
    cardNumber: '',
    upiId: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendGift = () => {
    if (!selectedGift) {
      toast.error('⚠️ Please select a gift first.');
      return;
    }
    if (!formData.recipientName || !formData.email) {
      toast.error('⚠️ Please fill in recipient details.');
      return;
    }
    if (!paymentMethod) {
      toast.error('⚠️ Please select a payment method.');
      return;
    }

    if (paymentMethod === 'card' && !formData.cardNumber) {
      toast.error('⚠️ Please enter card number.');
      return;
    }
    if (paymentMethod === 'upi' && !formData.upiId) {
      toast.error('⚠️ Please enter UPI ID.');
      return;
    }

    const giftOrder = {
      ...formData,
      item: selectedGift.name,
      totalPrice: selectedGift.price,
      type: 'gift',
      paymentMethod,
    };

    dispatch(confirmOrder(giftOrder));
    toast.success('🎉 Gift sent successfully!');

    // reset
    setSelectedGift(null);
    setPaymentMethod('');
    setFormData({
      recipientName: '',
      message: '',
      email: '',
      cardNumber: '',
      upiId: '',
    });
  };

  return (
    <>
      <Helmet>
        <title>Urban Eats | Gifts </title>
        <meta
          name="description"
          content="Stay updated with the latest news from Urban Eats. Discover new menu launches, special promotions, and exciting updates about our journey."
        />
      </Helmet>
      <div className="px-6 md:px-12 lg:px-24 py-16 bg-gradient-to-br from-pink-50 to-red-50 min-h-screen mt-10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <FadeInScale>
            <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl shadow-xl p-10 text-center text-white">
              <h1 className="text-4xl font-extrabold mb-3">Send a Gift 🎁</h1>
              <p className="text-pink-100 mb-6">
                Surprise your loved ones with thoughtful gifts and vouchers.
              </p>
            </div>
          </FadeInScale>

          {/* Gift Options */}
          <FadeInUp>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Gift className="w-6 h-6 text-pink-500" />
                Choose a Gift
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {giftOptions.map((gift) => (
                  <FadeInScale key={gift.id}>
                    <div
                      onClick={() => setSelectedGift(gift)}
                      className={`cursor-pointer rounded-2xl border-2 p-6 shadow-md hover:shadow-xl transition ${
                        selectedGift?.id === gift.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-gray-900">
                        {gift.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {gift.description}
                      </p>
                      <p className="font-bold text-pink-600">₹{gift.price}</p>
                    </div>
                  </FadeInScale>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Recipient Details */}
          <FadeInUp>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart className="w-6 h-6 text-red-500" />
                Recipient Details
              </h2>
              <div className="bg-white shadow-md rounded-2xl p-6 grid gap-6">
                <input
                  type="text"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Recipient's Name"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Recipient's Email"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
                  required
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write a personal message (optional)"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500 outline-none"
                  rows="4"
                />
              </div>
            </div>
          </FadeInUp>

          {/* Payment Section */}
          <FadeInUp>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-purple-500" />
                Payment Method
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <FadeInScale>
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-2 p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition ${
                      paymentMethod === 'card'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    Credit / Debit Card
                  </button>
                </FadeInScale>

                <FadeInScale>
                  <button
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center gap-2 p-4 rounded-xl border-2 shadow-sm hover:shadow-md transition ${
                      paymentMethod === 'upi'
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-green-600" />
                    UPI Payment
                  </button>
                </FadeInScale>
              </div>

              {paymentMethod === 'card' && (
                <FadeInScale>
                  <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="Card Number"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                    />
                  </div>
                </FadeInScale>
              )}
              {paymentMethod === 'upi' && (
                <FadeInScale>
                  <div className="mt-6 bg-white rounded-xl p-6 shadow-md">
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleChange}
                      placeholder="Enter UPI ID (example@upi)"
                      className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                    />
                  </div>
                </FadeInScale>
              )}
            </div>
          </FadeInUp>

          {/* Send Button */}
          <FadeInScale>
            <div className="text-center">
              <button
                onClick={handleSendGift}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:from-pink-600 hover:to-red-600 transition flex items-center justify-center gap-2 mx-auto"
              >
                <Send className="w-5 h-5" /> Pay & Send Gift
              </button>
            </div>
          </FadeInScale>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default GiftPage;
