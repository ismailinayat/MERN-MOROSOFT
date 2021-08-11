import useInputState from './useInputState';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import './register.css'




function Register ({user, setUser}) {
  
  const [name, updateName] = useInputState('');
  const [email, updateEmail] = useInputState('');
  const [password, updatePassword] = useInputState('');




  const register = async (e) => {
    console.log(e.target.email.value)
    try {
      const res = await axios.post('http://localhost:4000/api/users/signup/',
      {name: e.target.name.value, email: e.target.email.value, password: e.target.password.value}, {withCredentials: true})
      console.log(res.data.data)
      window.location.replace("http://localhost:3000");


    } catch(err) {console.log(err.response)};

  }



  const handleSubmit = (e) => {
    e.preventDefault();
    register(e)
  }


  return(
    <div>

      {user.name ? <Redirect to='/'/> : null}

      <div className='register'>
        <h2 className='register__heading'>Register</h2>

        <form  onSubmit={handleSubmit}>

          <div className='register__input--container'>
            <input  name='name' type="text" value={name} placeholder='Enter your name' onChange={updateName}/>
            <label  htmlFor="email">name</label>
          </div>

          <div className='register__input--container'>
            <input  name='email' type="email" value={email} placeholder='Enter your email' onChange={updateEmail}/>
            <label  htmlFor="email">email</label>
          </div>

          <div className='register__input--container'>
            <input name='password' type="password" value={password} placeholder='Enter your password' onChange={updatePassword}/>
            <label  htmlFor="password">password</label>
          </div>

          <button type='Submit'>  Login </button>
        </form>

        
      </div>

    </div>
  )
}

export default Register;

/*
<h5 >Don't have an account? <Link href='/register'><a>Signup now</a></Link></h5>
*/
