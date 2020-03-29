import React, { Component } from 'react';
import { connect } from 'react-redux';

import { history } from '../../helpers/history';
import { sendCanvasContext } from '../../state/actions/upload';

import Header from '../layouts/header/Header';
import Fileload from '../components/fileLoad';
import FilePreview from '../components/filePreview';
import Crop from '../components/crop';

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
    preview: false,
    ctx: null,
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
    ],
    croppedImages: []
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.ctx !== prevState.ctx) {
      const { dispatch } = this.props;
      dispatch(sendCanvasContext(this.state.ctx));
    }
  }
  render() {
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
                  {this.state.preview
                    ? 'Crop Image '
                    : `Crop Image ${this.state.currentCrop + 1}`}
                </button>
                <button
                  onClick={() =>
                    this.setState({
                      cropped: !this.state.cropped,
                      allow: !this.state.allow
                    })
                  }
                  className={
                    this.state.cropped && !this.state.preview
                      ? 'bg-transparent mx-2 mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded'
                      : 'bg-red-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                  }
                  disabled={
                    this.state.cropped && !this.state.preview ? false : true
                  }
                >
                  Reset
                </button>
                <button
                  onClick={() =>
                    this.state.currentCrop < 3
                      ? this.setState(previousState => ({
                          currentCrop:
                            previousState.currentCrop === 3
                              ? previousState.currentCrop
                              : this.state.currentCrop + 1,
                          cropped: false,
                          allow: false
                        }))
                      : this.setState({
                          preview: !this.state.preview,
                          cropped: this.state.cropped
                        })
                  }
                  disabled={this.state.allow ? false : true}
                  className={
                    this.state.allow
                      ? 'bg-transparent mx-2 mt-4 hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded'
                      : 'bg-green-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                  }
                >
                  {this.state.currentCrop === 3 ? 'Preview' : 'Next'}
                </button>
              </div>
              {!this.state.preview ? (
                !this.state.cropped ? (
                  <FilePreview imgPreview={this.state.fileLoadData.imageSRC} />
                ) : (
                  <Crop
                    cropped={(cropped, croppedImages, ctx) =>
                      cropped
                        ? this.setState({
                            ...this.state,
                            cropped: cropped,
                            ctx,
                            allow: !this.state.allow,
                            croppedImages: [
                              ...this.state.croppedImages,
                              croppedImages
                            ]
                          })
                        : null
                    }
                    cropSize={this.state.cropSize[this.state.currentCrop]}
                    imageData={this.state.fileLoadData}
                  />
                )
              ) : (
                history.push({
                  pathname: '/preview',
                  state: this.state.croppedImages
                })
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, null)(Dashboard);
