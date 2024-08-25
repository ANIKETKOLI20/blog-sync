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
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Blog Posts</h2>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="p-4 bg-white shadow rounded flex justify-between items-center">
            <Link to={`/posts/${post.id}`} className="text-xl text-blue-600 hover:underline font-semibold">
              {post.title}
            </Link>
            <div className="flex items-center">
              <button 
                onClick={() => handleDelete(post.id)} 
                className="text-red-600 hover:text-red-800 mr-4"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <Link 
                to={`/create/${post.id}`} 
                className="text-yellow-600 hover:text-yellow-800"
              >
                <FontAwesomeIcon icon={faEdit} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center mt-8">
        <Link to="/create" className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700">
          Create New Post
        </Link>
      </div>
    </div>
  );
}

export default PostList;
