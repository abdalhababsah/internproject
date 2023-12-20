import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import PlayerForm from './PlayerForm';
import SidebarAdmin from '../SidebarAdmin'
import './style.css';

const PlayerTable = () => {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editablePlayer, setEditablePlayer] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/users');
        const userData = await response.json();

        // Transform fetched data to match the structure of initialPlayers
        const transformedData = userData.map((user) => ({
          id: user.user_id,
          name: user.name,
          email: user.email,
          password: user.password_hash,
          image: user.profile_image_url || 'default_image_path', // Replace 'default_image_path' with your default image path
        }));

        setPlayers(transformedData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, []); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  const addPlayer = (player) => {
    setPlayers([...players, { ...player, id: players.length + 1 }]);
    setShowModal(false);
  };

  const updatePlayer = (id, updatedPlayer) => {
    setPlayers(players.map((player) => (player.id === id ? updatedPlayer : player)));
    setShowModal(false);
  };

  const deletePlayer = async (id) => {
    try {
      const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
      // Send DELETE request to the API
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
        headers: {
          'X-CSRF-TOKEN': csrfToken,
        },
      });

      // Update state to remove the deleted player
      setPlayers(players.filter((player) => player.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const editPlayer = (player) => {
    setShowModal(true);
    setEditablePlayer(player);
  };

  const logout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to the login page
    // You need to replace '/login' with the actual path to your login page
    window.location.href = '/login';
  };
  
  return (
    <>
          <div className='flex '>  
       <SidebarAdmin/>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-5">
        <div className="flex justify-between items-center bg-gray-100 py-4 px-6">
          <h2 className="text-2xl text-gray-800 font-bold">Users</h2>
          <div className="flex space-x-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 focus:outline-none"
              onClick={() => {
                setShowModal(true);
                setEditablePlayer(null);
              }}
              >
              Create New
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 focus:outline-none"
              onClick={logout}
              >
              Logout
            </button>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Password
              </th>
              <th scope="col" className="py-3 px-6">
                Image
              </th>
              <th scope="col" className="py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="bg-white border-b">
                <td className="py-4 px-6">{player.name}</td>
                <td className="py-4 px-6">{player.email}</td>
                <td className="py-4 px-6">******</td>
                <td className="py-4 px-6">
                  <img src={player.image} alt={player.name} className="w-10 h-10 rounded-full" />
                </td>
                <td className="py-4 px-6 flex space-x-1">
                  <button
                    onClick={() => editPlayer(player)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-900"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deletePlayer(player.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PlayerForm
          player={editablePlayer}
          addPlayer={addPlayer}
          updatePlayer={updatePlayer}
          setShowModal={setShowModal}
        />
        
      )}
      </div>
    </>
  );
};

export default PlayerTable;
