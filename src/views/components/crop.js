import React, { Component } from 'react';
import Canvas from './canvas';
import FilePreview from './filePreview';
export class Crop extends Component {
  state = {
    cropPixels: {},
    ctx: undefined,
    cropped: false,
    croppedImages: [],
    sendCropped: []
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.cropPixels !== prevState.cropPixels) {
      this.getCroppedImage(this.state.cropPixels);
    }
  }
  getCroppedImage = async cropPixels => {
    const croppedImageUrl = await this.cropImage(
      this.props.imageData.imageRef,
      cropPixels,
      'size' + this.props.cropSize.id + '.jpeg'
    );
    var newCroppedImageUrls = this.state.croppedImages;
    newCroppedImageUrls[this.props.cropSize.id] = croppedImageUrl;
    this.setState({
      croppedImages: newCroppedImageUrls,
      sendCropped: this.state.sendCropped.push(croppedImageUrl)
    });
  };
  cropImage = (imageRef, cropPixels, fileName) => {
    if (imageRef !== null) {
      const { ctx } = this.state;
      ctx.canvas.width = ctx.width = this.props.cropSize.width;
      ctx.canvas.height = ctx.height = this.props.cropSize.height;
      ctx.drawImage(
        imageRef,
        cropPixels.x,
        cropPixels.y,
        this.props.cropSize.width,
        this.props.cropSize.height,
        0,
        0,
        this.props.cropSize.width,
        this.props.cropSize.height
      );
      return new Promise((resolve, reject) => {
        ctx.canvas.toBlob(blob => {
          if (!blob) {
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          ctx.canvas.width = 1024;
          ctx.canvas.height = 1024;
          resolve(this.fileUrl);
        }, 'image/jpeg');
      });
    }
  };
  render() {
    return (
      <div className="flex flex-col items-center justify-center">
        {!this.state.isInValidImage && this.state.imageRef !== null && (
          <div className="my-4" style={{ minHeight: 1024, minWidth: 1024 }}>
            <h1>Selected Image</h1>
            <Canvas
              imageRef={this.props.imageData.imageRef}
              imageSRC={this.props.imageData.imageSRC}
              width={this.props.cropSize.width}
              height={this.props.cropSize.height}
              onSelected={(cropPixels, ctx, cropped) =>
                this.setState(
                  {
                    ...this.state,
                    cropPixels,
                    ctx,
                    cropped
                  },
                  () => this.props.cropped(cropped, this.state.sendCropped)
                )
              }
            />
          </div>
        )}
        {this.state.croppedImages[this.props.cropSize.id] !== undefined && (
          <FilePreview
            imgPreview={this.state.croppedImages[this.props.cropSize.id]}
          />
        )}
      </div>
    );
  }
}

export default Crop;
