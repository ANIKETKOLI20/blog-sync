import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2 flex items-center">
            <Link to={`/posts/${post.id}`} className="text-blue-600 hover:underline">
              {post.title}
            </Link>
            <button 
              onClick={() => handleDelete(post.id)} 
              className="ml-4 text-red-600 hover:text-red-800"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <Link 
              to={`/create/${post.id}`} 
              className="ml-2 text-yellow-600 hover:text-yellow-800"
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/create" className="mt-4 inline-block text-white bg-blue-600 px-4 py-2 rounded">
        Create New Post
      </Link>
    </div>
  );
}

export default PostList;
