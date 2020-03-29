import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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
    ctx: null
  };
  componentDidMount() {
    this.setState({
      croppedImages: this.props.history.location.state,
      ctx: this.props.receiveCanvasContext.data
    });
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
          <h1 className="text-3xl">Preview Converted Images</h1>
          <button
            onClick={this.handleUpload}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2 mt-4"
          >
            Upload
          </button>
          {this.props.history.location.state.map((item, index) => (
            <FilePreview key={index} imgPreview={item} index={index} />
          ))}
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
