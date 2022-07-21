import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../Components/Search';
import Timeline from '../Components/Timeline';
import Profile from '../Components/Profile';
import ErrorPage from './ErrorPage';
import { refreshUser } from '../actions/user.action';
import './HomePage.css';

export default function HomePage() {
  const executedRef = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const pathname = useParams();

  const signedIn = sessionStorage.getItem('signedIn');
  
  useEffect(() => {
    if (!signedIn) {
      return navigate('/signin')
    };
    
    if (executedRef.current) return;
    
    if (!pathname.username) { navigate('/home') };
    const refresh = async () => {
      const error = await dispatch(refreshUser(signedIn));
      if (error) console.log(error);
    }
    refresh();
    
    return () => {
      executedRef.current = true;
    }
  }, [user, signedIn, dispatch, navigate, pathname]);


  return signedIn
    ? (
      < div className='homePage' >
        <Search />
        <Timeline />
        <Profile />
      </div >
    )
    : <ErrorPage message={'Could not load the page.'} />
}

