import express  from 'express';
import {signup, login, logout, isLoggedIn, getUser}  from './../controllers/authController.js';

const router = express.Router();

router.get('/isLoggedIn', isLoggedIn)
router.get('/logout', logout);

router.post('/signup', signup);
router.post('/login', login);

router.get('/user/:id', getUser)


export default router;