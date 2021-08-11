import {useState, useEffect} from 'react';
import Home from './Home';
import LoginForm from './login';
import Register from './Register';
import axios from 'axios';
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {

    async function fetchUser() {

      const freshUser = await axios.get('http://localhost:4000/api/users/isLoggedIn/', {withCredentials: true})
    if (freshUser.data.data.freshUser) {
      setUser(freshUser.data.data.freshUser)
      console.log(freshUser)
    } else {
      setUser({});

    }
    
    }
    fetchUser();
    
  },[])

  async function handleLogout() {
    await axios.get('http://localhost:4000/api/users/logout/', {withCredentials: true})
    window.location.replace('/login')
  }


  return(

    <div className='app'>

      {!user.name ? <Redirect to='/login/'/> : null}

      <nav className='app-nav'>
        <div>
        {!user.name ? null : <Link to='/'>Home</Link>}
        </div>
        <div>
        {user.name ? <h4>Logged in as {user.name}</h4> : <Link to='/login'>Login</Link>}
        </div>
        <div>
        {user.name ? null : <Link to='/register'>Register</Link>}
        </div>

        <div>
        {user.name ? <button onClick={handleLogout}>Logout</button> : null}
        </div>
        
        
        
      </nav>
      <Switch>
        <Route exact path='/' render={() => <Home inputText={inputText} setInputText={setInputText} todos={todos} setTodos={setTodos} user={user} setUser={setUser}/>}/>
        <Route exact path='/login' render={(routeProps) => <LoginForm user={user} setUser={setUser} {...routeProps}/>}/>
        <Route exact path='/register' render={() => <Register user={user} setUser={setUser}/>}/>
      </Switch>
    </div>
      

  );
}

export default App;
/*

*/