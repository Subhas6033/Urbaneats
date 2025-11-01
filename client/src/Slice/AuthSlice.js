import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

// ========== SEND OTP ==========
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
        if (message.includes('email')) {
          return rejectWithValue('duplicateEmail');
        }
      }
      console.error('Send OTP error:', err);
      return rejectWithValue('otpFail');
    }
  }
);

// ========== VERIFY OTP ==========
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
      console.error('Verify OTP error:', err);
      return rejectWithValue('otpInvalid');
    }
  }
);

// ========== SIGNUP ==========
export const signup = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/user/signup`, userData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      const user = res.data?.user;
      if (!user) return rejectWithValue('fail');

      return { status: res.data?.status || 'success', user };
    } catch (err) {
      console.error(
        'Signup Error:',
        err.response?.data?.message || err.message
      );

      if (
        err.response?.data?.message &&
        err.response.data.message.includes('duplicate key')
      ) {
        return rejectWithValue('duplicateEmail');
      }

      return rejectWithValue(err.response?.data?.message || 'Signup failed');
    }
  }
);

// ========== LOGIN ==========
export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/v1/user/login`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      const user = res.data?.user || res.data?.data;
      if (!user) return rejectWithValue('loginFail');

      return { status: 'loggedIn', user };
    } catch (err) {
      console.error('Login Error:', err);
      return rejectWithValue('loginFail');
    }
  }
);

// ========== UPDATE PASSWORD ==========
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (
    { currentPassword, newPassword, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/update-password`,
        { currentPassword, newPassword, confirmPassword },
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update password'
      );
    }
  }
);

// ========== GET USER ==========
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/user/get-user`, {
        withCredentials: true,
      });

      const user = res.data?.user || res.data?.data;
      if (!user) return rejectWithValue('userNotFound');

      return { status: 'fetched', user };
    } catch (err) {
      console.error('Get User Error:', err);
      return rejectWithValue('fetchFail');
    }
  }
);

// ========== SLICE ==========
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: null,
    user: null,
    loading: false,  // for Signup, OTP send, login
    fetchingUser : false,
    passwordStatus: null,
    passwordError: null,
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
      // ===== SEND OTP =====
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

      // ===== VERIFY OTP =====
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

      // ===== SIGNUP =====
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

      // ===== LOGIN =====
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
      })

      // ===== UPDATE PASSWORD =====
      .addCase(updatePassword.pending, (state) => {
        state.passwordStatus = 'loading';
        state.passwordError = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.passwordStatus = 'succeeded';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.passwordStatus = 'failed';
        state.passwordError = action.payload;
      })

      // ===== GET USER =====
      .addCase(getUser.pending, (state) => {
        state.fetchingUser = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.fetchingUser = false;
        state.status = action.payload.status;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.fetchingUser = false;
        state.status = action.payload;
        state.user = null;
      });
  },
});

export const { resetStatus, logout } = authSlice.actions;
export default authSlice.reducer;
