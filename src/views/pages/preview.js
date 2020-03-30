import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import FilePreview from '../components/filePreview';
import Header from '../layouts/header/Header';
import { uploadImage } from '../../state/actions/upload';
import {
  selectUploadImage,
  selectSendCanvasContext
} from '../../state/selectors/upload';
export class Preview extends Component {
  state = {
    croppedImages: [],
    ctx: null,
    arrayOfUrls: []
  };
  componentDidMount() {
    this.setState(
      {
        croppedImages: this.props.history.location.state,
        ctx: this.props.receiveCanvasContext.data
      },
      () =>
        this.setState({
          croppedImages: this.state.croppedImages.map(item => item.url)
        })
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.uploadImage !== prevProps.uploadImage) {
      if (this.props.uploadImage.status === 'success') {
        this.setState({
          arrayOfUrls: [
            ...this.state.arrayOfUrls,
            this.props.uploadImage.data.link
          ]
        });
      }
    }
  }
  getBase64Image(img) {
    const { ctx } = this.state;
    ctx.canvas.width = img.width;
    ctx.canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    var dataURL = ctx.canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
  handleUpload = () => {
    const { croppedImages } = this.state;
    croppedImages
      .filter(blobUrl => blobUrl[0] !== '')
      .forEach(async (blobUrl, index) => {
        var image = this.getBase64Image(
          document.getElementById('croppedImage' + index)
        );
        var formData = new FormData();
        formData.append('type', 'file');
        formData.append('image', image);
        const { dispatch } = this.props;
        dispatch(uploadImage(formData));
      });
  };

  render() {
    return (
      <div>
        <Header />
        <div className="flex flex-col mx-auto justify-center text-center text-gray-800 items-center">
          <h1 className="text-3xl my-2">Preview Converted Images</h1>
          <button className="bg-transparent mx-2 mt-4 hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
            <Link to="/">Start Over</Link>
          </button>
          {this.state.arrayOfUrls.length >= 1 &&
          this.state.arrayOfUrls.length <= 4 ? (
            <div>
              <h1 className="my-2">Uploaded files</h1>
              {this.state.arrayOfUrls.map((item, index) => (
                <a
                  className="block text-blue-700 underline"
                  key={index}
                  href={item}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item}
                </a>
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={this.handleUpload}
                disabled={
                  !this.state.arrayOfUrls.length >= 1 &&
                  !this.state.arrayOfUrls.length <= 4
                    ? false
                    : true
                }
                className={
                  this.state.arrayOfUrls.length >= 1 &&
                  this.state.arrayOfUrls.length <= 4
                    ? 'bg-red-500 mx-2 mt-4 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                    : 'bg-red-500 hover:bg-red-700 text-xl text-white font-normal py-1 px-4 rounded mx-2 mt-4'
                }
              >
                Upload
              </button>
              {this.state.croppedImages.map((item, index) => (
                <FilePreview key={index} imgPreview={item} index={index} />
              ))}
            </>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  uploadImage: selectUploadImage,
  receiveCanvasContext: selectSendCanvasContext
});

export default connect(mapStateToProps, null)(Preview);
