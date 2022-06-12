import { Router } from 'express';
import { isAuthorized } from '../../middlewares/isAuthorized';
import { getUser, login, signUp } from './users.handlers';

export const router = Router();

router.get('/', isAuthorized, getUser);
router.post('/register', signUp);
router.post('/login', login);