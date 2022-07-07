import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="hero">
        <h1 className="hero__title">Connect with people of similar interests and skills.</h1>
        <p className='hero__text'>Search for friends and skills easier and faster. Also, you can post cool and interesting stuff your friends can see on the timeline.  
        <Link to="/">See more</Link>
        </p>
    </div>
  )
}

export default Hero