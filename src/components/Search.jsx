import React from 'react';

const Search = ({ value, onChange, onSubmit, children }) => (
  <div className="search-wrapper">
    <div className="search">
      <form onSubmit={onSubmit}>
        <span className="fa fa-search" />
        <input
          type="text"
          placeholder="Search stories by title..."
          value={value}
          onChange={onChange}
        />
      </form>
    </div>
  </div>
  );

export default Search;

