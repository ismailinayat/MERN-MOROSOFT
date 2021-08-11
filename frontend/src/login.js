import useInputState from './useInputState';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify'
import './login.css';



function LoginForm ({user}) {
  
  
  const [email, updateEmail] = useInputState('');
  const [password, updatePassword] = useInputState('');



  const login = async (e) => {
    try {
      const res = await axios.post('http://localhost:4000/api/users/login/', 
      {email: e.target.email.value, password: e.target.password.value}, {withCredentials: true})
      console.log(res)
      window.location.reload();

    } catch(err) {toast.error(err.response.data.message, {
      position: 'top-right'
    })};

  }



  const handleSubmit = (e) => {
    e.preventDefault();
    login(e)
  }

  return(
    <div className='form__screen'>

    <>
    <ToastContainer>


    </ToastContainer>
    </>
    {user.name ? <Redirect to='/'/> : null}

      <div className='login'>
        <h2 className='login__heading'>Login</h2>
        <form  onSubmit={handleSubmit}>
          <div className='login__input--container'>
            
            <input  name='email' type="email" value={email} placeholder='Enter your email' onChange={updateEmail}/>
            <label  htmlFor="email">email</label>
          </div>

          <div className='login__input--container'>
            
            <input name='password' type="password" value={password} placeholder='Enter your password' onChange={updatePassword}/>
            <label  htmlFor="password">password</label>
          </div>
          <button type='Submit'>  Login </button>
        </form>

        
      </div>

    </div>
  )
}

export default LoginForm;

/*
<h5 >Don't have an account? <Link href='/register'><a>Signup now</a></Link></h5>
*/
