import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import { BsBoxArrowRight } from 'react-icons/bs';

import PostCard from './PostCard';
import Connections from './Connections';
import { getProfile } from '../actions/profile.action';
import { attemptlogout } from '../actions/user.action';
import { attemptConnect } from '../actions/profile.action';



export default function Profile() {
  const profile = useSelector((state) => state.profile);
  const [connectEdit, setConnectEdit] = useState('edit');
  const [showConnections, setShowConnections] = useState({ display: false, label: '', connections: [] });
  const [action, setAction] = useState(profile.action);
  const [posts, setPosts] = useState([]);
  const modalRef = useRef(null);
  const done = useRef(false);
  const dispatch = useDispatch();
  const { username } = useParams();
  const navigate = useNavigate();
  // console.log(profile.action); // re-render checks


  useEffect(() => {
    function sortPosts() {
      let sorted = profile.posts?.reduce((prev, curr) => {
        curr.createdAt = new Date(curr.createdAt).getTime();
        prev.push(curr);

        return prev.sort((a, b) => {
          return (b.createdAt - a.createdAt)
        });
      }, [])
      sorted && setPosts(sorted);
    }
    sortPosts();
    setAction(profile.action)
  }, [profile])

  useEffect(() => {
    async function getProf() {
      const error = await dispatch(getProfile(username));
      if (error) {
        alert(error);
        navigate(-1);
      }
    }
    getProf();
  }, [dispatch, username])

  useEffect(() => {
    if (done.current) return;
    setConnectEdit(prev => prev);
    return () => done.current = true;
  }, [connectEdit])

  useEffect(() => {
    if (showConnections.display) modalRef.current.showModal();
  }, [showConnections])


  const viewModal = (e) => {
    const modalType = e.target.getAttribute('data-type');
    setShowConnections({ display: true, label: e.target.innerText, connections: profile[modalType] });
  }

  const logout = (e) => {
    dispatch(attemptlogout());
  }

  async function handleAction(e) {
    const profileAction = e.target.getAttribute('data-action');

    if (profileAction === 'Edit') {
      console.log('edit');
    } else {
      // const { data } = await connect(profile._id, profileAction);
      // setAction(data.data?.action);
      dispatch(attemptConnect(profile._id, profileAction));
    }
  }


  return (
    <div className="profileSection">
      <div className='sticky-top profile'>
        <div className="intro">
          <div className="profileWrapper"><img className='profilePic' src={profile.avatar || '/no-avatar.png'} alt="user's profile" /></div>
          <div className="handle">
            <h2>{profile.fullName}</h2>
            <p>@{profile.username}</p>
            <div className='connectionsDiv'>
              <button onClick={viewModal} data-type='connections' className='connections'>{profile.connections_count} Connections</button>
              <button onClick={viewModal} data-type='connect_requests' className='connections'>{profile.requests_count} Requests</button>
            </div>
          </div>
          <button onClick={logout} className='logoutAction'>
            <div className='tooltip'>Logout</div>
            <span className='logout'><BsBoxArrowRight className='i' /></span>
          </button>
        </div>
        <div className="bioDiv">
          <h3>Bio</h3>
          <p className='bio'>{profile.bio}</p>
        </div>
        <div className="skillsDiv">
          <h3>Skills</h3>
          <p className='skills'>{profile.skills}</p>
        </div>
        <div className='profileActions'>
          {/* <button className='btn'>{connectEdit === 'notfollowing' ? 'Follow' : connectEdit === 'following' ? 'Unfollow' : 'Edit'}</button> */}
          <button onClick={handleAction} data-action={action} data-userid={profile._id} className='btn'>{action}</button>
        </div>
      </div>
      {showConnections.display && <Connections setShowConnections={setShowConnections} showConnections={showConnections} ref={modalRef} />}

      {
        (posts.length > 0)
          ? <ul className='no-list-style'>
            {posts.map(post => (
              <li key={post._id}><PostCard post={post} /></li>
            ))}
          </ul>
          : <p className='no-result'>No posts yet</p>
      }

    </div>
  )
}







// const posts = [
//   {
//     id: 1,
//     author: 'Kirin Dave',
//     username: 'KirinDave',
//     pic: 'https://avatars.githubusercontent.com/u/36?v=4',
//     likes: [1, 2, 3, 4, 5, 6, 7],
//     date: 1654441876774,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum?'
//   },
//   {
//     id: 2,
//     author: 'John Doe',
//     username: 'JohnDoe',
//     pic: "https://avatars.githubusercontent.com/u/2?v=4",
//     likes: [103, 7],
//     date: 1653751361079,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
//   },
//   {
//     id: 3,
//     author: 'Kingsley Akwa',
//     username: 'AKfour7',
//     pic: pic,
//     likes: [1, 2, 3, 4, 5, 6, 7, 35, 34, 23, 76, 256, 75],
//     date: 1654418095445,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum? Repellat voluptatum aliquid vitae dolorum? Numquam, nihil?'
//   },
//   {
//     id: 4,
//     author: 'Kirin Dave',
//     username: 'KirinDave',
//     pic: 'https://avatars.githubusercontent.com/u/36?v=4',
//     likes: [1, 2, 46, 7],
//     date: 1651271298484,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse.'
//   },
//   {
//     id: 5,
//     author: 'Kingsley Akwa',
//     username: 'AKfour7',
//     pic: pic,
//     likes: [1, 15, 24, 6, 37],
//     date: 1654441906774,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum? Repellat voluptatum aliquid vitae dolorum? Numquam, nihil?'
//   }
// ]