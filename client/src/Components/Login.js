import React, { useEffect, useState, useRef } from 'react';
import { AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { attemptLogin, attemptRegister } from '../actions/user.action';
import axios from 'axios';

function Login() {
  const [proceed, setProceed] = useState('Continue');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const form = useRef();
  
  useEffect(() => {
    console.log(user);

    if (user.auth) {
      console.log('redirecting to home', user.auth);
      sessionStorage.setItem('signedIn', user.username);
      navigate('/home');
    }
  }, [user, navigate]);


  async function submitForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const username = form.current.username;

    if (proceed === "Continue") {
      const { data } = await axios.post('/auth', { username: username.value });
      if (data.ok && data.data?.found) {
        setProceed('Log in');
        setTimeout(() => form.current.password.focus(), 100);
      } else {
        setProceed('Sign up');
        setTimeout(() => form.current.fullname.focus(), 100);
      }
      username.setAttribute('readonly', 'true');

    } else if (proceed === "Log in") {

      const loginData = {
        username: username.value,
        password: form.current.password.value
      };
      const error = await dispatch(attemptLogin(loginData));
      if (error) console.log(error);

    } else if (proceed === "Sign up") {

      const registerData = {
        username: username.value,
        email: form.current.email.value,
        password: form.current.newpassword.value,
        re_password: form.current.confirmpassword.value,
        fullName: form.current.fullname.value
      };
      const error = await dispatch(attemptRegister(registerData));
      if (error) console.log(error);

    }
    setIsLoading(false);
  }


  return (
    <div className='formPage'>
      <img className='logo' src='/logo.png' alt='logo' />
      <div className='formDiv'>
        <h2 className='mg-l-2'>Login or Get started!</h2>
        <form className='formBody' onSubmit={submitForm} ref={form}>
          <input className='formInput' id='username' name='username' type="text" placeholder='Username' minLength='4' required />
          <div className={proceed === 'Log in' ? 'loginForm active' : 'loginForm'}>
            <input className='formInput' id='password' name='password' type="password" placeholder='Password' />
          </div>
          <div className={proceed === 'Sign up' ? 'signupForm active' : 'signupForm'}>
            <input className='formInput' id='fullname' name='fullname' type="text" placeholder='John Doe' />
            <input className='formInput' id='email' name='email' type="email" placeholder='example@gmail.com' />
            <input className='formInput' id='newpassword' name='newpassword' type="password" placeholder='password' />
            <input className='formInput' id='confirmpassword' name='confirmpassword' type="password" placeholder='confirm password' />
          </div>
          <button className='formBtn btn' disabled={isLoading} type='submit'>{isLoading ? 'processing...' : proceed} <AiOutlineRight size='1rem' /></button>
        </form>
      </div>
    </div>
  )
}


export default Login;