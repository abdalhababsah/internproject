import React, { useState, useEffect } from 'react';
import axios from 'axios';
import img from "../images/feed-2.jpg";
import Header from './Header';
import Sidebar from './Sidebar';
import FriendRequests from './FriendRequests';

const Feed = () => {
    const [postText, setPostText] = useState('');
    const [postType, setPostType] = useState('text');
    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [mediaFile, setMediaFile] = useState(null);

    const handlePostChange = (event) => {
        setPostText(event.target.value);
    };

    const handlePostTypeChange = (type) => {
        setPostType(type);
    };

    const handleMediaChange = (event) => {
        const file = event.target.files[0];
        setMediaFile(file);
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();

        if (postType === 'text' && postText.trim() === '') {
            return;
        }

        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            console.error('User ID not found in sessionStorage');
            return;
        }

        const currentUser = { name: 'ibahim', picture: 'user_picture_url' };

        let newPost;
        if (postType === 'text') {
            newPost = {
                id: posts.length + 1,
                user_id: userId,
                content: postText,
                type: 'text',
                likes: 0,
                comments: [],
                user: currentUser,
            };
        } else if (postType === 'image' || postType === 'video') {
            const mediaUrl = URL.createObjectURL(mediaFile);

            newPost = {
                id: posts.length + 1,
                user_id: userId,
                content: postText,
                media_url: mediaUrl,
                type: postType,
                likes: 0,
                comments: [],
                user: currentUser,
            };
        }

        try {
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('content', newPost.content);
            if (newPost.type !== 'text') {
                formData.append('media_url', mediaFile);
            }

            const response = await axios.post('http://localhost:8000/api/posts', formData, {
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                setPosts([...posts, newPost]);

                setPostText('');
                setPostType('text');
                setMediaFile(null);
                setShowComments([...showComments, false]);
            }
        } catch (error) {
            console.error('Error posting to the API:', error);
        }
    };

    const handleLike = (index) => {
        const updatedPosts = [...posts];
        updatedPosts[index].likes += 1;
        setPosts(updatedPosts);
    };

    const handleComment = (index, commentText) => {
        const currentUser = { name: 'ibrahim', picture: 'user_picture_url' };
        const updatedPosts = [...posts];
        updatedPosts[index].comments.push({ text: commentText, user: currentUser });
        setPosts(updatedPosts);
    };

    const toggleComments = (index) => {
        const updatedShowComments = [...showComments];
        updatedShowComments[index] = !updatedShowComments[index];
        setShowComments(updatedShowComments);
    };


    const userId = sessionStorage.getItem('userId');



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let userId = sessionStorage.getItem('userId');
                const response = await axios.get('http://localhost:8000/api/posts?id=' + userId);

                // Check if response.data.posts is defined and has a length property
                if (response.data.posts && response.data.posts.length) {
                    setPosts(response.data.posts);
                    setShowComments(Array(response.data.posts.length).fill(false));
                    console.log(userId);
                } else {
                    console.error('Posts not found in API response');
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [userId]);

    const handleDeletePost = async (postId, index) => {
        try {
            // Send a request to delete the post on the server
            await axios.delete(`http://localhost:8000/api/posts/${postId}`);

            // Update the local state to reflect the deleted post
            const updatedPosts = posts.filter((_, i) => i !== index);
            setPosts(updatedPosts);

            const updatedShowComments = showComments.filter((_, i) => i !== index);
            setShowComments(updatedShowComments);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    }; 
    // Assuming you have the userId from the session
    const handleReportPost = async (postId) => {
        const userId = sessionStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in sessionStorage');
            return;
        }
    
        const reason = prompt('Enter the reason for reporting:');
    
        if (!reason) {
            console.log('Reporting canceled');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('post_id', postId);  // Include the post_id field
            formData.append('reason', reason);
    console.log(postId);
    
            const response = await axios.post(
                'http://localhost:8000/api/reports',
                formData,
                {
                    headers: {
                        'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.status === 201) {
                console.log('Post reported successfully:', response.data);
                // Handle the response data as needed
            } else {
                console.error('Failed to report post. Status:', response.status);
            }
        } catch (error) {
            console.error('Error reporting post:', error);
            console.log('Response data:', error.response.data);
            // Handle errors
        }
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
                        <div className="flex items-center justify-between p-4 rounded-lg mb-4">
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
                            <input type="file" accept={postType === 'image' ? 'image/*' : 'video/*'} onChange={handleMediaChange} />
                        )}
                        
                    
                    <button onClick={handlePostSubmit} className=" bg-[#19715c] px-2 rounded-lg text-white">
              <strong>Post</strong>
          
          
          
            </button></div>               </div>
                    {posts.map((post, index) => (
  <div key={index} className="feed__post">
    <div className="feed__user-info">
                                <img src={post.user.profile_image_url!=null ? 'http://127.0.0.1:8000/user/'+post.user.profile_image_url: 'https://pbs.twimg.com/profile_images/446867705560190977/esTJZMLH.png'} alt={post.user.name} />
                                <p>{post.user.name}</p>
                            </div>
      <div>
        <p>{post.content}</p>
      </div>
      {post.type !== 'text' && post.media_url && (
    <div>
        <img src={`http://localhost:8000/posts/${post.media_url}`} alt="Post" />
    </div>
)}
    {post.type === 'video' && (
      <video width="100%" height="auto" controls>
        <source src={`${post.media_url}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
                
                <div className="feed__actions">
    <button onClick={() => handleLike(index)}>
        <i className="fas fa-thumbs-up"></i> {post.likes} Likes
    </button>

    {userId == post.user_id ? (
        <button onClick={() => handleDeletePost(post.post_id, index)}>
            <i className="fas fa-trash"></i> Delete
        </button>
    ) : (
        <button onClick={() => handleReportPost(post.post_id)}>
    <i className="fas fa-flag"></i> Report
</button>

    )}
</div>                  
                
  


                                {/* {showComments[index] && (
                                    <div className="feed__comments">
                                        {post.comments.map((comment, commentIndex) => (
                                            <div key={commentIndex} className="feed__comment">
                                                <div className="feed__user-info">
                                                    <img src={img} alt={comment.user.name} />
                                                    <p>{comment.user.name}</p>
                                                </div>
                                                <p>{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                )} */}

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
