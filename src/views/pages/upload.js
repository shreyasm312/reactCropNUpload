import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Canvas from '../components/canvas/canvas';
export class Upload extends Component {
  state = {
    imageSRC: null,
    imageRef: null,
    isInValidImage: false,
    cropPixels: {},
    ctx: {},
    canvas: null,
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

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cropPixels !== prevState.cropPixels) {
      this.getCroppedImage(this.state.cropPixels);
    }
  }
  onSelectFile = e => {
    if (e.target.files) {
      let reader = new FileReader();
      reader.onload = () => {
        var img = new Image();
        img.onload = () => {
          if (img.width !== 1024 || img.height !== 1024) {
            this.setState({
              ...this.state,
              isInValidImage: true
            });
          } else {
            this.setState({
              ...this.state,
              imageSRC: reader.result,
              imageRef: img
            });
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
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
  cropImage = (imageSRC, cropPixels, fileName) => {
    if (imageSRC !== null) {
      const { ctx } = this.state;
      ctx.canvas.width = ctx.width = this.state.cropSize[0].width;
      ctx.canvas.height = ctx.height = this.state.cropSize[0].height;
      ctx.drawImage(
        imageSRC,
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
  render() {
    // console.log(this.state.croppedImages);
    return (
      <div className="h-full">
        <Header />
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <div className="block" style={{ height: '300px' }}>
              <div>Upload an Image</div>
              <div>
                <input
                  type="file"
                  onChange={this.onSelectFile}
                  accept="image/*"
                />
              </div>
            </div>
            <div className="block" style={{ maxHeight: 1024, maxWidth: 1024 }}>
              <h1>Selected Image</h1>
              <Canvas
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
            {this.state.croppedImages[0] !== undefined && (
              <div className="block border-2 border-black">
                <img src={this.state.croppedImages[0]} alt=""></img>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
