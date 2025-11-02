/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../Slice/AuthSlice';
import { Button, Modal } from '../Components/index';
import { MapPin, Package, Gift, Lock, LogOut, Loader2 } from 'lucide-react';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    user,
    getUser: { loading: userLoading, error: userError },
  } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState('addresses');
  const [addressList, setAddressList] = useState([]);
  const [feedbackModal, setFeedbackModal] = useState({
    open: false,
    title: '',
    message: '',
  });

  // Load user data
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  // Fetch address list
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?._id) return;
      try {
        const res = await axios.get(`${API_URL}/api/v1/user/addresses`, {
          withCredentials: true,
        });
        setAddressList(res.data?.addresses || []);
      } catch (err) {
        console.error('Error fetching addresses:', err);
      }
    };
    fetchAddresses();
  }, [user]);

  // Logout
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

  if (userLoading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse">
        Loading profile...
      </p>
    );

  if (userError)
    return (
      <div className="text-center mt-10 text-red-500">
        <p>Error: {userError}</p>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600 mb-3">You are not logged in.</p>
        <Button
          onClick={() => navigate('/user/login')}
          className="bg-green-600 text-white px-6 py-2 rounded-md"
        >
          Go to Login
        </Button>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <p className="text-gray-800 text-sm font-medium">
            +91 - {user.mobileNumber || '91XXXXXXXXXX'}
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-left font-medium transition ${
              activeTab === 'addresses'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <MapPin size={18} /> My Addresses
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-left font-medium transition ${
              activeTab === 'orders'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <Package size={18} /> My Orders
          </button>

          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-left font-medium transition ${
              activeTab === 'gifts'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <Gift size={18} /> E-Gift Cards
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center w-full gap-3 px-4 py-3 rounded-md text-left font-medium transition ${
              activeTab === 'privacy'
                ? 'bg-green-50 text-green-700'
                : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <Lock size={18} /> Account privacy
          </button>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-6 py-4 border-t text-gray-700 hover:bg-red-50 hover:text-red-600 transition font-medium"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-10">
        {activeTab === 'addresses' && (
          <>
            {addressList.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  You have no saved addresses
                </h2>
                <p className="text-gray-500 mt-1 mb-6">
                  Tell us where you want your orders delivered
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">
                  Add New Address
                </button>
              </div>
            ) : (
              <div className="w-full max-w-3xl">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Saved Addresses
                </h2>
                <ul className="space-y-3">
                  {addressList.map((addr, index) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
                    >
                      {addr}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {activeTab === 'orders' && (
          <div className="text-center text-gray-600">
            <p>You have no recent orders.</p>
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="text-center text-gray-600">
            <p>No gift cards available.</p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="text-center text-gray-600">
            <p>Manage your account privacy settings here.</p>
          </div>
        )}
      </main>

      {/* FEEDBACK MODAL */}
      {feedbackModal.open && (
        <Modal
          title={feedbackModal.title}
          onClose={() => setFeedbackModal((p) => ({ ...p, open: false }))}
        >
          <p className="text-gray-700">{feedbackModal.message}</p>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => setFeedbackModal((p) => ({ ...p, open: false }))}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
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
