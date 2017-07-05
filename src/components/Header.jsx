import React from 'react';
import Search from './Search.jsx';
import Button from './Button.jsx';


const Header = ({ value, onChange, onSubmit, onClick }) =>
  (<header className="page-header">
    <div className="logo-wrapper">
      <a href="" className="logo">
        <img alt="" src="logo.png" />
        <div className="logo-name">
        Asaa
        <br />
        News Feed
        </div>
      </a>
    </div>
    {localStorage.User &&
    <div>
      <Search value={value} onChange={onChange} onSubmit={onSubmit} />
      <Button
        className="button-inline"
        onClick={onClick}
      >
        Log out
      </Button>
    </div>
    }
  </header>);

export default Header;
