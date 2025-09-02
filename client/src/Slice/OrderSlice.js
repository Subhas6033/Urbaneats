import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    cart: [],
    confirmedOrders: [],
    cateringOrders: [], 
  },
  reducers: {
    addToCart: (state, action) => {
      const existing = state.cart.find(
        (item) => item.item === action.payload.item
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
        existing.totalPrice += action.payload.totalPrice;
      } else {
        state.cart.push(action.payload);
      }
    },

    updateQuantity: (state, action) => {
      const { item, quantity, price } = action.payload;
      const existing = state.cart.find((i) => i.item === item);
      if (existing) {
        existing.quantity = quantity;
        existing.totalPrice = quantity * price;
      }
    },

    confirmOrder: (state, action) => {
      state.confirmedOrders.push({
        ...action.payload,
        status: 'placed', 
      });
      state.cart = state.cart.filter((i) => i.item !== action.payload.item);
    },

    confirmCateringOrder: (state, action) => {
      state.cateringOrders.push({
        ...action.payload,
        status: 'pending', 
      });
    },
  },
});

export const { addToCart, updateQuantity, confirmOrder, confirmCateringOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
