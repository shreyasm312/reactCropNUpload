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
    resetState: false,
    currentCrop: 0,
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
  componentDidUpdate(prevProps, prevState) {
    if (this.state.cropped !== prevState.cropped) {
      this.setState({
        resetState: !this.state.resetState
      });
    }
  }
  render() {
    // console.log(this.state.cropped);
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
                  // onClick={() =>
                  //   this.setState({ cropped: !this.state.cropped })
                  // }
                  className="bg-transparent mx-2 mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                  // className={
                  //   this.state.cropped
                  //     ? 'bg-red-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                  //     : 'bg-transparent mx-2 mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                  // }
                >
                  Crop Image {this.state.currentCrop + 1}
                </button>
                <button className="bg-transparent mx-2 mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                  Next
                </button>
              </div>
              {!this.state.cropped ? (
                <FilePreview imgPreview={this.state.fileLoadData.imageSRC} />
              ) : (
                <Crop
                  cropped={cropped =>
                    this.setState({
                      cropped
                    })
                  }
                  resetState={this.state.resetState}
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
