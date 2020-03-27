import React, { Component } from 'react';

export class Canvas extends Component {
  static defaultProps = {
    onSelected: () => {}
  };
  canvas = null;
  isDirty = false;
  isDrag = false;
  startX = -1;
  startY = -1;
  curX = -1;
  curY = -1;
  state = {
    imageSRC: null
  };
  componentDidMount(props) {
    this.ctx = this.canvas.getContext('2d');
    this.ctx.strokeStyle = this.props.strokeStyle;
    this.ctx.lineWidth = this.props.lineWidth;

    this.addMouseEvents();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.imageSRC !== prevProps.imageSRC) {
      this.setState(
        {
          imageSRC: this.props.imageSRC
        },
        () => this.drawCropRect()
      );
      // let img = new Image();
      // img.onload = () => {
      //   this.ctx.drawImage(img, 0, 0, img.width, img.height);
      // };
      // img.src = this.props.imageSRC;
      // this.drawCropRect();
    }
  }
  drawCropRect = () => {
    this.ctx.beginPath();
    this.ctx.lineWidth = '6';
    this.ctx.strokeStyle = 'red';
    this.ctx.rect(0, 0, this.props.width, this.props.height);
    this.ctx.stroke();
  };
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
    console.log(e.offsetX);
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
      <>
        <img className="absolute z-0" src={this.state.imageSRC} alt=""></img>
        <canvas
          className="relative z-20"
          width={this.props.width}
          height={this.props.height}
          ref={c => {
            this.canvas = c;
          }}
        />
      </>
    );
  }
}

export default Canvas;
