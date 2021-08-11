import {useEffect} from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import NewTodoForm from './NewTodoForm';
import './home.css';



function Home({inputText, setInputText, todos, setTodos, user, setUser}) {

  useEffect(() => {
    async function getTodos() {
      const todos = await axios.get(`http://localhost:4000/api/users/user/${user._id}`, {withCredentials: true})
      console.log(todos.data.data.user.todos)
      setTodos(todos.data.data.user.todos)
    }
    getTodos();
  },[user._id, setTodos])

//console.log(user)
  return(

    <div>
        <h1 className='todo__list--heading'>Todo List!</h1>
        <NewTodoForm inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} user={user} setUser={setUser}/>
        <TodoList todos={todos} setTodos={setTodos} user={user} setUser={setUser}/>
    </div>
      

  );
}

export default Home;
