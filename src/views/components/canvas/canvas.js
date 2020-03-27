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

    this.addMouseEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.imageSRC !== prevProps.imageSRC) {
      let img = new Image();
      img.onload = () => {
        this.ctx.drawImage(img, 33, 71, 104, 124, 21, 20, 87, 104);
      };
      img.src = this.props.imageSRC;
    }
  }
  componentWillUnmount() {
    this.removeMouseEvents();
  }
  addMouseEvents() {
    document.addEventListener('mousedown', this.onMouseDown, false);
    document.addEventListener('mousemove', this.onMouseMove, false);
    document.addEventListener('mouseup', this.onMouseUp, false);
  }
  removeMouseEvents() {
    document.removeEventListener('mousedown', this.onMouseDown, false);
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }

  onMouseDown = e => {
    this.isDrag = true;
    this.curX = this.startX = e.offsetX;
    this.curY = this.startY = e.offsetY;
    // requestAnimationFrame(this.updateCanvas)
  };

  onMouseMove = e => {
    if (!this.isDrag) return;
    this.curX = e.offsetX;
    this.curY = e.offsetY;
    this.isDirty = true;
  };

  onMouseUp = e => {
    this.isDrag = false;
    this.isDirty = true;
    const rect = {
      x: Math.min(this.startX, this.curX),
      y: Math.min(this.startY, this.curY),
      w: Math.abs(e.offsetX - this.startX),
      h: Math.abs(e.offsetY - this.startY)
    };
    this.props.onSelected(rect);
  };

  // updateCanvas = () => {
  //   if (this.isDrag) {
  //     requestAnimationFrame(this.updateCanvas);
  //   }
  //   if (!this.isDirty) {
  //     return;
  //   }
  //   this.ctx.clearRect(0, 0, this.props.width, this.props.height);
  //   if (this.isDrag) {
  //     const rect = {
  //       x: this.startX,
  //       y: this.startY,
  //       w: this.curX - this.startX,
  //       h: this.curY - this.startY
  //     };
  //     this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
  //   }
  //   this.isDirty = false;
  // };

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
