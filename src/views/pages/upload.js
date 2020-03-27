import React, { Component } from 'react';
import Header from '../layouts/header/Header';
import Canvas from '../components/canvas/canvas';
export class Upload extends Component {
  state = {
    imageSRC: null,
    isInValidImage: false
  };
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
            this.setState({ ...this.state, imageSRC: reader.result });
          }
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  render() {
    console.log(this.state);
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
            <div className="h-6">
              <h1>Selected Image</h1>
              {/* {this.state.imageSRC !== null && ( */}
                <Canvas
                  imageSRC={this.state.imageSRC}
                  width={755}
                  height={450}
                />
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
