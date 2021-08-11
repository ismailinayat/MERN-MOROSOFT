import axios from 'axios';
import './todo.css';

function Todo({task, id, todos, setTodos, user, setUser}) {

    async function handleDelete() {

        const deletedTodo = await axios.delete(`http://localhost:4000/api/todos/${id}`)
        console.log(deletedTodo)
        const todos = await axios.get(`http://localhost:4000/api/users/user/${user._id}`)
        console.log(todos)
        setTodos(todos.data.data.user.todos)
    }
    return(
        <div className='todo__container'>
            <li className='todo__list--item'>{task}</li>
            <button className='todo__delete' onClick={handleDelete}>X</button>
        </div>
    )
}

export default Todo;