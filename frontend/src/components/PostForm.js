import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`)
        .then(response => {
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await axios.put(`/posts/${id}`, { title, content });
      } else {
        await axios.post('/posts', { title, content });
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-8 shadow rounded">
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-lg font-semibold mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        >
          {id ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

export default PostForm;
