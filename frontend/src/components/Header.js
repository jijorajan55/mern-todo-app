import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: '#6200ea',
        padding: '10px',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <h1>Todo App</h1>
      <nav>
        <Link to="/" style={{ margin: '0 15px', color: 'white' }}>
          Home
        </Link>
        <Link to="/add" style={{ margin: '0 15px', color: 'white' }}>
          Add Todo
        </Link>
      </nav>
    </header>
  );
};

export default Header;
