import React, { Component } from 'react';

export class Canvas extends Component {
  static defaultProps = {
    width: 1024,
    height: 1024,
    strokeStyle: '#F00',
    lineWidth: 1,
    onSelected: () => {}
  };
  canvas = null;
  isDirty = false;
  isDrag = false;
  startX = -1;
  startY = -1;
  curX = -1;
  curY = -1;
  componentDidMount(props) {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = this.props.strokeStyle;
    this.ctx.lineWidth = this.props.lineWidth;
    // this.addMouseEvents();
  }
  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={c => {
          this.canvas = c;
        }}
      />
    );
  }
}

export default Canvas;
