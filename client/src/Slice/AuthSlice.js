import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

//  Send OTP
export const sendOtp = createAsyncThunk(
  'auth/sendOtp',
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/api/v1/user/send-otp`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      return 'otpSent';
    } catch (err) {
      if (err.response?.status === 400) {
        const message = err.response.data.message || '';
        if (message.includes('email')) return rejectWithValue('duplicateEmail');
      }
      console.error(err);
      return rejectWithValue('otpFail');
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/api/v1/user/verify-otp`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      return 'otpVerified';
    } catch (err) {
      console.error(err);
      return rejectWithValue('otpInvalid');
    }
  }
);

// Final Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/user/signup`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.data?.user) {
        return { status: 'success', user: res.data.user };
      }
      return rejectWithValue('fail');
    } catch (err) {
      console.log(err);
      return rejectWithValue('fail');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    user: null,
    loading: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = null;
    },
    logout: (state) => {
      state.user = null;
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // sendOtp
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      // verifyOtp
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.user = action.payload.user;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        state.user = null;
      });
  },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;
