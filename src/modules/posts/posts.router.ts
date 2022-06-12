import { Router } from 'express';
import { isAuthorized } from '../../middlewares/isAuthorized';
import { createPost, getPost, updatePost, deletePost } from './posts.handlers';

export const router = Router();
router.use(isAuthorized);

router.post('/', isAuthorized, createPost);
router.get('/', isAuthorized, getPost);
router.put('/:id', isAuthorized, updatePost);
router.delete('/:id', isAuthorized, deletePost);