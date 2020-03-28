import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Canvas from '../components/canvas/canvas';
export class Crop extends Component {
  state = {
    cropPixels: {},
    ctx: undefined,
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
    croppedImages: [undefined, undefined, undefined, undefined]
  };
  render() {
    componentDidUpdate(prevProps, prevState) {
        if (this.state.cropPixels !== prevState.cropPixels) {
          this.getCroppedImage(this.state.cropPixels);
        }
      }
    getCroppedImage = async cropPixels => {
      const croppedImageUrl = await this.cropImage(
        this.state.imageRef,
        cropPixels,
        'size' + this.state.cropSize[0].id + '.jpeg'
      );
      var newCroppedImageUrls = this.state.croppedImages;
      newCroppedImageUrls[this.state.cropSize[0].id] = croppedImageUrl;
      this.setState({ croppedImages: newCroppedImageUrls });
    };
    cropImage = (imageRef, cropPixels, fileName) => {
      if (imageRef !== null) {
        const { ctx } = this.state;
        ctx.canvas.width = ctx.width = this.state.cropSize[0].width;
        ctx.canvas.height = ctx.height = this.state.cropSize[0].height;
        ctx.drawImage(
          imageRef,
          cropPixels.x,
          cropPixels.y,
          this.state.cropSize[0].width,
          this.state.cropSize[0].height,
          0,
          0,
          this.state.cropSize[0].width,
          this.state.cropSize[0].height
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
    return (
      <div>
        {!this.state.isInValidImage && this.state.imageRef !== null && (
          <div
            className="block m-4"
            style={{ maxHeight: 1024, maxWidth: 1024 }}
          >
            <h1>Selected Image</h1>
            <Canvas
              imageRef={this.state.imageRef}
              imageSRC={this.state.imageSRC}
              width={this.state.cropSize[0].width}
              height={this.state.cropSize[0].height}
              onSelected={(cropPixels, ctx) =>
                this.setState({
                  ...this.state,
                  cropPixels,
                  ctx
                })
              }
            />
          </div>
        )}
        {this.state.croppedImages[0] !== undefined && (
          <div className="block border-2 border-black m-4">
            <img src={this.state.croppedImages[0]} alt=""></img>
          </div>
        )}
      </div>
    );
  }
}

export default Crop;
