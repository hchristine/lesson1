import { Router } from 'express';
import { isAuthorized } from '../../middlewares/isAuthorized';
import { createComment, deleteComment, updateComment } from './comments.handlers';

export const router = Router();
router.use(isAuthorized);

router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);