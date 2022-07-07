import React, { useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './PostCard.css'

function PostCard(props) {
    const info = props.info;
  
    const [hover, setHover] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(info.likes.length);
  
    function toggleLike(e) {
      setLiked(prev => !prev);
      setLikesCount(prev => {
        return liked
          ? prev -= 1
          : prev += 1
      })
    }
  
    function getDate(d) {
      const elapsed = Date.now() - d;
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const month = months[new Date(d).getMonth()];
      const date = new Date(d).getDate();
      const year = new Date(d).getFullYear();
  
      if (elapsed >= 691200000) return (`${month} ${date}, ${year}`);
      if (elapsed > 86400000) return (`${(elapsed / 86400000).toFixed()}d ago`);
      if (elapsed > 3600000) return (`${(elapsed / 3600000).toFixed()}h ago`);
      if (elapsed > 60000) return (`${(elapsed / 60000).toFixed()}m ago`);
      if (elapsed > 1000) return (`${(elapsed / 1000).toFixed()}s ago`);
      return elapsed;
    }
  
    return (
      <div className='post-card'>
        <div className="image-wrapper">
          <Link to={`/${info.username}`}>
            <img src={info.pic} alt="author's profile pic" className='profile-pic' />
          </Link>
        </div>
        <div className='post-wrapper'>
  
          <h3 className='author'>
            <Link to={`/${info.username}`}>
              {info.author}<span>@{info.username}</span>
            </Link>
          </h3>
          <div className='body'>{info.content}</div>
          <div className='post__action'>
            <div className="likes">
              <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={toggleLike} className='like-btn'>
                <AiFillLike size='1.5rem' color={liked ? '#9900cc' : hover ? '#9900cc88' : '#9900cc22'} />
              </button>
              <p>{likesCount} Likes</p>
            </div>
            <p className='date-time'>{getDate(info.date)}</p>
          </div>
        </div>
      </div>
    )
  }

export default PostCard