// Profile.jsx#19715c19715c
import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import img from '../images/feed-2.jpg';
import Sidebar from './Sidebar';
import Header from './Header';
import FriendRequests from './FriendRequests';
import EditProfileModal from './EditProfileModal';
const Profile = () => {
  const [postText, setPostText] = useState('');
  const [postType, setPostType] = useState('text');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [posts, setPosts] = useState([]);

  const [user, setuserInfo] = useState([]);
  const [mediaFile, setMediaFile] = useState(null);

  function isImageOrVideo(fileName) {
    // Get the file extension
    if (fileName){
    const extension = fileName.split('.').pop().toLowerCase();
  
    // Check if the file is an image
    if (['jpg', 'png', 'gif', 'bmp'].includes(extension)) {
      return 'image';
    }
    // Check if the file is a video
    else if (['mp4', 'avi', 'mov', 'wmv'].includes(extension)) {
      return 'video';
    }}
    else {
      return 'unknown';
    }
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  let userId = sessionStorage.getItem('userId');

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/users/'+userId)
  .then(response => response.json())
  .then(data => {
    // console.log(data.user[0]);https://cobaltsettlements.com/wp-content/uploads/2019/03/blank-profile.jpg
    setuserInfo({
      // id: request.user_id,
      name: data.user[0].name,
      picture: data.user[0].profile_image_url!=null ? 'http://127.0.0.1:8000/user/'+data.user[0].profile_image_url : 'https://pbs.twimg.com/profile_images/446867705560190977/esTJZMLH.png',
      cover:  data.user[0].cover_image_url!=null ? 'http://127.0.0.1:8000/cover/'+data.user[0].cover_image_url : 'https://th.bing.com/th/id/OIF.rNoVjNQFVaRxTBmJadQMRA?rs=1&pid=ImgDetMain',
      bio: data.user[0].bio
    });
    console.log(data.post);
  setPosts(data.post.map(request => ({
    id:request.post_id,
    content:request.content,
    media:{m:request.media_url!=null ? 'http://localhost:8000/posts/'+request.media_url:''},
    type:isImageOrVideo(request.media_url),
    created:formatDate(request.created_at)
  })));

});
}, [])
  // .catch(error => console.error(error));
