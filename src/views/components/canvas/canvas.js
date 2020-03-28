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
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.addMouseEvents();
    this.setState(
      {
        imageSRC: this.props.imageSRC
      },
      () => this.drawCropRect(0, 0, this.props.width, this.props.height)
    );
  }
  componentDidUpdate(prevProps, prevState) {}
  drawCropRect = (x = 0, y = 0, width, height) => {
    this.ctx.beginPath();
    this.ctx.lineWidth = '6';
    this.ctx.strokeStyle = 'red';
    this.ctx.rect(x, y, width, height);
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
    this.curX = this.startX = e.offsetX;
    this.curY = this.startY = e.offsetY;
    requestAnimationFrame(this.updateCanvas);
  };

  onMouseMove = e => {
    this.isDrag = true;
    if (!this.isDrag) return;
    this.curX = e.offsetX;
    this.curY = e.offsetY;
    this.isDirty = true;
  };

  onMouseUp = e => {
    const rect = {
      x: this.curX - this.startX,
      y: this.curY - this.startY
    };
    this.props.onSelected(rect, this.ctx);
    this.isDrag = false;
    this.isDirty = true;
  };

  updateCanvas = () => {
    if (this.isDrag) {
      this.ctx.clearRect(0, 0, 1024, 1024);
      requestAnimationFrame(this.updateCanvas);
    }
    if (!this.isDirty) {
      const rect = {
        x: this.curX - this.startX,
        y: this.curY - this.startY
      };
      if (
        rect.x >= 0 &&
        rect.y >= 0 &&
        rect.x + 755 < 1024 &&
        rect.y + 450 < 1024
      ) {
        this.drawCropRect(rect.x, rect.y, this.props.width, this.props.height);
        this.isDirty = false;
        return;
      } else {
        this.ctx.clearRect(0, 0, 1024, 1024);
        this.isDirty = false;
      }
    }

    if (this.isDrag) {
      const rect = {
        x: this.curX - this.startX,
        y: this.curY - this.startY
      };
      if (
        rect.x >= 0 &&
        rect.y >= 0 &&
        rect.x + 755 < 1024 &&
        rect.y + 450 < 1024
      ) {
        this.drawCropRect(rect.x, rect.y, this.props.width, this.props.height);
      } else {
        this.ctx.clearRect(0, 0, 1024, 1024);
      }
    }
    this.isDirty = false;
  };

  render() {
    console.log(this.state);
    return (
      <>
        {this.state.imageSRC !== null && (
          <img className="absolute z-0" src={this.state.imageSRC} alt=""></img>
        )}
        <canvas
          className="relative z-20 min-h-full"
          width={1024}
          height={1024}
          ref={c => {
            this.canvas = c;
          }}
        />
      </>
    );
  }
}

export default Canvas;
