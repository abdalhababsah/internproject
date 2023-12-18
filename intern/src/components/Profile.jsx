// Profile.jsx
import React, { useState } from 'react';
import img from '../images/feed-2.jpg';
import Sidebar from './Sidebar';
import Header from './Header';
import FriendRequests from './FriendRequests';

const Profile = () => {
  const [postText, setPostText] = useState('');
  const [postType, setPostType] = useState('text');
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [posts, setPosts] = useState([]);

  const handlePostChange = (event) => {
    setPostText(event.target.value);
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

  const handlePostSubmit = (event) => {
    event.preventDefault();

    if ((postType === 'text' && postText.trim() !== '') || imageFile || videoFile) {
      const currentUser = { name: 'ibrahim', picture: img };
      let content;

      if (postType === 'text') {
        content = postText;
      } else if (postType === 'image') {
        content = URL.createObjectURL(imageFile);
      } else if (postType === 'video') {
        content = URL.createObjectURL(videoFile);
      }

      setPosts([
        ...posts,
        { id: posts.length + 1, content, type: postType, user: currentUser, likes: 0, comments: [] },
      ]);

      setPostText('');
      setImageFile(null);
      setVideoFile(null);
      setPostType('text');
    }
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
    <div className="app">
    <Header/>
    <div className="app__body">
    <Sidebar/>
    <div className="profile">
      <img src={img} alt="Profile Wallpaper" className="profile__wallpaper" />
      <div className="profile__user-info">
        <img src={img} alt="Profile" className="profile__image" />
        <p className="profile__username">ibrahim</p>
      </div>

      <div className="profile__posts">
        <h3 className="profile__heading">My Posts</h3>
        <div className="profile__postForm">
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="profile__textarea"
              placeholder="What's on your mind?"
              value={postText}
              onChange={handlePostChange}
            ></textarea>

            <select
              className="profile__select"
              value={postType}
              onChange={handlePostTypeChange}
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            {postType === 'image' && (
              <input type="file" accept="image/*" onChange={handleImageChange} />
            )}

            {postType === 'video' && (
              <input type="file" accept="video/*" onChange={handleVideoChange} />
            )}

            <button type="submit" className="profile__post-button">
              Post
            </button>
          </form>
        </div>

        {posts.map((post) => (
          <div key={post.id} className="profile__post">
            {post.type === 'text' && <p className="profile__post-content">{post.content}</p>}
            {post.type === 'image' && <img src={post.content} alt="Post" />}
            {post.type === 'video' && (
              <video width="100%" height="auto" controls>
                <source src={post.content} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            <div className="profile__actions">
              <button className="profile__like-button" onClick={() => handleLike(post.id)}>
                Like
              </button>
              <span className="profile__like-count">{post.likes} Likes</span>
              <button className="profile__edit-button" onClick={() => handleEdit(post.id, post.content)}>
                Edit
              </button>
              <button className="profile__delete-button" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>

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
        ))}
      </div>
    </div>
    <FriendRequests/>
    </div>
    </div>
    </>
  );
};

export default Profile;
