import React, { useState } from 'react';
import img from "../images/feed-2.jpg";
import Header from './Header';
import Sidebar from './Sidebar';
import FriendRequests from './FriendRequests';

const Feed = () => {
    const [postText, setPostText] = useState('');
    const [postType, setPostType] = useState('text');
    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState(Array(posts.length).fill(false));
    const [mediaFile, setMediaFile] = useState(null);

    const handlePostChange = (event) => {
        setPostText(event.target.value);
    };

    const handlePostTypeChange = (type) => {
        setPostType(type);
    };

    const handleMediaChange = (event) => {
        // Handle file selection for images or videos
        const file = event.target.files[0];
        setMediaFile(file);
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();

        if (postType === 'text' && postText.trim() === '') {
            return; // Don't allow empty text posts
        }

        // In a real application, you would get user information from authentication
        const currentUser = { name: 'ibahim', picture: 'user_picture_url' };

        let newPost;
        if (postType === 'text') {
            newPost = {
                id: posts.length + 1,
                content: postText,
                type: 'text',
                likes: 0,
                comments: [],
                user: currentUser,
            };
        } else if (postType === 'image' || postType === 'video') {
            // In a real application, you would upload the media file to a server and get its URL
            const mediaUrl = URL.createObjectURL(mediaFile);

            newPost = {
                id: posts.length + 1,
                content: mediaUrl,
                type: postType,
                likes: 0,
                comments: [],
                user: currentUser,
            };
        }

        // Add the new post to the posts array with user information
        setPosts([...posts, newPost]);

        // Clear the post input and reset media file
        setPostText('');
        setPostType('text');
        setMediaFile(null);
        // Add a new state for tracking comments visibility
        setShowComments([...showComments, false]);
    };

    const handleLike = (index) => {
        // Increment the likes for the selected post
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
        setPosts(updatedPosts);
    };

    const handleComment = (index, commentText) => {
        // In a real application, you would get user information from authentication
        const currentUser = { name: 'ibrahim', picture: 'user_picture_url' };

        // Add a new comment to the selected post with user information
        const updatedPosts = [...posts];
        updatedPosts[index].comments.push({ text: commentText, user: currentUser });
        setPosts(updatedPosts);
    };

    const toggleComments = (index) => {
        const updatedShowComments = [...showComments];
        updatedShowComments[index] = !updatedShowComments[index];
        setShowComments(updatedShowComments);
    };

    const handleDeletePost = (index) => {
        // In a real application, you might want to confirm the delete action
        const updatedPosts = posts.filter((_, i) => i !== index);
        setPosts(updatedPosts);
        // Update the comments visibility array
        const updatedShowComments = showComments.filter((_, i) => i !== index);
        setShowComments(updatedShowComments);
    };

    return (
        <>
            <div className="app">
                <Header />
                <div className="app__body">
                    <Sidebar />
                    <div className="feed">

                        <div className="feed__postForm">
                            <textarea
                                placeholder="What's on your mind?"
                                value={postText}
                                onChange={handlePostChange}
                            ></textarea>
                            <div className="feed__postOptions">
                                <label>
                                    <input
                                        type="radio"
                                        name="postType"
                                        value="text"
                                        checked={postType === 'text'}
                                        onChange={() => handlePostTypeChange('text')}
                                    />
                                    Text
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="postType"
                                        value="image"
                                        checked={postType === 'image'}
                                        onChange={() => handlePostTypeChange('image')}
                                    />
                                    Image
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="postType"
                                        value="video"
                                        checked={postType === 'video'}
                                        onChange={() => handlePostTypeChange('video')}
                                    />
                                    Video
                                </label>
                            </div>
                            {postType !== 'text' && (
                                <input type="file" accept="image/*, video/*" onChange={handleMediaChange} />
                            )}
                            <button onClick={handlePostSubmit}>Post</button>
                        </div>

                        {posts.map((post, index) => (
                            <div key={index} className="feed__post">
                                {post.type === 'text' && <p>{post.content}</p>}
                                {post.type === 'image' && <img src={post.content} alt="Post" />}
                                {post.type === 'video' && (
                                    <video width="100%" height="auto" controls>
                                        <source src={post.content} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                <div className="feed__user-info">
                                    <img src={img} alt={post.user.name} />
                                    <p>{post.user.name}</p>
                                </div>

                                <div className="feed__actions">
                                    <button onClick={() => handleLike(index)}>
                                        <i className="fas fa-thumbs-up"></i> {post.likes} Likes
                                    </button>
                                    <button onClick={() => toggleComments(index)}>
                                        <i className="fas fa-comment"></i> {post.comments.length} Comments
                                    </button>
                                    <button onClick={() => handleDeletePost(index)}>
                                        <i className="fas fa-trash"></i> Delete
                                    </button>
                                </div>

                                {showComments[index] && (
                                    <div className="feed__comments">
                                        {post.comments.map((comment, commentIndex) => (
                                            <div key={commentIndex} className="feed__comment">
                                                <div className="feed__user-info">
                                                    <img
                                                        src={img}
                                                        alt={comment.user.name}
                                                    />
                                                    <p>{comment.user.name}</p>
                                                </div>
                                                <p>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Add a form for submitting comments */}
                                <form
                                    className="comment-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const commentText = e.target.elements.commentText.value;
                                        handleComment(index, commentText);
                                        e.target.reset();
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="commentText"
                                        placeholder="Add a comment"
                                    />
                                    <button type="submit">Comment</button>
                                </form>
                            </div>
                        ))}
                    </div>
                    <FriendRequests />
                </div>
            </div>
        </>
    );
};

export default Feed;
