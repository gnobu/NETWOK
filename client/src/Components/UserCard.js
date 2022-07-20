import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';
import { connect } from '../api';


export default function UserCard({ user }) {
  const [action, setAction] = useState(user.action);

  useEffect(() => {
    console.log(action);
  }, [action])

  async function handleConnect(e) {
    const userId = e.target.getAttribute('data-userid');
    const userAction = e.target.getAttribute('data-action');

    const { data } = await connect(userId, userAction);
    setAction(data.data?.action);
  }

  return (
    <div className='resultCard'>
      <div className="userPic">
        <Link to={`/${user.username}`} className='content_link'>
          <img src={user.avatar} alt='profile pic' />
        </Link>
      </div>
      <div className='userInfo'>
        <div className="">
          <Link to={`/${user.username}`} className='content_link names'>
            <p>{user.fullName}</p>
            <span>@{user.username}</span>
          </Link>
        </div>
        <ul className='list-row'>
          {user.skills.map((skill, idx) => {
            return (
              <li className='skill' key={idx}>{skill}</li>
            )
          })}
        </ul>
      </div>
      <div className='action'>
        {user.action && <button onClick={handleConnect} data-action={user.action} data-userid={user._id} className="btn">{user.action}</button>}
      </div>
    </div>
  )
}
