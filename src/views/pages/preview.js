import React, { Component } from 'react';
import FilePreview from '../components/filePreview';
import Header from '../layouts/header/Header';

export class Preview extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="flex flex-col mx-auto justify-center text-center text-gray-800 items-center">
          <h1 className="text-3xl">Preview Converted Images</h1>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2 mt-4">
            Upload
          </button>
          {this.props.history.location.state.map((item, index) => (
            <FilePreview key={index} imgPreview={item} />
          ))}
        </div>
      </div>
    );
  }
}

export default Preview;
