/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, logout } from '../Slice/AuthSlice';
import { Button, Modal } from '../Components/index';
import { MapPin, Package, Gift, Lock, LogOut } from 'lucide-react';

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
      <>
        <div className="text-center mt-10 text-red-500">
          <p>Error: {userError}</p>
        </div>
        <div className="text-center m-10">
          <p className="text-gray-600 mb-3">You are not logged in.</p>
          <Button
            onClick={() => navigate('/user/login')}
            variant="primary"
            className="px-6 py-2"
          >
            Go to Login
          </Button>
        </div>
      </>
    );

  if (!user)
    return (
      <div className="text-center m-10">
        <p className="text-gray-600 mb-3">You are not logged in.</p>
        <Button
          onClick={() => navigate('/user/login')}
          variant="primary"
          className="px-6 py-2"
        >
          Go to Login
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* SIDEBAR / TOP NAVIGATION */}
      <aside className="w-full md:w-72 bg-white border-b md:border-r md:border-b-0">
        {/* MOBILE TOP BAR */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <p className="text-gray-800 text-sm font-medium truncate">
              +91 - {user.mobileNumber || '91XXXXXXXXXX'}
            </p>

            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-600 transition"
            >
              <LogOut size={16} /> Logout
            </Button>
          </div>

          {/* MOBILE NAVIGATION */}
          <nav className="flex justify-around items-center px-2 py-3 space-x-2 overflow-x-auto">
            {[
              {
                id: 'addresses',
                icon: <MapPin size={16} />,
                label: 'Addresses',
              },
              { id: 'orders', icon: <Package size={16} />, label: 'Orders' },
              { id: 'gifts', icon: <Gift size={16} />, label: 'Gifts' },
              { id: 'privacy', icon: <Lock size={16} />, label: 'Privacy' },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant="secondary"
                size="sm"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-2 py-1 text-xs font-medium transition ${
                  activeTab === tab.id
                    ? 'text-green-700 border-b-2 border-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </Button>
            ))}
          </nav>
        </div>

        {/* DESKTOP SIDEBAR */}
        <div className="hidden md:flex flex-col h-full">
          <div className="p-6 border-b">
            <p className="text-gray-800 text-sm font-medium truncate">
              +91 - {user.mobileNumber || '91XXXXXXXXXX'}
            </p>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {[
              {
                id: 'addresses',
                icon: <MapPin size={18} />,
                label: 'My Addresses',
              },
              { id: 'orders', icon: <Package size={18} />, label: 'My Orders' },
              { id: 'gifts', icon: <Gift size={18} />, label: 'E-Gift Cards' },
              {
                id: 'privacy',
                icon: <Lock size={18} />,
                label: 'Account Privacy',
              },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'outline' : 'secondary'}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center w-full gap-3 px-4 py-3 text-left font-medium rounded-md transition ${
                  activeTab === tab.id
                    ? 'bg-green-50 text-green-700 border-green-500'
                    : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                }`}
              >
                {tab.icon} {tab.label}
              </Button>
            ))}
          </nav>

          <Button
            onClick={handleLogout}
            variant="danger"
            round="none"
            className="rounded-none flex items-center gap-3 px-6 py-4 border-t font-medium w-full justify-start"
          >
            <LogOut size={18} /> Logout
          </Button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-10">
        {activeTab === 'addresses' && (
          <>
            {addressList.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  You have no saved addresses
                </h2>
                <p className="text-gray-500 mt-1 mb-6 text-sm md:text-base">
                  Tell us where you want your orders delivered
                </p>
                <Button variant="primary" size="md">
                  Add New Address
                </Button>
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
          <div className="text-center text-gray-600 text-sm md:text-base">
            <p>You have no recent orders.</p>
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="text-center text-gray-600 text-sm md:text-base">
            <p>No gift cards available.</p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="text-center text-gray-600 text-sm md:text-base">
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
              variant="primary"
              size="sm"
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
