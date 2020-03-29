import React, { Component } from 'react';
import { FaUpload } from 'react-icons/fa';

export class Upload extends Component {
  state = {
    imageRef: null,
    imageSRC: null,
    isInValidImage: true
  };
  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      let reader = new FileReader();
      reader.onload = () => {
        var img = new Image();
        img.onload = () => {
          if (img.width !== 1024 || img.height !== 1024) {
            this.setState(
              {
                ...this.state,
                isInValidImage: true
              },
              () => {
                const data = {
                  imageRef: this.state.imageRef,
                  imageSRC: this.state.imageSRC,
                  isInValidImage: this.state.isInValidImage
                };
                this.props.fileLoadData(data);
              }
            );
          } else {
            this.setState(
              {
                ...this.state,
                imageRef: img,
                imageSRC: reader.result,
                isInValidImage: false
              },
              () => {
                const data = {
                  imageRef: this.state.imageRef,
                  imageSRC: this.state.imageSRC,
                  isInValidImage: this.state.isInValidImage
                };
                this.props.fileLoadData(data);
              }
            );
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  render() {
    return (
      <div className="h-full">
        <div
          className="container m-auto flex justify-center"
          // style={{ minHeight: 'calc(100vh - 89px)' }}
        >
          <div className="flex mt-4 text-center">
            <input
              className="cursor-pointer absolute block opacity-0 pin-r pin-t"
              name="imageUpload"
              id="image-upload"
              type="file"
              onChange={this.onSelectFile}
              accept="image/*"
            />
            <label htmlFor="image-upload">
              <div
                className="flex border border-red-400 rounded-lg shadow-xl w-full"
                style={{ padding: '50px 100px' }}
              >
                <div className="flex flex-col items-center px-4 w-1/2">
                  <FaUpload
                    style={{
                      fontSize: '50px',
                      padding: '10px',
                      color: '#fc8181'
                    }}
                  />
                  <span className="mb-2 bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded">
                    Select Image
                  </span>
                  <span className="text-gray-500 text-xs">
                    Allowed image size is 1024 * 1024
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2">
                  <span className="text-base text-red-700">
                    Final Crop sizes
                    <span className="text-xs text-gray-700">
                      <br /> 755 * 450 <br /> 365 * 450 <br /> 365 *212 <br />
                      380 * 380
                    </span>
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
