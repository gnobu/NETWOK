import React from 'react';
import './UserCard.css';

export default function UserCard({ user }) {

  return (
    <div className='resultCard'>
      <div className="userPic"><img src={user.avatar} alt='profile pic' /></div>
      <div className='userInfo'>
        <div className="names">
          <p>{user.fullName}</p>
          <span>@{user.username}</span>
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
        <button className="btn">Connect</button>
      </div>
    </div>
  )
}
