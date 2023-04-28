import React from 'react';
import locationIcon from '../assets/ic_outline-location-on.svg';
const Singlecard = ({ image, address, name }) => {
  return (
    <div className='single_card'>
      <div className='image_container'>
        <img src={image} alt='' />
        <div className='card_content'>
          <h1>{name}</h1>
          <div className='card_desc'>
            <img src={locationIcon} alt='' />
            <p>{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlecard;
