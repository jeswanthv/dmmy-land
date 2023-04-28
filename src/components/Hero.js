import React from 'react';
import background from '../assets/House 1.png';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero_left'>
        <h1>A home is built with love and dreams</h1>
        <h5>A home is built with love and dreams</h5>
        <div className='btn_container'>
          <button>Our Projects</button>
          <button>Contact us</button>
        </div>
      </div>
      <div className='hero_right'>
        <img src={background} />
      </div>
    </div>
  );
};

export default Hero;