// console.log(user);
  const handlePostChange = (event) => {
    setPostText(event.target.value);
  };
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
  };

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleVideoChange = (event) => {
    setVideoFile(event.target.files[0]);
  };
  
  const handleMediaChange = (event) => {
    const file = event.target.files[0];
    setMediaFile(file);
};

  const handlePostSubmit = async (event) => {
    event.preventDefault();

    const mediaUrl = URL.createObjectURL(mediaFile);
    
    let newPost = {
      id: posts.length + 1,
      user_id: userId,
      content: postText,
      media_url: mediaUrl,
      type: postType,
      likes: 0,
      comments: [],
  };

    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('content', newPost.content);
      if (newPost.type !== 'text') {
          formData.append('media_url', mediaFile);
      }
  
      const response = await axios.post('http://localhost:8000/api/posts', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,

      },
      });
  
      if (response.status === 201) {
          setPosts([...posts, newPost]);
  
          setPostText('');
          setPostType('text');
          setMediaFile(null);
          // setShowComments([...showComments, false]);
      }
    } catch (error) {
      console.error('Error posting to the API:', error);
    }

    // if ((postType === 'text' && postText.trim() !== '') || imageFile || videoFile) {
    //   const currentUser = { name: 'ibrahim', picture: img };
    //   let content;

    //   if (postType === 'text') {
    //     content = postText;
    //   } else if (postType === 'image') {
    //     content = URL.createObjectURL(imageFile);
    //   } else if (postType === 'video') {
    //     content = URL.createObjectURL(videoFile);
    //   }

      // setPosts([
      //   ...posts,
      //   { id: posts.length + 1, content, type: postType, user: currentUser, likes: 0, comments: [] },
      // ]);

      // setPostText('');
      // setImageFile(null);
      // setVideoFile(null);
      // setPostType('text');
    // }
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.likes + 1,
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const handleEdit = (postId, content) => {

    fetch(`http://127.0.0.1:8000/api/posts/${postId}`, {
      method: 'PUT',
    })
      .then(response => response.json())
      .then(data => {
        console.log(postId);
        // window.location.reload();
      });
  

    setPostText(content);
    setPostType('text'); // Assuming you want to edit as text
    handleDelete(postId);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  const handleCommentSubmit = (postId, commentText) => {
    const currentUser = { name: 'ibrahim', picture: img };

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { text: commentText, user: currentUser }],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  return (
    <>
      <div className="app bg-[#fff] text-[#171717]">
        <Header />
        <div className="app__body flex">
          <Sidebar />
          <div className="profile flex-1 p-4">
            <img src={user.cover} alt="Profile Wallpaper" className="w-full h-40 object-cover mb-4 rounded-lg" />
            <div className="flex items-center justify-between bg-[#19715c] p-4 rounded-lg mb-4">
              <img src={user.picture} alt="Profile" className="rounded-full w-20 h-20 object-cover mr-4" />
              <div className="flex-1">
              <h2 className="text-xl font-semibold mb-3 text-[#fff]">{user.name}</h2>
              <p>{user.bio}</p>
              </div>
              <button className="bg-[#19715c] hover:bg-[#478298] text-[#d3efe9] px-4 py-2 rounded transition duration-300" onClick={toggleEditModal}>Edit Profile</button>
            </div>
            {showEditModal && <EditProfileModal onClose={toggleEditModal} />}
      <div className="profile__posts mt-4">
      <h3 className="text-xl font-semibold mb-3 text-[#2A3935]">My Posts</h3>
  <div className="profile__postForm bg-[#19715c40] p-4 rounded-lg mb-4">
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="profile__textarea"
              placeholder="What's on your mind?"
              value={postText}
              onChange={handlePostChange}
            ></textarea>
            <div className="flex items-center justify-between">

            <select
              className="profile__select"
              value={postType}
              onChange={handlePostTypeChange}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            {postType !== 'text' && (
                            <input type="file" accept={postType === 'image' ? 'image/*' : 'video/*'} onChange={handleMediaChange} />
                        )}
            {/* {postType === 'image' && (
              <input type="file" accept="image/*" onChange={handleImageChange} />
            )}

            {postType === 'video' && (
              <input type="file" accept="video/*" onChange={handleVideoChange} />
            )} */}

            <button type="submit" className=" bg-[#19715c] px-2 rounded-lg text-white">
              <strong>Post</strong>
            </button></div>
          </form>
        </div>

        {/* {posts.map((post) => (
    <div key={post.id} className="profile__post bg-[#2A3935] p-4 rounded-lg mb-4">
     
      {post.type === 'text' && <p className="profile__post-content text-[#d3efe9]">{post.content}</p>}
      {post.type === 'image' && <img src={post.content} alt="Post" className="w-full h-auto my-2 rounded-lg" />}
      {post.type === 'video' && (
        <video className="w-full h-auto my-2 rounded-lg" controls>[#d3efe9]
          <source src={post.content} type="video/mp4" />bg-
          Your browser does not support the video tag.
        </video>
      )} */}

{posts.map((post) => (
  <div key={post.id} className="profile__post  p-4 rounded-lg mb-4">
    { <div className="feed__user-info">
                                <img src={user.picture} alt={user.name} />
                                <p>{user.name}</p>
                            </div>}
                                {<p className='date'>{post.created}</p>}
    {<p className="profile__post-content text-[#2A3935]">{post.content}</p>}
    {post.type == 'image' && <img src={post.media.m} alt="Post.img" className="w-full h-auto my-2 rounded-lg" />}
    {post.type === 'video' && (
      <video className="w-full h-auto my-2 rounded-lg" controls>
        <source src={post.media.m} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
    <div className="profile__actions flex items-center space-x-2 mt-2">
              <button className="bg-[#19715c] hover:bg-[#478298] text-[#d3efe9] px-2 py-1 rounded transition duration-300" onClick={() => handleLike(post.id)}>
                Like
              </button>
              <span className="text-[#d3efe9]">{post.likes} Likes</span>
              <button className="bg-[#19715c] hover:bg-[#478298] text-[#d3efe9] px-2 py-1 rounded transition duration-300" onClick={() => handleEdit(post.id, post.content)}>
                Edit
              </button>
              <button className="bg-[#19715c] hover:bg-[#478298] text-[#d3efe9] px-2 py-1 rounded transition duration-300" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
  </div>
))}


            {/* 

            <div className="profile__user-info">
              <img src={post.user.picture} alt={post.user.name} className="profile__user-image" />
              <p className="profile__user-name">{post.user.name}</p>
            </div>

            <div className="profile__comments">
              {post.comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="profile__comment">
                  <div className="profile__user-info">
                    <img
                      src={comment.user.picture}
                      alt={comment.user.name}
                      className="profile__user-image"
                    />
                    <p className="profile__user-name">{comment.user.name}</p>
                  </div>
                  <p className="profile__comment-text">{comment.text}</p>
                </div>
              ))}
            </div>

            <form
              className="profile__comment-form"
              onSubmit={(e) => {
                e.preventDefault();
                const commentText = e.target.elements.commentText.value;
                handleCommentSubmit(post.id, commentText);
                e.target.reset();
              }}
            >
              <input
                type="text"
                name="commentText"
                placeholder="Add a comment"
                className="profile__comment-input"
              />
              <button className="profile__comment-button" type="submit">
                Comment
              </button>
            </form>
          </div>
        ))} */}
      </div>
    </div>
    <FriendRequests/>
    </div>
    </div>
    </>
  );
};

export default Profile;
