import React, { useState } from 'react';
import { IndianRupee, Plus, Minus, ShoppingCart, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity, confirmOrder } from '../../Slice/OrderSlice.js';

const MenuCard = ({ image, name, price, description }) => {
  const [quantity, setQuantity] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    dispatch(updateQuantity({ item: name, quantity: newQty, price }));
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(updateQuantity({ item: name, quantity: newQty, price }));
    }
  };

  const totalPrice = price * quantity;

  const handleAddToCart = () => {
    setQuantity(1);
    dispatch(addToCart({ item: name, quantity: 1, totalPrice: price, price }));
  };

  const handleOrderNow = () => {
    setIsModalOpen(true);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderDetails = {
      item: name,
      quantity,
      totalPrice,
      customerName: formData.get('name'),
      mobile: formData.get('mobile'),
      address: formData.get('address'),
    };

    dispatch(confirmOrder(orderDetails));

    setIsModalOpen(false);
    setQuantity(0);
    alert('✅ Order Confirmed!');
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center">
      {image && (
        <img
          loading='lazy'
          src={image}
          alt={name}
          className="w-full h-80 object-cover rounded-xl mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-emerald-600">{name}</h3>

      {/* Base Price */}
      <div className="mt-2 text-gray-700 font-medium flex items-center gap-1">
        <IndianRupee className="w-4 h-4" /> {price}
      </div>
      {/* Dish Description */}
      <div className="mt-2 text-gray-900 text-sm text-center line-clamp-3">
        {description}
      </div>

      {/* Quantity Controls */}
      {quantity > 0 ? (
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleDecrease}
            disabled={quantity === 1}
            className={`p-2 rounded-full ${
              quantity === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="text-lg font-semibold">{quantity}</span>

          <button
            onClick={handleIncrease}
            className="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer transition-all ease-in-out duration-500"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      )}

      {/* Total Price */}
      {quantity > 0 && (
        <div className="mt-4 text-center">
          <div className="font-bold text-gray-900 flex items-center justify-center gap-1">
            <IndianRupee className="w-4 h-4" /> {totalPrice}
          </div>

          {/* Order Now Button */}
          <button
            onClick={handleOrderNow}
            className="mt-3 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Order Now
          </button>
        </div>
      )}

      {/* Popup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Confirm Your Order
            </h2>
            <form onSubmit={handleConfirmOrder} className="space-y-4">
              <div>
                <label className="block font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  pattern="[0-9]{10}"
                  className="w-full border p-2 rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium">Address</label>
                <textarea
                  name="address"
                  required
                  rows="3"
                  className="w-full border p-2 rounded-lg"
                ></textarea>
              </div>

              <div className="bg-gray-100 p-3 rounded-lg">
                <p>
                  <strong>Item:</strong> {name}
                </p>
                <p>
                  <strong>Quantity:</strong> {quantity}
                </p>
                <p className="flex items-center gap-1">
                  <strong>Total:</strong> <IndianRupee className="w-4 h-4" />{' '}
                  {totalPrice}
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
