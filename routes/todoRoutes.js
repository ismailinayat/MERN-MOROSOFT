import express  from 'express';
import {createTodo, getAllTodos, deleteTodo}  from './../controllers/todoController.js';
import {protect}  from './../controllers/authController.js';

const router = express.Router();


router.post('/', protect, createTodo);
router.get('/', getAllTodos);
router.delete('/:id', deleteTodo);


export default router;