import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends Component {
  render() {
    return (
      <div>
        404 Please return back
        <Link to="/">Home</Link>
      </div>
    );
  }
}

export default NotFound;
