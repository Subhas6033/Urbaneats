import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Input, Button } from '../Components/index';
import { Lock, Upload } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const { userName } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });
//   const [photo, setPhoto] = useState(null);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/user/profile/${encodeURIComponent(userName)}`,
          { withCredentials: true }
        );
        setProfile(res.data.data);

        // Fetch user orders (replace with actual endpoint)
        const ordersRes = await axios.get(
          `${API_URL}/api/v1/orders/user/${encodeURIComponent(userName)}`,
          { withCredentials: true }
        );
        setOrders(ordersRes.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userName]);

  const handlePasswordChange = async () => {
    if (passwords.newPass !== passwords.confirm) {
      setMessage('New password and confirm password do not match!');
      return;
    }
    try {
      await axios.post(
        `${API_URL}/api/v1/user/update-password`,
        { current: passwords.current, newPass: passwords.newPass },
        { withCredentials: true }
      );
      setMessage('Password updated successfully!');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch (err) {
      setMessage('Failed to update password.');
      console.error(err);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('photo', file);
    try {
      const res = await axios.post(
        `${API_URL}/api/v1/user/upload-photo`,
        formData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setProfile((prev) => ({ ...prev, photo: res.data.data.photo }));
      setMessage('Profile photo updated!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to upload photo.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* User Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white p-6 rounded-2xl shadow">
        <div className="flex flex-col items-center gap-2">
          <img
            src={profile.photo || '/default-avatar.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <input
            type="file"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photoUpload"
          />
          <label
            htmlFor="photoUpload"
            className="cursor-pointer mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" /> Change Photo
          </label>
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
        {message && <p className="text-sm text-red-500">{message}</p>}
        <div className="grid md:grid-cols-3 gap-4">
          <Input
            id="current"
            type="password"
            label="Current Password"
            icon={Lock}
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
          />
          <Input
            id="new"
            type="password"
            label="New Password"
            icon={Lock}
            value={passwords.newPass}
            onChange={(e) =>
              setPasswords({ ...passwords, newPass: e.target.value })
            }
          />
          <Input
            id="confirm"
            type="password"
            label="Confirm Password"
            icon={Lock}
            value={passwords.confirm}
            onChange={(e) =>
              setPasswords({ ...passwords, confirm: e.target.value })
            }
          />
        </div>
        <Button
          onClick={handlePasswordChange}
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          Update Password
        </Button>
      </div>

      {/* Orders Section */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className="space-y-2">
            {orders.map((order) => (
              <li
                key={order._id}
                className="border p-4 rounded-md flex justify-between items-center"
              >
                <div>
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
