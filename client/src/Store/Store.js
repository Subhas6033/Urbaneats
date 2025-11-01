import { configureStore, combineReducers } from '@reduxjs/toolkit';
import orderReducer from '../Slice/OrderSlice';
import authReducer from '../Slice/AuthSlice';

// Combine reducers
const rootReducer = combineReducers({
  order: orderReducer,
  auth: authReducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
