import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { confirmCateringOrder } from '../../Slice/OrderSlice';
import { Helmet } from 'react-helmet-async';

const CateringBookPage = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    eventType: '',
    date: '',
    guests: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.mobile ||
      !formData.eventType ||
      !formData.date
    ) {
      toast.error('⚠️ Please fill in all required fields.');
      return;
    }

    // ✅ Dispatch to Redux
    dispatch(confirmCateringOrder(formData));

    toast.success('🎉 Catering request submitted! We will contact you soon.');

    // Reset form
    setFormData({
      name: '',
      email: '',
      mobile: '',
      eventType: '',
      date: '',
      guests: '',
      notes: '',
    });
  };

  return (
    <>
      <Helmet>
        <title>Urban Eats | Book Catering</title>
        <meta
          name="description"
          content="Easily book catering with Urban Eats for your next event. Choose your menu, set your date, and enjoy fresh, delicious meals delivered with professional service."
        />
      </Helmet>
      <div className="mt-10 px-6 md:px-12 lg:px-24 py-16 bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Book Catering
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Fill out the form below and we’ll reach out to plan your event.
          </p>

          <form onSubmit={handleSubmit} className="grid gap-6">
            {/* Name */}
            <div>
              <label className="block font-medium mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-medium mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="john@example.com"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block font-medium mb-2">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="+91 98765 43210"
                required
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block font-medium mb-2">Event Type *</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              >
                <option value="">Select Event Type</option>
                <option value="Corporate">Corporate</option>
                <option value="Wedding">Wedding</option>
                <option value="Party">Private Party</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block font-medium mb-2">Event Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                required
              />
            </div>

            {/* Guests */}
            <div>
              <label className="block font-medium mb-2">Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g. 100"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block font-medium mb-2">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                rows="4"
                placeholder="Any dietary preferences, menu requests, etc."
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition"
            >
              Submit Request
            </button>
          </form>
        </div>

        {/* Toast container */}
        <Toaster />
      </div>
    </>
  );
};

export default CateringBookPage;
