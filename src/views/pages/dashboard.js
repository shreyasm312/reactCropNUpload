import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Fileload from './fileLoad';
import FilePreview from './filePreview';

export class Dashboard extends Component {
  state = {
    fileLoadData: {
      imageRef: null,
      imageSRC: null,
      isInValidImage: true
    }
  };
  render() {
    console.log(this.state);
    return (
      <div>
        <Header />
        <div
          className="container flex-col m-auto flex justify-center items-center"
          style={{ minHeight: 'calc(100vh - 89px)' }}
        >
          <Fileload
            fileLoadData={fileLoadData =>
              this.setState({
                fileLoadData: {
                  imageRef: fileLoadData.imageRef,
                  imageSRC: fileLoadData.imageSRC,
                  isInValidImage: fileLoadData.isInValidImage
                }
              })
            }
          />

          {this.state.fileLoadData.imageSRC !== null && (
            <>
              <buton className="bg-transparent mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                Crop
              </buton>
              <FilePreview imgPreview={this.state.fileLoadData.imageSRC} />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
