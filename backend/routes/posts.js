import express from 'express';
import { listPosts, showPost, addPost, editPost, removePost } from '../controllers/postController.js';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', listPosts);
router.get('/:id', showPost);
router.post('/', [body('title').notEmpty(), body('content').notEmpty()], addPost);
router.put('/:id', [body('title').notEmpty(), body('content').notEmpty()], editPost);
router.delete('/:id', removePost);

export default router;
