import React, { useState } from 'react';

const EditProfileModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  const handleSave = () => {
    // Here you'd typically handle the save logic, like sending data to a server
    onClose(); // Close modal after saving
  };

  const handleProfileImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleBackgroundImageChange = (event) => {
    setBackgroundImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image</label>
          <input type="file" onChange={handleProfileImageChange} />
          {profileImage && <img src={profileImage} alt="Profile Preview" className="mt-2 w-20 h-20 object-cover rounded-full" />}
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">Background Image</label>
          <input type="file" onChange={handleBackgroundImageChange} />
          {backgroundImage && <img src={backgroundImage} alt="Background Preview" className="mt-2 w-full h-20 object-cover rounded" />}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
