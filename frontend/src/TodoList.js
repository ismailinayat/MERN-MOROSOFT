import Todo from './Todo';
import './todolist.css';
function TodoList({todos, setTodos, user, setUser}) {

    
    return(
        <div className='todo__list'>
            
            <ul className='todo__list--container'>

                {todos.map((todo) => {
                    return <Todo key={todo.id} todos={todos} setTodos={setTodos} task={todo.task} id={todo.id} user={user} setUser={setUser}/>
                })}
               
            </ul>
        </div>
    )
}

export default TodoList;

/*
 {todos.map((todo) => {
    return <Todo task={todo.task}/>
})}
*/