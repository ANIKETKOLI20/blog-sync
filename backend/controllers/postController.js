import { getAllPosts, getPostById, createPost, updatePost, deletePost } from '../models/postModel.js';
import { validationResult } from 'express-validator';

export async function listPosts(req, res) {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
}

export async function showPost(req, res) {
  try {
    const post = await getPostById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
}

export async function addPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await createPost(req.body);
    res.status(201).json({ message: 'Post created' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating post' });
  }
}

export async function editPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await updatePost(req.params.id, req.body);
    res.json({ message: 'Post updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
}

export async function removePost(req, res) {
  try {
    await deletePost(req.params.id);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
}
