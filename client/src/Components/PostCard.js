import React, { useState } from 'react';
import { AiFillLike } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './PostCard.css';
import { likePost } from '../api';

function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [likesCount, setLikesCount] = useState(post.likes_count);

  
  async function toggleLike(e) {
    console.log(post._id);
    const { data } = await likePost(post._id);
    console.log(data.data?.message);

    setLiked(prev => !prev);
    setLikesCount(prev => {
      return liked
        ? prev -= 1
        : prev += 1
    })
  }


  return (
    <div className='post-card'>
      <div className="image-wrapper">
        <Link to={`/${post.author.username}`} className='content_link'>
          <img src={post.author.avatar || '/no-avatar.png'} alt="author's profile pic" className='profile-pic' />
        </Link>
      </div>
      <div className='post-wrapper'>

        <h3 className='author'>
          <Link to={`/${post.author.username}`} className='content_link'>
            {post.author.fullName}<span>@{post.author.username}</span>
          </Link>
        </h3>
        <div className='body'>{post.content}</div>
        <div className='post__action'>
          <div className="likes">
            <button onClick={toggleLike} data-postid={post._id} className='like-div'>
              <AiFillLike className={liked ? 'like-btn active' : 'like-btn'} />
            </button>
            <p>{likesCount} Likes</p>
          </div>
          <p className='date-time'>{getDate(post.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}

export default PostCard;


function getDate(d) {
  if (!d) return 'no date';
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