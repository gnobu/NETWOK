import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

export default function UserCard({ user }) {

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
        <button data-userid={user._id} className="btn">Connect</button>
      </div>
    </div>
  )
}
