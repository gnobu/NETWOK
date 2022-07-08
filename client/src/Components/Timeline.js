import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./Timeline.css";

import PostCard from './PostCard';
import pic from '../images/tictactoe.png';

export default function Timeline() {
  const [safe, setSafe] = useState('plain');
  const [charCount, setCharCount] = useState(0);
  const { avatar } = useSelector(state => state.user);

  timeline.sort((a, b) => {
    return (b.date - a.date)
  })



  function countChars(e) {
    const count = e.target.value.length;
    setCharCount(prev => count);
    setSafe(prev => {
      return (count > 0 && count <= 240)
        ? 'safe'
        : (count > 240)
          ? 'unsafe'
          : 'plain'
    })
  }


  return (
    <div className='timeline'>
      <div className="sticky-top timeline__top">
        <h2 className='section__title'>Timeline</h2>
        <div className='new-post'>
          <div className="image-wrapper">
            <img src={avatar} alt="author's profile pic" className='profile-pic' />
          </div>
          <form className='post-wrapper'>
            <textarea id='new__post' onChange={countChars} className='new__post' name='new__post' rows='3' maxLength={250} placeholder="Say something..."></textarea>
            <div className='post__action'>
              <span className={safe === 'safe' ? 'text-count safe' : safe === 'unsafe' ? 'text-count unsafe' : 'text-count'}>{charCount} of 250 (Max Characters)</span>
              <button type='submit' className='btn'>Post</button>
            </div>
          </form>
        </div>
      </div>
      <ul className='no-list-style'>
        {timeline.map(post => {
          return (
            <li key={post.id}><PostCard info={post} /></li>
          )
        })}
      </ul>
    </div>
  )
}


const timeline = [
  {
    id: 1,
    author: {
      fullName: 'Kirin Dave',
      username: 'KirinDave',
      avatar: 'https://avatars.githubusercontent.com/u/36?v=4',
    },
    likes: [1, 2, 3, 4, 5, 6, 7],
    createdAt: 1654441876774,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum?'
  },
  {
    id: 2,
    author: {
      fullName: 'John Doe',
      username: 'JohnDoe',
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
    },
    likes: [103, 7],
    createdAt: 1653751361079,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
  },
  {
    id: 3,
    author: {
      fullName: 'Kingsley Akwa',
      username: 'AKfour7',
      avatar: pic,
    },
    likes: [1, 2, 3, 4, 5, 6, 7, 35, 34, 23, 76, 256, 75],
    createdAt: 1654418095445,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum? Repellat voluptatum aliquid vitae dolorum? Numquam, nihil?'
  },
  {
    id: 4,
    author: {
      fullName: 'Kirin Dave',
      username: 'KirinDave',
      avatar: 'https://avatars.githubusercontent.com/u/36?v=4'
    },
    likes: [1, 2, 46, 7],
    createdAt: 1651271298484,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse.'
  },
  {
    id: 5,
    author: {
      fullName: 'Kingsley Akwa',
      username: 'AKfour7',
      avatar: pic
    },
    likes: [1, 15, 24, 6, 37],
    createdAt: 1654441906774,
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum? Repellat voluptatum aliquid vitae dolorum? Numquam, nihil?'
  }
]