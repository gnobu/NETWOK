import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import "./Timeline.css";
import PostCard from './PostCard';
import { makePost } from '../api';
import { fetchTimeline } from '../actions/timeline.action';
// import pic from '../images/tictactoe.png';

export default function Timeline() {
  const { avatar } = useSelector(state => state.user);
  const rawTimeline = useSelector(state => state.timeline);
  const [safe, setSafe] = useState('plain');
  const [charCount, setCharCount] = useState(0);
  const [timeline, setTimeline] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTimeline());
  }, [dispatch]);

  useEffect(() => {
    function sortTimeline () {
      let sorted = rawTimeline.reduce((prev, curr) => {
        curr.createdAt = new Date(curr.createdAt).getTime();
        prev.push(curr);

        return prev.sort((a, b) => {
          return (b.createdAt - a.createdAt)
        });
      }, [])
      sorted && setTimeline(sorted);
    }
    sortTimeline();
  }, [rawTimeline]);


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

  async function sendPost(e) {
    e.preventDefault();

    const content = e.target.new__post.value;
    const { data } = await makePost(content);
    console.log(data.data.message);
    e.target.new__post.value = '';
    setCharCount(0);
    setSafe('plain');
  }


  return (
    <div className='timeline'>
      <div className="sticky-top timeline__top">
        <h2 className='section__title'>Timeline</h2>
        <div className='new-post'>
          <div className="image-wrapper">
            <img src={avatar} alt="author's profile pic" className='profile-pic' />
          </div>
          <form onSubmit={sendPost} className='post-wrapper'>
            <textarea id='new__post' onChange={countChars} className='new__post' name='new__post' rows='3' maxLength={250} placeholder="Say something..." required></textarea>
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
            <li key={post._id}><PostCard post={post} /></li>
          )
        })}
      </ul>
    </div>
  )
}


// const timeline = [
//   {
//     id: 1,
//     author: {
//       fullName: 'Kirin Dave',
//       username: 'KirinDave',
//       avatar: 'https://avatars.githubusercontent.com/u/36?v=4',
//     },
//     likes: [1, 2, 3, 4, 5, 6, 7],
//     createdAt: 1654441876774,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum?'
//   },
//   {
//     id: 2,
//     author: {
//       fullName: 'John Doe',
//       username: 'JohnDoe',
//       avatar: "https://avatars.githubusercontent.com/u/2?v=4",
//     },
//     likes: [103, 7],
//     createdAt: 1653751361079,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.'
//   },
//   {
//     id: 3,
//     author: {
//       fullName: 'Kingsley Akwa',
//       username: 'AKfour7',
//       avatar: pic,
//     },
//     likes: [1, 2, 3, 4, 5, 6, 7, 35, 34, 23, 76, 256, 75],
//     createdAt: 1654418095445,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum? Repellat voluptatum aliquid vitae dolorum? Numquam, nihil?'
//   },
//   {
//     id: 4,
//     author: {
//       fullName: 'Kirin Dave',
//       username: 'KirinDave',
//       avatar: 'https://avatars.githubusercontent.com/u/36?v=4'
//     },
//     likes: [1, 2, 46, 7],
//     createdAt: 1651271298484,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse.'
//   },
//   {
//     id: 5,
//     author: {
//       fullName: 'Kingsley Akwa',
//       username: 'AKfour7',
//       avatar: pic
//     },
//     likes: [1, 15, 24, 6, 37],
//     createdAt: 1654441906774,
//     content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nemo optio dolore vitae, consequatur fugiat veniam distinctio esse, eveniet sunt consectetur error illum? Repellat voluptatum aliquid vitae dolorum? Numquam, nihil?'
//   }
// ]