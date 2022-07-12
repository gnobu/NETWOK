import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import './Search.css';

import UserCard from './UserCard';
import { lookup } from '../api';

export default function Search() {
  const [searchVal, setSearchVal] = useState(false);
  const [searchRes, setSearchRes] = useState([]);
  const { fullName } = useSelector(state => state.user);
  const form = useRef();

  const firstName = fullName.split(' ')[0];

  async function setValue(e) {
    const val = e.target.value.toLowerCase();
    if (val.length) {
      setSearchVal(true);
      const { data } = await lookup({ content: val, filter: form.current.searchType.value });
      setSearchRes(data?.data);
    } else {
      setSearchVal(false);
    }
  }


  return (
    <div className='searchSection'>
      <div className="sticky-top searchSection__top">
        <Link to={'/home'}><img className='logo' src='/logo.png' alt='logo' /></Link>
        <h2>Hello, {firstName}</h2>
        <h4 className='center_text'>Search for a friend or find closest connection with a required skill.</h4>
        <form className="searchAction" ref={form} onSubmit={(e) => e.preventDefault()}>
          <select className='searchInput select' name='searchType'>
            <option value='username'>username</option>
            <option value='skill'>skill</option>
          </select>
          <input type='search' name='search' className='searchInput input' onKeyUp={setValue} />
        </form>
      </div>

      {
        (searchVal && searchRes.length > 0)
          ? <ul className='search__results'>
            {searchRes.map((item, idx) => {
              return (
                <li key={idx} >
                  <UserCard user={item} />
                </li>
              )
            })}
          </ul>
          : (searchVal && searchRes.length === 0)
            ? <p className='no-result'>No results found</p>
            : <></>
      }

    </div>
  )
}




// const testData = [
  //   {
    //     id: 1,
    //     fullname: "Elijah Effiong",
    //     skill: ["web development", "data analytics"],
    //     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
    //     username: 'Elijah'
//   },
//   {
//     id: 2,
//     fullname: "Samuel Atumah",
//     skill: ["fullstack developer", "teacher"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'SamuelAtumah1'
//   },
//   {
//     id: 3,
//     fullname: "Kingsley Akwa",
//     skill: ["graphics design", "social media manager"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'AKfour7'
//   },
//   {
//     id: 4,
//     fullname: "Edidiong Bekeh",
//     skill: ["ui/ux design", "data analytics"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'EdidiS'
//   },
//   {
//     id: 11,
//     fullname: "Elijah Effiong",
//     skill: ["web development", "data analytics"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'Elijah'
//   },
//   {
//     id: 12,
//     fullname: "Samuel Atumah",
//     skill: ["fullstack developer", "teacher"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'SamuelAtumah1'
//   },
//   {
//     id: 13,
//     fullname: "Kingsley Akwa",
//     skill: ["graphics design", "social media manager"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'AKfour7'
//   },
//   {
//     id: 14,
//     fullname: "Edidiong Bekeh",
//     skill: ["ui/ux design", "data analytics"],
//     pic: 'https://avatars.githubusercontent.com/u/2?v=4',
//     username: 'EdidiS'
//   }
// ]