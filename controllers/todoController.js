import Todo  from './../models/todoModel.js';
import catchAsync  from './../utils/catchAsync.js';
import AppError  from './../utils/appError.js';









const createTodo = catchAsync(async (req, res, next) => {
    const newTodo = await Todo.create({
      //.create is a shortcut for saving one or more documents into a model. MyModel.create(docs) does new MyModel(doc).save() for every doc in docs. Triggers the save() hook.
      task: req.body.task,
      user: req.user,
  
    });
    
    res.status(200).json({
        status: 'success',
        
        data: {
          newTodo
        }
      });
  });

const getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find()

  res.status(200).json({
    status: 'success',
    results: todos.length,
    data: {
      todos
    }
  })
})

const deleteTodo = catchAsync(async (req, res, next) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

  console.log(deletedTodo)

  if (deletedTodo) {
    res.status(200).json({
      status: 'success',
      message: 'sucessfully deleted todo'
    })
  } else {
    next(new AppError('No todo found'))
  }
  
})

  export {createTodo, getAllTodos, deleteTodo}