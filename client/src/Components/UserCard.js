import React from 'react';
import './UserCard.css';

export default function UserCard(props) {
  const user = props.res;

  return (
    <div className='resultCard'>
      <div className="userPic"><img src={user.pic} alt='profile pic' /></div>
      <div className='userInfo'>
        <div className="names">
          <p>{user.fullname}</p>
          <span>@{user.username}</span>
        </div>
        <ul className='list-row'>
          {user.skill.map((skill, idx) => {
            return (
              <li className='skill' key={idx}>{skill}</li>
            )
          })}
        </ul>
      </div>
      <div className='action'>
        <button className="btn">Following</button>
      </div>
    </div>
  )
}
