/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Input, Button } from '../Components/index';
import { Lock, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const {
    register: photoRegister,
    handleSubmit: handlePhotoSubmit,
    watch: watchPhoto,
  } = useForm();

  const selectedPhoto = watchPhoto('profilePhoto');

  // Show preview
  useEffect(() => {
    if (selectedPhoto && selectedPhoto[0]) {
      const file = selectedPhoto[0];
      const previewUrl = URL.createObjectURL(file);
      setPhotoPreview(previewUrl);

      // cleanup
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [selectedPhoto]);

  // Fetch profile & orders
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
        console.error(err);
        toast.error('Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userName]);

  // Password update
  const onPasswordUpdate = async (data) => {
    if (data.newPass !== data.confirmPass) {
      toast.error('New password and confirm password do not match!');
      return;
    }
    try {
      await axios.post(
        `${API_URL}/api/v1/user/update-password`,
        { current: data.current, newPass: data.newPass },
        { withCredentials: true }
      );
      toast.success('Password updated successfully!');
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  // Photo upload
  const onPhotoUpload = async (data) => {
    const file = data.profilePhoto[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePhoto', file); // match backend field name

    try {
      setPhotoUploading(true);
      const res = await axios.post(
        `${API_URL}/api/v1/user/profile/${encodeURIComponent(userName)}/upload-photo`,
        formData,
        {
          withCredentials: true, // only needed if JWT is in cookies
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setProfile((prev) => ({ ...prev, photo: res.data.data.profilePhoto }));
      toast.success('Profile photo updated!');
      setPhotoPreview(null);
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload photo.');
    } finally {
      setPhotoUploading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-2xl shadow">
        <div className="flex flex-col items-center gap-2 relative">
          <img
            src={photoPreview || profile.profilePhoto || '/default-avatar.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <form onSubmit={handlePhotoSubmit(onPhotoUpload)}>
            <input
              type="file"
              {...photoRegister('profilePhoto', { required: true })}
              id="photoUpload"
              className="hidden"
              accept="image/*"
            />
            <label
              htmlFor="photoUpload"
              className="cursor-pointer mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {photoUploading ? 'Uploading...' : 'Change Photo'}
            </label>
            <Button type="submit" className="m-2" children="Change" />
          </form>
        </div>

        <div className="flex-1 space-y-2">
          <h1 className="text-3xl font-bold">{profile.userName}</h1>
          <p>
            <strong>Email:</strong> {profile.email}
          </p>
          <p>
            <strong>Mobile:</strong> {profile.mobileNumber || 'N/A'}
          </p>
        </div>
      </div>

      {/* Password Update */}
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <h2 className="text-xl font-semibold">Update Password</h2>
        <form
          onSubmit={handleSubmit(onPasswordUpdate)}
          className="grid md:grid-cols-3 gap-4"
        >
          <Input
            type="password"
            label="Current Password"
            icon={Lock}
            {...register('current', {
              required: 'Current password is required',
            })}
            error={errors.current?.message}
          />
          <Input
            type="password"
            label="New Password"
            icon={Lock}
            {...register('newPass', { required: 'New password is required' })}
            error={errors.newPass?.message}
          />
          <Input
            type="password"
            label="Confirm Password"
            icon={Lock}
            {...register('confirmPass', {
              required: 'Confirm password is required',
            })}
            error={errors.confirmPass?.message}
          />
          <div className="md:col-span-3">
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </form>
      </div>

      {/* Orders */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
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
                    <td className="p-2">{order._id}</td>
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
    </div>
  );
};

export default Profile;
