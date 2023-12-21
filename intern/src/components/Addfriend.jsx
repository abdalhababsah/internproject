import React, { useState, useEffect } from 'react';
import Header from './Header';
import FriendRequests from './FriendRequests';
import Sidebar from './Sidebar';
import img from '../images/feed-3.jpg';

function Addfriend() {
  const [friends, setFriends] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Fetch user ID from session storage
    const storedUserId = sessionStorage.getItem('userId');
    setUserId(storedUserId);

    // Fetch friends data when the component mounts
    fetchFriends(storedUserId);
  }, []);

  const fetchFriends = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/canSend/${userId}`);
      const data = await response.json();

      // Update state with fetched friends data
      setFriends(data.users);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const sendFriendRequest = async (receiverId) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/send-friend-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender_id: userId,
          receiver_id: receiverId,
        }),
      });
       window.location.reload();
      // Handle the response as needed
      console.log('Friend request sent:', response);

      // You might want to update the UI or handle the response in other ways
    } catch (error) {
      console.error('Error sending friend request:', error);
    }
  };

  return (
    <>
  <div className="app">
    <Header />
    <div className="app__body">
      <Sidebar />
      <div className="w-full grid grid-cols-4  justify-center max-h-40">
        {friends.map((friend) => (
          <div
            key={friend.user_id}
            className="w-64 max-w-2xl m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex-1 p-4"
          >
            <div className="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button"
              >
                <span className="sr-only">Open dropdown</span>
                <img src={img} alt="" />
              </button>
            </div>
            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {friend.name}
              </h5>
              <div className="flex mt-4 md:mt-6">
                <button
                  onClick={() => sendFriendRequest(friend.user_id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-[#19715c] rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add friend
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <FriendRequests />
    </div>
  </div>
</>
  );
}

export default Addfriend;
