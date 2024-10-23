import React, { useState, useEffect } from 'react';
import api from '../api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    api.get('/posts?userId=1').then(response => {
      setPosts(response.data);
    });
  }, []);

  const handleCreatePost = () => {
    const newPost = {
      title,
      body,
      userId: 1,
    };
    api.post('/posts', newPost).then(response => {
      setPosts([response.data, ...posts]);
      setTitle('');
      setBody('');
    });
  };

  const handleUpdatePost = () => {
    const updatedPost = {
      title,
      body,
      userId: 1,
    };
    api.put(`/posts/${postId}`, updatedPost).then(response => {
      const updatedPosts = posts.map(post => 
        post.id === parseInt(postId) ? response.data : post
      );
      setPosts(updatedPosts);
      setTitle('');
      setBody('');
      setPostId('');
    });
  };

  const handleDeletePost = (id) => {
    api.delete(`/posts/${id}`).then(() => {
      const remainingPosts = posts.filter(post => post.id !== id);
      setPosts(remainingPosts);
    });
  };

  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
          placeholder="Post ID (for update/delete)"
          className="form-control"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="form-control"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className="form-control"
        />
        <button onClick={handleCreatePost} className="btn btn-primary mt-2">Create Post</button>
        <button onClick={handleUpdatePost} className="btn btn-warning mt-2">Update Post</button>
      </form>
      <ul className="list-group mt-3">
        {posts.map(post => (
          <li key={post.id} className="list-group-item">
            <div>
              <h5>{post.title}</h5>
              <p>{post.body}</p>
              <small>ID: {post.id}</small>
              <button onClick={() => handleDeletePost(post.id)} className="btn btn-danger btn-sm mt-2">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
