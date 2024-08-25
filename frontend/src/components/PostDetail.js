import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded">
        <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
}

export default PostDetail;
