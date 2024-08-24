import { connectDB } from '../config/database.js';

export async function getAllPosts() {
  const db = await connectDB();
  return db.all('SELECT * FROM posts');
}

export async function getPostById(id) {
  const db = await connectDB();
  return db.get('SELECT * FROM posts WHERE id = ?', [id]);
}

export async function createPost(post) {
  const db = await connectDB();
  const { title, content } = post;
  return db.run('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
}

export async function updatePost(id, post) {
  const db = await connectDB();
  const { title, content } = post;
  return db.run('UPDATE posts SET title = ?, content = ? WHERE id = ?', [title, content, id]);
}

export async function deletePost(id) {
  const db = await connectDB();
  return db.run('DELETE FROM posts WHERE id = ?', [id]);
}
