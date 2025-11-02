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
import { Button } from '../index';

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
          {/*  Quantity Counter */}
          <div className="flex items-center gap-4 mt-4">
            <Button
              onClick={handleDecrease}
              variant="secondary"
              size="sm"
              round="full"
              disabled={quantity === 1}
              className="p-2"
            >
              <Minus className="w-4 h-4" />
            </Button>

            <span className="text-lg font-semibold">{quantity}</span>

            <Button
              onClick={handleIncrease}
              variant="green"
              size="sm"
              round="full"
              className="p-2"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/*  Total Price */}
          <div className="mt-4 text-center font-bold text-gray-900 flex items-center justify-center gap-1">
            <IndianRupee className="w-4 h-4" /> {totalPrice}
          </div>

          {/* Go to Checkout */}
          <Button
            onClick={handleGoToCheckout}
            variant="primary"
            size="md"
            round="lg"
            className="mt-4 flex items-center gap-2"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Button>
        </>
      ) : (
        <Button
          onClick={handleAddToCart}
          variant="danger"
          size="md"
          round="lg"
          className="mt-4 flex items-center gap-2 transition-all ease-in-out duration-500"
        >
          <ShoppingCart className="w-4 h-4" /> Add to Cart
        </Button>
      )}
    </div>
  );
};

export default MenuCard;
