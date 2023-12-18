import React, { useState } from 'react';
import PlayerForm from './PlayerForm'; // Make sure this import path is correct
import "./style.css"
// C:\Users\Orange\Desktop\social\friends\src\App.css
const initialPlayers = [
  // This is just sample data, replace with your own
  { id: 1, name: 'Juan Mata', email: 'juan@example.com', password: 'password1', image: 'path_to_image' },
  { id: 2, name: 'Paul Pogba', email: 'paul@example.com', password: 'password2', image: 'path_to_image' },
  // ... more players
];

function PlayerTable() {
  const [players, setPlayers] = useState(initialPlayers);
  const [showModal, setShowModal] = useState(false);
  const [editablePlayer, setEditablePlayer] = useState(null);

  // Create a new player
  const addPlayer = (player) => {
    setPlayers([...players, { ...player, id: players.length + 1 }]);
    setShowModal(false);
  };

  // Update an existing player
  const updatePlayer = (id, updatedPlayer) => {
    setPlayers(players.map((player) => (player.id === id ? updatedPlayer : player)));
    setShowModal(false);
  };

  // Delete a player
  const deletePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  // Set player to be edited
  const editPlayer = (player) => {
    setShowModal(true);
    setEditablePlayer(player);
  };

  return (
    <>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-5">
        <div className="flex justify-between items-center bg-gray-100 py-4 px-6">
          <h2 className="text-2xl text-gray-800 font-bold">Users</h2>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
            onClick={() => { setShowModal(true); setEditablePlayer(null); }}
          >
            Create New
          </button>
        </div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Email</th>
              <th scope="col" className="py-3 px-6">Password</th>
              <th scope="col" className="py-3 px-6">Image</th>
              <th scope="col" className="py-3 px-6">Actions</th>
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
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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
    </>
  );
}

export default PlayerTable;