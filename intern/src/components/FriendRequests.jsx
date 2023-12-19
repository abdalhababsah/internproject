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
          picture: {img: request.sender_image!=null ? 'http://127.0.0.1:8000/user/'+request.sender_image : 'https://cobaltsettlements.com/wp-content/uploads/2019/03/blank-profile.jpg'},
          reqId: request.friend_request_id
        })));
      });
  }, []);

  const handleAccept = (id) => {
    fetch(`http://127.0.0.1:8000/api/friends/${id}?status=Accepted`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Accepted friend request with ID: ${id}`);
        window.location.reload();
      });
  };

  const handleReject = (id) => {
    fetch(`http://127.0.0.1:8000/api/friends/${id}?status=Rejected`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log(`Rejected friend request with ID: ${id}`);
        window.location.reload();
      });
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
            <button onClick={() => handleAccept(request.reqId)}>Accept</button>
            <button  className="reject" onClick={() => handleReject(request.reqId)}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendRequests;