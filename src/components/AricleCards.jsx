import React, { Component } from 'react';
import Button from './Button.jsx';


const largeColumn = {
  width: '50%',
};

const midColumn = {
  width: '20%',
};

const smallColumn = {
  width: '10%',
};

const picWidth = {
  width: '100%',
};

const titleFont = {
  fontFamily: 'PT Serif,Georgia,serif',
  fontSize: '1.075rem',
  fontWeight: '700',
};

const imgColumn = {
  width: '40%',
};

function isSearched(searchTerm) {
  return function (item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
}

const Table = ({ list, onDismiss, pattern }) =>
  (<div className="table">
    { list.filter(isSearched(pattern)).map(item =>
        item.title &&
        <div key={item.url} className="table-row">
          <div style={imgColumn} className="picColumn">
            <img alt="" src={item.urlToImage} style={picWidth} />
          </div>
          <div style={largeColumn} className="newsColumn">
            <a href={item.url} rel="noopener noreferrer" target="_blank" style={titleFont}>{item.title}</a>
            <p>{item.description}</p>
            <p>{item.author}</p>
          </div>
        </div>,
    )}
  </div>);

export default Table;
