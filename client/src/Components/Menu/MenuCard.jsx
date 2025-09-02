import React, { useState } from 'react';
import {
  IndianRupee,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart, updateQuantity } from '../../Slice/OrderSlice.js';
import { useNavigate } from 'react-router-dom';

const MenuCard = ({ image, name, price, description }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    const initialQty = 1;
    setQuantity(initialQty);
    dispatch(
      addToCart({ item: name, quantity: initialQty, totalPrice: price, price })
    );
  };

  const handleGoToCheckout = () => {
    navigate('/payment', {
      state: {
        item: name,
        price,
        quantity,
        totalPrice: price * quantity,
      },
    });
  };

  const totalPrice = price * quantity;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center">
      {image && (
        <img
          loading="lazy"
          src={image}
          alt={name}
          className="w-full h-80 object-cover rounded-xl mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-emerald-600">{name}</h3>

      <div className="mt-2 text-gray-700 font-medium flex items-center gap-1">
        <IndianRupee className="w-4 h-4" /> {price}
      </div>

      <div className="mt-2 text-gray-900 text-sm text-center line-clamp-3">
        {description}
      </div>

      {quantity > 0 ? (
        <>
          {/* Quantity Counter */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleDecrease}
              disabled={quantity === 1}
              className={`p-2 rounded-full transition ${
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

          {/* Total Price */}
          <div className="mt-4 text-center font-bold text-gray-900 flex items-center justify-center gap-1">
            <IndianRupee className="w-4 h-4" /> {totalPrice}
          </div>

          {/* Go to Checkout */}
          <button
            onClick={handleGoToCheckout}
            className="mt-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-all"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:cursor-pointer transition-all ease-in-out duration-500"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </button>
      )}
    </div>
  );
};

export default MenuCard;
