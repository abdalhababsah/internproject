import React from 'react';
import img from "../images/feed-5.jpg";
import img1 from "../images/feed-7.jpg";

const FriendRequests = () => {
  // Dummy data for friend requests (replace with actual data)
  const friendRequests = [
    { id: 1, name: 'mohannad', picture: {img} },
    { id: 2, name: 'Allawi', picture: {img1} },
    // Add more friend request items as needed
  ];

  const handleAccept = (id) => {
    // Handle accept action
    console.log(`Accepted friend request with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject action
    console.log(`Rejected friend request with ID: ${id}`);
  };

  return (
    <div className="friend-requests">
      <h3>Friend Requests</h3>
      {friendRequests.map((request) => (
        <div key={request.id} className="friend-request-item">
          <div className="friend-request-user">
            <img src={img} alt={request.name} />
            <p>{request.name}</p>
          </div>
          <div className="friend-request-actions">
            <button onClick={() => handleAccept(request.id)}>Accept</button>
            <button  className="reject" onClick={() => handleReject(request.id)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendRequests;
