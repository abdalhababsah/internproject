import { useState, useEffect } from 'react';

function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);
  const [acceptedFriends, setAcceptedFriends] = useState([]);

  useEffect(() => {
    // Fetch pending friend requests
    let userId = sessionStorage.getItem('userId');

    fetch(`http://127.0.0.1:8000/api/pending-requests/${userId}`)
      .then(response => response.json())
      .then(data => {
        setFriendRequests(data.pendingRequests.map(request => ({
          id: request.user_id,
          name: request.sender_name,
          picture: { img: request.sender_image != null ? 'http://127.0.0.1:8000/user/' + request.sender_image : 'https://pbs.twimg.com/profile_images/446867705560190977/esTJZMLH.png' },
          reqId: request.friend_request_id
        })));
      });

    // Fetch accepted friends
    fetch(`http://127.0.0.1:8000/api/friends/${userId}`)
      .then(response => response.json())
      .then(data => {
        setAcceptedFriends(data.friends.map(friend => ({
          id: friend.user_id,
          name: friend.name,
          img: friend.img != null ? 'http://127.0.0.1:8000/user/' + friend.img : 'https://pbs.twimg.com/profile_images/446867705560190977/esTJZMLH.png',
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
    <>
      <div className="friend-requests">
        <div className='friends_2'>
        <h3>Friend Requests</h3>
        {friendRequests.map((request) => (
          <div key={request.id} className="friend-request-item">
            <div className="friend-request-user">
              <img src={request.picture.img} alt={request.name} />
              <p>{request.name}</p>
            </div>
            <div className="friend-request-actions">
              <button onClick={() => handleAccept(request.reqId)}>Accept</button>
              <button className="reject" onClick={() => handleReject(request.reqId)}>Reject</button>
            </div>
          </div>
        ))}
        </div>
        <div className='friends_2'>
        <h3>Friends </h3>
        {acceptedFriends.map((friend) => (
          <div key={friend.id} className="friend-request-item">
            <div className="friend-request-user">
              <img src={friend.img} alt={friend.name} />
              <p>{friend.name}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default FriendRequests;
