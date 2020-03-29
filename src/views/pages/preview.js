import React, { Component } from 'react';
import FilePreview from '../components/filePreview';
import Header from '../layouts/header/Header';

export class Preview extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.history.location.state.map((item, index) => (
          <FilePreview key={index} imgPreview={item} />
        ))}
      </div>
    );
  }
}

export default Preview;
