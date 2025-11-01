/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../Slice/AuthSlice';
import { Input, Button, Modal } from '../Components/index';
import { Upload, Lock, LogOut, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const [orders, setOrders] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [address, setAddress] = useState('');
  const [savingAddress, setSavingAddress] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    title: '',
    message: '',
  });

  const { register, handleSubmit, reset } = useForm();
  const {
    register: photoRegister,
    handleSubmit: handlePhotoSubmit,
    watch: watchPhoto,
  } = useForm();

  const selectedPhoto = watchPhoto('profilePhoto');

  // ✅ Load user
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // ✅ Pre-fill address
  useEffect(() => {
    if (user?.address) setAddress(user.address);
  }, [user]);

  // ✅ Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.userName) return;
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/orders/user/${encodeURIComponent(user.userName)}`,
          { withCredentials: true }
        );
        setOrders(res.data?.data || []);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };
    fetchOrders();
  }, [user]);

  // ✅ Image preview
  useEffect(() => {
    if (selectedPhoto && selectedPhoto[0]) {
      const file = selectedPhoto[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [selectedPhoto]);

  // ✅ Save address
  const handleSaveAddress = async () => {
    if (!address.trim()) {
      setFeedbackModal({
        open: true,
        title: 'Error',
        message: 'Please enter a valid address before saving.',
      });
      return;
    }

    try {
      setSavingAddress(true);
      await axios.post(
        `${API_URL}/api/v1/user/update-address`,
        { address },
        { withCredentials: true }
      );
      dispatch(getUser());
      setFeedbackModal({
        open: true,
        title: 'Success',
        message: 'Address updated successfully!',
      });
    } catch (err) {
      setFeedbackModal({
        open: true,
        title: 'Error',
        message:
          err.response?.data?.message ||
          'Failed to update address. Please try again.',
      });
    } finally {
      setSavingAddress(false);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      dispatch(logout());
      navigate('/user/login');
    }
  };

  // ✅ Update password
  const onPasswordUpdate = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return setFeedbackModal({
        open: true,
        title: 'Error',
        message: 'New Password and Confirm Password must match.',
      });
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/user/update-password`,
        data,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      setFeedbackModal({
        open: true,
        title: 'Success',
        message: response.data?.message || 'Password updated successfully!',
      });
      reset();
      setPasswordModal(false);
    } catch (err) {
      setFeedbackModal({
        open: true,
        title: 'Error',
        message:
          err.response?.data?.message ||
          'Failed to update password. Please try again.',
      });
    }
  };

  // ✅ Upload photo
  const onPhotoUpload = async (data) => {
    const file = data.profilePhoto?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePhoto', file);

    try {
      setPhotoUploading(true);
      await axios.post(`${API_URL}/api/v1/user/upload-photo`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dispatch(getUser());
      setPhotoPreview(null);
    } catch (err) {
      setFeedbackModal({
        open: true,
        title: 'Error',
        message:
          err.response?.data?.message ||
          'Failed to upload photo. Please try again.',
      });
    } finally {
      setPhotoUploading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  if (!user)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 mb-3">You are not logged in.</p>
        <Button
          onClick={() => navigate('/user/login')}
          className="bg-teal-500 text-white px-6 py-2 rounded-md"
        >
          Go to Login
        </Button>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* PROFILE CARD */}
      <section className="rounded-2xl shadow bg-white">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* PHOTO */}
          <div className="flex flex-col items-center w-full md:w-1/3">
            <img
              src={photoPreview || user.profilePhoto || '/default-avatar.png'}
              alt={`${user.userName || 'User'} profile`}
              className="w-32 h-32 rounded-full object-cover border border-gray-200 shadow-sm"
            />

            <form
              onSubmit={handlePhotoSubmit(onPhotoUpload)}
              className="mt-4 flex flex-col items-center gap-4 p-2"
            >
              <input
                type="file"
                {...photoRegister('profilePhoto', { required: true })}
                id="photoUpload"
                className="hidden"
                accept="image/*"
              />
              <label
                htmlFor="photoUpload"
                className="flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100 transition cursor-pointer text-sm font-medium"
              >
                <Upload size={16} />
                {photoUploading ? 'Uploading...' : 'Change Photo'}
              </label>
              {selectedPhoto && (
                <Button
                  type="submit"
                  disabled={photoUploading}
                  className="bg-teal-500 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-teal-600 transition flex items-center gap-2"
                >
                  {photoUploading && (
                    <Loader2 size={16} className="animate-spin" />
                  )}
                  Save
                </Button>
              )}
            </form>
          </div>

          {/* INFO */}
          <div className="flex-1 w-full space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold text-teal-700">
              {user.userName}
            </h1>
            <div className="text-gray-700 space-y-1">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Mobile:</strong> {user.mobileNumber || 'N/A'}
              </p>
            </div>

            {/* Address */}
            <div className="flex flex-col md:flex-row md:items-end gap-3 pt-2">
              <div className="flex-1">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-600 mb-1"
                >
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                />
              </div>
              <Button
                onClick={handleSaveAddress}
                disabled={savingAddress}
                className="bg-teal-500 text-white rounded-md px-6 py-2 text-sm font-medium hover:bg-teal-600 transition whitespace-nowrap flex items-center gap-2"
              >
                {savingAddress && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                Save
              </Button>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
              <Button
                onClick={() => setPasswordModal(true)}
                className="flex items-center gap-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm font-medium"
              >
                <Lock size={16} /> Change Password
              </Button>
              <Button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 text-white hover:bg-red-600 rounded-lg px-4 py-2 text-sm font-medium"
              >
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ORDERS */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">
          Your Orders
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Order ID</th>
                  <th className="p-2 text-left">Total</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-2 font-medium text-gray-800">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="p-2">${order.total}</td>
                    <td className="p-2">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 capitalize">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PASSWORD MODAL */}
      {passwordModal && (
        <Modal onClose={() => setPasswordModal(false)} title="Change Password">
          <form onSubmit={handleSubmit(onPasswordUpdate)} className="space-y-4">
            <Input
              type="password"
              placeholder="Current Password"
              {...register('currentPassword', { required: true })}
            />
            <Input
              type="password"
              placeholder="New Password"
              {...register('newPassword', { required: true })}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', { required: true })}
            />
            <Button
              type="submit"
              className="bg-teal-500 text-white w-full hover:bg-teal-600"
            >
              Update Password
            </Button>
          </form>
        </Modal>
      )}

      {/* FEEDBACK MODAL */}
      {feedbackModal.open && (
        <Modal
          title={feedbackModal.title}
          onClose={() => setFeedbackModal((prev) => ({ ...prev, open: false }))}
        >
          <p className="text-gray-700">{feedbackModal.message}</p>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() =>
                setFeedbackModal((prev) => ({ ...prev, open: false }))
              }
              className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600"
            >
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
