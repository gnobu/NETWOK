import React, { useEffect, useState } from 'react';
import './Search.css';

import UserCard from './UserCard';

export default function Search() {
  const [searchVal, setSearchVal] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData([
      {
        id: 1,
        fullname: "Elijah Effiong",
        skill: ["web development", "data analytics"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'Elijah'
      },
      {
        id: 2,
        fullname: "Samuel Atumah",
        skill: ["fullstack developer", "teacher"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'SamuelAtumah1'
      },
      {
        id: 3,
        fullname: "Kingsley Akwa",
        skill: ["graphics design", "social media manager"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'AKfour7'
      },
      {
        id: 4,
        fullname: "Edidiong Bekeh",
        skill: ["ui/ux design", "data analytics"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'EdidiS'
      },
      {
        id: 11,
        fullname: "Elijah Effiong",
        skill: ["web development", "data analytics"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'Elijah'
      },
      {
        id: 12,
        fullname: "Samuel Atumah",
        skill: ["fullstack developer", "teacher"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'SamuelAtumah1'
      },
      {
        id: 13,
        fullname: "Kingsley Akwa",
        skill: ["graphics design", "social media manager"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'AKfour7'
      },
      {
        id: 14,
        fullname: "Edidiong Bekeh",
        skill: ["ui/ux design", "data analytics"],
        pic: 'https://avatars.githubusercontent.com/u/2?v=4',
        username: 'EdidiS'
      }
    ])
  }, [])
  
  useEffect(() => {
    if (searchVal.length > 0) {
      const result = data.filter(item => item['username'].toLowerCase().includes(searchVal.toLowerCase()));
      setSearchRes(result);
    }
  }, [searchVal, data])
  
  
  function setValue(e){
    const val = e.target.value;
    setSearchVal(val);
  }
  

  return (
    <div className='searchSection'>
      <div className="sticky-top searchSection__top">
        <img className='logo' src='/logo.png' alt='logo' />
        <h3 className='section__title center'>Search for a friend or find closest connection with a required skill.</h3>
        <div className="searchAction">
          <select className='searchInput select' name='searchType'>
            <option value='username'>username</option>
            <option value='skill'>skill</option>
          </select>
          <input type='search' className='searchInput input' value={searchVal} onChange={setValue}/>
        </div>
      </div>

        {
          (searchVal.length > 0 && searchRes.length > 0)
          ? <ul className='search__results'>
              {searchRes.map(item => {
                return (
                  <li key={item.id} >
                    <UserCard res={item}/>
                  </li>
                )
              }) }
            </ul>
          : (searchVal.length > 0 && searchRes.length === 0)
          ? <p className='no-result'>No results found</p>
          : <></>
        }
      
    </div>
  )
}
