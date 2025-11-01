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
      const message = err.response?.data?.message;
      if (message?.includes('email')) return rejectWithValue('duplicateEmail');
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
      console.log("OTP Verification ERR", err)
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
      return res.data?.data || res.data?.user || null;
    } catch (err) {
      const message = err.response?.data?.message;
      if (message?.includes('duplicate key'))
        return rejectWithValue('duplicateEmail');
      return rejectWithValue(message || 'Signup failed');
    }
  }
);

// ========== LOGIN ==========
export const login = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/api/v1/user/login`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });
      return 'loginSuccess';
    } catch (err) {
      console.log("Login ERR", err)
      return rejectWithValue('loginFail');
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

      if (res.data && res.data.data) {
        return res.data.data;
      } else {
        return rejectWithValue('User data not found in response');
      }
    } catch (error) {
      console.error('❌ getUser API Error:', error);
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user'
      );
    }
  }
);

// ========== UPDATE PASSWORD ==========
export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/update-password`,
        data,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update password'
      );
    }
  }
);

// ========== SLICE ==========
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    sendOtp: { loading: false, status: null, error: null },
    verifyOtp: { loading: false, status: null, error: null },
    signup: { loading: false, status: null, error: null },
    login: { loading: false, status: null, error: null },
    getUser: { loading: false, status: null, error: null },
    updatePassword: { loading: false, status: null, error: null },
  },

  reducers: {
    logout: (state) => {
      state.user = null;
    },
    resetAuthState: (state, action) => {
      const key = action.payload;
      if (state[key])
        state[key] = { loading: false, status: null, error: null };
    },
  },

  extraReducers: (builder) => {
    // ----- SEND OTP -----
    builder
      .addCase(sendOtp.pending, (state) => {
        state.sendOtp.loading = true;
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.sendOtp.loading = false;
        state.sendOtp.status = action.payload;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.sendOtp.loading = false;
        state.sendOtp.error = action.payload;
      });

    // ----- VERIFY OTP -----
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.verifyOtp.loading = true;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.verifyOtp.loading = false;
        state.verifyOtp.status = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.verifyOtp.loading = false;
        state.verifyOtp.error = action.payload;
      });

    // ----- SIGNUP -----
    builder
      .addCase(signup.pending, (state) => {
        state.signup.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signup.loading = false;
        state.signup.status = 'success';
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signup.loading = false;
        state.signup.error = action.payload;
      });

    // ----- LOGIN -----
    builder
      .addCase(login.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(login.fulfilled, (state) => {
        state.login.loading = false;
        state.login.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      });

    // ----- GET USER -----
    builder
      .addCase(getUser.pending, (state) => {
        state.getUser.loading = true;
        state.getUser.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.getUser.loading = false;
        state.getUser.status = 'success';
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.getUser.loading = false;
        state.getUser.status = 'failed';
        state.getUser.error = action.payload;
      });

    // ----- UPDATE PASSWORD -----
    builder
      .addCase(updatePassword.pending, (state) => {
        state.updatePassword.loading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.updatePassword.loading = false;
        state.updatePassword.status = 'success';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.updatePassword.loading = false;
        state.updatePassword.error = action.payload;
      });
  },
});

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
