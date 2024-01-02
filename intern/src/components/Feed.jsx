import img from "../images/feed-2.jpg";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Sidebar from './Sidebar';
import FriendRequests from './FriendRequests';

const Feed = () => {
    const [postText, setPostText] = useState('');
    const [postType, setPostType] = useState('text');
    const [posts, setPosts] = useState([]);
    const [showComments, setShowComments] = useState([]);
    const [mediaFile, setMediaFile] = useState(null);
    const [likes, setLikes] = useState([]);

    
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

        try {
            const formData = new FormData();
            formData.append('user_id', userId);
            formData.append('content', postText);
            if (postType !== 'text') {
                formData.append('media_url', mediaFile);
            }

            const response = await axios.post('http://localhost:8000/api/posts', formData, {
                headers: {
                    'X-CSRF-TOKEN': document.head.querySelector('meta[name="csrf-token"]').content,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) {
                console.log(response);
                setPosts([...posts, formData]);

                setPostText('');
                setPostType('text');
                setMediaFile(null);
                // setShowComments([...showComments, false]);
            }
        } catch (error) {
            console.error('Error posting to the API:', error);
        }
    };
    const handleLikeSum = (postId) => {
        axios
          .get(`http://127.0.0.1:8000/api/likes/${postId}`, {
            headers: {
              "X-CSRF-TOKEN": document.head.querySelector(
                'meta[name="csrf-token"]'
              ).content,
            },
          })
          .then((response) => {
            setLikes((prevLikes) => ({...prevLikes, [postId]: response.data}));
          })
          .catch((error) => {
            console.error(error);
          });
      };
      const handleLike = (postId) => {
        
        axios
          .post(
            `http://127.0.0.1:8000/api/likes/`,
            {
              user_id: userId,
              post_id: postId,
            },
            {
              headers: {
                "X-CSRF-TOKEN": document.head.querySelector(
                  'meta[name="csrf-token"]'
                ).content,
              },
            }
          )
          .then((response) => {
            console.log(response.data); // Axios automatically parses the response data as JSON
            // window.location.reload();
          })
          .catch((error) => {
            console.error(error); // Axios handles errors better than fetch
          });
          handleLikeSum(postId);    
      }

    const userId = sessionStorage.getItem('userId');


    useEffect(() => {
        for (let post of posts) {
          handleLikeSum(post.post_id);
        }
      }, [posts]); 

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let userId = sessionStorage.getItem('userId');
                const response = await axios.get('http://localhost:8000/api/posts?id=' + userId);
                
                // Check if response.data.posts is defined and has a length property
                if (response.data.posts && response.data.posts.length) {
                    setPosts(response.data.posts);
                    setShowComments(Array(response.data.posts.length).fill(false));
                   
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
            formData.append('post_id', postId);
            formData.append('reason', reason);    
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
                alert('Post reported successfully')
                // console.log( response.data);
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
                                <img src={post.user?.profile_image_url!=null ? 'http://127.0.0.1:8000/user/'+post.user.profile_image_url: 'https://pbs.twimg.com/profile_images/446867705560190977/esTJZMLH.png'} alt={post.user?.name} />
                                <p>{post.user?.name}</p>
                            </div>
      <div>
        <p>{post.content}</p>
      </div>
      { post.media_url && isImageOrVideo(post.media_url)=='image' &&(
    <div>
        <img src={`http://localhost:8000/posts/${post.media_url}`} alt="Post" />
    </div>
)}
    {isImageOrVideo(post.media_url) === 'video' && (
      <video width="100%" height="auto" controls>
        <source src={`${post.media_url}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )}
                
                <div className="feed__actions">
    <div>
        <i onClick={() => handleLike(post.post_id)} className="fas fa-thumbs-up"></i> {likes[post.post_id]} Likes
    </div>

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

    // const handleComment = (index, commentText) => {
    //     const currentUser = { name: 'ibrahim', picture: 'user_picture_url' };
    //     const updatedPosts = [...posts];
    //     updatedPosts[index].comments.push({ text: commentText, user: currentUser });
    //     setPosts(updatedPosts);
    // };

    // const toggleComments = (index) => {
    //     const updatedShowComments = [...showComments];
    //     updatedShowComments[index] = !updatedShowComments[index];
    //     setShowComments(updatedShowComments);
    // };

 


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
                
 
                            // <form
                            //     className="comment-form"
                            //     onSubmit={(e) => {
                            //         e.preventDefault();
                            //         const commentText = e.target.elements.commentText.value;
                            //         handleComment(index, commentText);
                            //         e.target.reset();
                            //     }}
                            // >
      
                            //     <input
                            //         type="text"
                            //         name="commentText"
                            //         placeholder="Add a comment"
                            //     />
                            //     <button type="submit">Comment</button>
                            // </form>