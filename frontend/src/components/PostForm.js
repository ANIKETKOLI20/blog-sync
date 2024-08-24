// PostForm.js
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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}

export default PostForm;
