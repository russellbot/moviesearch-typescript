import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
    return (
        <div className='pa2'>
        <input 
            aria-label='Search Movies'
            className='pa3 ba b--green bg-lightest-blue'
            type='search' 
            placeholder='search movies' 
            onChange={searchChange}
        />
        </div>
    );
}

export default SearchBox;