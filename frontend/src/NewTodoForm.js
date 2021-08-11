import {toast, ToastContainer} from 'react-toastify';
import axios from 'axios';
import './newtodoform.css';



function NewTodoForm({inputText, setInputText, todos, setTodos, user, setUser}) {

    const inputTextHandler = (e) => {
            setInputText(e.target.value);
    }

    const createTodo = async (task) => {
        try {
          const newTodo = await axios.post('http://localhost:4000/api/todos/', 
          {task: task}, {withCredentials: true})
          console.log(newTodo.data.data.newTodo)

          const todos = await axios.get(`http://localhost:4000/api/users/user/${user._id}`)
          console.log(todos)
          setTodos(todos.data.data.user.todos)
          //window.location.reload();
    
        } catch(err) {toast.error(err.response.data.message, {
          position: 'top-right'
        })};
    
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (e.target.task.value === '') {
            toast.error('Todo cannot be empty')
        } else {

            await createTodo(e.target.task.value)
            setInputText('')
        }
    }
    return(
        <div>
            <>
                <ToastContainer>


                </ToastContainer>
            </>
            <div className='new__todo--container'>

            <form onSubmit={handleSubmit}>
                <input name='task' onChange={inputTextHandler} value={inputText} type='text'/>
                <button type='submit'>Add Todo</button>
            </form>
            </div>

        </div>
    )
}

export default NewTodoForm;