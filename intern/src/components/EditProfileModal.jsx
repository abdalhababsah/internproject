import React, { useState } from 'react';
import axios from 'axios';

const EditProfileModal = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);

  let nam=sessionStorage.getItem('userName');
  let userId = sessionStorage.getItem('userId');

    const handleSave = async (event) => {
      event.preventDefault();

      try {
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (profileImage != null) {
            formData.append('profile_media_url', profileImage);
        }
    
        const response = await axios.put('http://localhost:8000/api/users/'+userId, formData,{
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
  
        },
        });
   
      } catch (error) {
        console.error('Error posting to the API:', error);
      }

    onClose(); // Close modal after saving
  };

  const handleProfileImageChange = (event) => {
    // (URL.createObjectURL(event.target.files[0]));setMediaFile
    const file = event.target.files[0];
    setProfileImage(file);
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

        <div className="flex justify-between items-center">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
          </button>
          <button onClick={handleSave} className="bg-[#19715c] hover:bg-[#19715c50] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
