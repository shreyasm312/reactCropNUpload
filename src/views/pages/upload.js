import React, { Component } from 'react';
import Header from '../layouts/header/Header';
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
          console.log(img.width, img.height);
          if (img.width !== 1024 || img.height !== 1024) {
            this.setState({
              imageSRC: null,
              isInValidImage: true
            });
          } else {
            this.setState(
              { imageSRC: img.src }
              //set it back to false later
            );
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
      <>
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
            {/* <div className="h-6">{this.state.imageSRC}</div> */}
          </div>
        </div>
        <footer className="w-full absolute bottom-0 text-center p-2">
          Paytm Insider Task by Shreyas
        </footer>
      </>
    );
  }
}

export default Upload;
