import React, { Component } from 'react';
export class filePreview extends Component {
  render() {
    return (
      <>
        <div className="mt-4 p-4 flex justify-center items-center">
          <img src={this.props.imgPreview} alt=""></img>
        </div>
      </>
    );
  }
}

export default filePreview;
