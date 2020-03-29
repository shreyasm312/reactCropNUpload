import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Fileload from './fileLoad';
import FilePreview from './filePreview';
import Crop from './crop';

export class Dashboard extends Component {
  state = {
    fileLoadData: {
      imageRef: null,
      imageSRC: null,
      isInValidImage: true
    },
    cropped: false,
    currentCrop: 0,
    allow: false,
    cropSize: [
      {
        id: 0,
        width: 755,
        height: 450
      },
      {
        id: 1,
        width: 365,
        height: 450
      },
      {
        id: 2,
        width: 365,
        height: 212
      },
      {
        id: 3,
        width: 380,
        height: 380
      }
    ]
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
              <div className="flex">
                <button
                  onClick={() =>
                    this.setState({
                      cropped: !this.state.cropped
                    })
                  }
                  className={
                    this.state.cropped
                      ? 'bg-red-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                      : 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2 mt-4'
                  }
                  disabled={this.state.cropped ? true : false}
                >
                  Crop Image {this.state.currentCrop + 1}
                </button>
                <button
                  onClick={() =>
                    this.setState({
                      cropped: !this.state.cropped
                    })
                  }
                  className={
                    this.state.cropped
                      ? 'bg-transparent mx-2 mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                      : 'bg-red-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                  }
                  disabled={this.state.cropped ? false : true}
                >
                  Reset
                </button>
                <button
                  disabled={this.state.allow ? false : true}
                  className={
                    this.state.allow
                      ? 'bg-transparent mx-2 mt-4 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
                      : 'bg-green-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                  }
                >
                  Next
                </button>
              </div>
              {!this.state.cropped ? (
                <FilePreview imgPreview={this.state.fileLoadData.imageSRC} />
              ) : (
                <Crop
                  cropped={cropped =>
                    cropped
                      ? this.setState({
                          cropped: cropped,
                          allow: !this.state.allow
                        })
                      : null
                  }
                  cropSize={this.state.cropSize[this.state.currentCrop]}
                  imageData={this.state.fileLoadData}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
