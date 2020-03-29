import React, { Component } from 'react';
export class filePreview extends Component {
  render() {
    return (
      <>
        <div className="mt-4 p-4 flex justify-center items-center">
          <img
            src={this.props.imgPreview}
            alt=""
            id={'croppedImage' + this.props.index}
          ></img>
        </div>
      </>
    );
  }
}

export default filePreview;
