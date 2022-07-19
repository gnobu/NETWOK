import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    // console.log(searchRes);
  }, [searchRes])

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

