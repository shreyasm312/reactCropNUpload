import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <nav className="block bg-red-500 py-1 w-100">
        <Link className="mx-4 text-white" to="/">
          Crop and Upload
        </Link>
      </nav>
    );
  }
}

export default Header;
