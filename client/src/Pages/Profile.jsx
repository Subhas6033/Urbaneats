/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input, Button, Modal } from '../Components/index';
import { Upload, Lock, LogOut } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const { userName } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [address, setAddress] = useState('');

  const { register, handleSubmit, reset } = useForm();
  const {
    register: photoRegister,
    handleSubmit: handlePhotoSubmit,
    watch: watchPhoto,
  } = useForm();

  const selectedPhoto = watchPhoto('profilePhoto');

  const handleSaveAddress = () => {};

  // Preview photo
  useEffect(() => {
    if (selectedPhoto && selectedPhoto[0]) {
      const file = selectedPhoto[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [selectedPhoto]);

  // Fetch profile and orders
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/user/profile/${encodeURIComponent(userName)}`,
          { withCredentials: true }
        );
        setProfile(res.data.data);
        const ordersRes = await axios.get(
          `${API_URL}/api/v1/orders/user/${encodeURIComponent(userName)}`,
          { withCredentials: true }
        );
        setOrders(ordersRes.data.data || []);
      } catch (err) {
        toast.error('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userName]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/v1/user/logout`,
        {},
        { withCredentials: true }
      );

      // Clear local state
      setProfile(null);
      setOrders([]);
      setPhotoPreview(null);

      toast.success('Logged out successfully!');
      navigate('/user/login');
    } catch (err) {
      toast.error('Failed to log out from server. Clearing session locally.');
      setProfile(null);
      setOrders([]);
      setPhotoPreview(null);
      navigate('/user/login');
    }
  };

  // Password update
  const onPasswordUpdate = async (data) => {
    if (data.newPass !== data.confirmPass) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await axios.post(
        `${API_URL}/api/v1/user/update-password`,
        { current: data.current, newPass: data.newPass },
        { withCredentials: true }
      );
      toast.success('Password updated!');
      reset();
      setPasswordModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  // Photo upload
  const onPhotoUpload = async (data) => {
    const file = data.profilePhoto[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('profilePhoto', file);
    try {
      setPhotoUploading(true);
      const res = await axios.post(
        `${API_URL}/api/v1/user/profile/${encodeURIComponent(
          userName
        )}/upload-photo`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setProfile((prev) => ({
        ...prev,
        profilePhoto: res.data.data.profilePhoto,
      }));
      toast.success('Profile photo updated!');
      setPhotoPreview(null);
    } catch (err) {
      toast.error('Failed to upload photo.');
    } finally {
      setPhotoUploading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* PROFILE HEADER */}
      <section className="rounded-2xl shadow bg-white">
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar & Upload */}
          <div className="flex flex-col items-center md:items-center w-full md:w-1/3">
            <img
              src={
                photoPreview || profile?.profilePhoto || '/default-avatar.png'
              }
              alt={`${profile?.userName || 'User'} profile`}
              className="w-32 h-32 rounded-full object-cover border border-gray-200 shadow-sm"
            />
            <form
              onSubmit={handlePhotoSubmit(onPhotoUpload)}
              className="mt-4 flex flex-col items-center md:items-center gap-5 p-2"
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
                  className="bg-teal-500 text-white rounded-lg px-5 py-2 text-sm font-medium hover:bg-teal-600 transition"
                >
                  Save
                </Button>
              )}
            </form>
          </div>

          {/* Profile Details */}
          <div className="flex-1 w-full space-y-4 text-center md:text-left">
            <h1 className="text-3xl font-bold text-teal-700">
              {profile?.userName}
            </h1>

            <div className="text-gray-700 space-y-1">
              <p>
                <strong className="font-medium">Email:</strong> {profile?.email}
              </p>
              <p>
                <strong className="font-medium">Mobile:</strong>{' '}
                {profile?.mobileNumber || 'N/A'}
              </p>
            </div>

            {/* Address & Save */}
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
                  value={profile?.address || ''}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400"
                />
              </div>
              <Button
                onClick={handleSaveAddress}
                className="bg-teal-500 text-white rounded-md px-6 py-2 text-sm font-medium hover:bg-teal-600 transition whitespace-nowrap"
              >
                Save
              </Button>
            </div>

            {/* Action Buttons */}
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

      {/* Loyalty + Recent Orders and Orders Table remain unchanged */}

      {/* Loyalty + Recent Orders */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-teal-700">
            Loyalty Rewards
          </h2>
          <p className="text-lg">
            Points:{' '}
            <span className="font-bold text-teal-600">
              {profile?.points || 0}
            </span>
          </p>
          <Button className="mt-2 bg-teal-500 text-white hover:bg-teal-600">
            Redeem Rewards
          </Button>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2 text-teal-700">
            Recent Orders
          </h2>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul className="divide-y">
              {orders.slice(0, 3).map((order) => (
                <li key={order._id} className="py-2 flex justify-between">
                  <div>
                    <p className="font-medium">#{order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.total}</p>
                    <p className="text-sm capitalize">{order.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-teal-700">All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
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
                  <tr key={order._id} className="border-t">
                    <td className="p-2">#{order._id.slice(-6)}</td>
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

      {/* Password Modal */}
      {passwordModal && (
        <Modal onClose={() => setPasswordModal(false)} title="Change Password">
          <form onSubmit={handleSubmit(onPasswordUpdate)} className="space-y-4">
            <Input
              type="password"
              placeholder="Current Password"
              {...register('current', { required: true })}
            />
            <Input
              type="password"
              placeholder="New Password"
              {...register('newPass', { required: true })}
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPass', { required: true })}
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
    </div>
  );
};

export default Profile;
