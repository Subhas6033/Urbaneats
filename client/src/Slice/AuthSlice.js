import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// Send OTP
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
        const message = err.response.data?.message || '';
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

// Signup
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      // Send plain JSON payload without profile photo
      const res = await axios.post(`${API_URL}/api/v1/user/signup`, userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Signup response:', res);

      // Extract the user directly from the backend response
      const user = res.data?.user;
      if (user) {
        return { status: res.data.status, user };
      }

      return rejectWithValue('Signup failed: User data missing in response');
    } catch (err) {
      console.error('Signup Error:', err.response?.data || err.message);
      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);


// Login
export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/user/login`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      const { user } = res.data.data;
      if (user) return { status: 'loggedIn', user };
      return rejectWithValue('loginFail');
    } catch (err) {
      console.error(err);
      return rejectWithValue('loginFail');
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
      state.loading = false;
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
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload.status;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.status = action.payload;
        state.user = null;
      });
  },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;
