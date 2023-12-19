import { useState, useEffect } from 'react';

function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    let userId = sessionStorage.getItem('userId');
   
    fetch(`http://127.0.0.1:8000/api/pending-requests/${userId}`)
      .then(response => response.json())
      .then(data => {
        setFriendRequests(data.pendingRequests.map(request => ({
          id: request.user_id,
          name: request.sender_name,
          picture: {img: request.sender_image},
        })));
      });
  }, []);

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
            <img src={request.picture.img} alt={request.name} />
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
}

export default FriendRequests;