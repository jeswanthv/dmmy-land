import React, { useState } from 'react';
const Search = ({ homes, setHomes, previousHomes }) => {
  const [searchInputValue, setSearchInputValue] = useState('');
  return (
    <header>
      <h2 className='header__title'>Find it. Tour it. Own it.</h2>
      <form
        action=''
        onSubmit={(e) => {
          e.preventDefault();
          if (searchInputValue.length === 0) {
            setHomes(previousHomes);
          } else {
            setHomes(
              homes.filter((home) => {
                return home.name
                  .toLowerCase()
                  .includes(searchInputValue.toLowerCase());
              })
            );
          }
        }}
      >
        <input
          type='text'
          className='header__search'
          placeholder='Enter an address, neighborhood, city, or ZIP code'
          onChange={(e) => {
            setSearchInputValue(e.target.value);
          }}
        />
      </form>
    </header>
  );
};

export default Search;
