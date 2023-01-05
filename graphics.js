export default class Slice {
  constructor(cx, cy, id, od, start, slice, color){
    this.cx = cx;
    this.cy = cy;
    this.id = id;
    this.od = od;
    this.start = start;
    this.slice = slice;
    this.color = color;
    this.hover = false;
  }
  colide(mouse){
    const dx = mouse.x - this.cx;
    const dy = mouse.y - this.cy;
    let delta = Math.round(Math.atan2(dy,dx)*180/Math.PI);
    if(delta < 0){
      delta += 360;
    }
    console.log(dx,dy,delta);
    const d = Math.sqrt(dx*dx + dy*dy);
    this.hover = (d >= this.id && d <= this.od && delta >= this.start && delta <= (this.start + this.slice));
  }
  draw(ctx){
    ctx.resetTransform();
    ctx.translate(this.cx,this.cy);
    ctx.fillStyle = this.hover ? 'white' : this.color;
    const start_angle = this.start/360 * 2*Math.PI;
    const end_angle = (this.start+this.slice)/360 * 2*Math.PI;
    const p1 = {
      x: Math.cos(start_angle)*this.od,
      y: Math.sin(start_angle)*this.od
    }
    const p2 = {
      x: Math.cos(start_angle)*this.id,
      y: Math.sin(start_angle)*this.id
    }
    const p3 = {
      x: Math.cos(end_angle)*this.id,
      y: Math.sin(end_angle)*this.id
    }
    const p4 = {
      x: Math.cos(end_angle)*this.od,
      y: Math.sin(end_angle)*this.od
    }
  
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.arc(0,0, this.id, start_angle, end_angle);
    ctx.lineTo(p4.x, p4.y);
    ctx.arc(0,0, this.od, start_angle, end_angle);
    ctx.closePath();
    ctx.fill();
  }
}

function drawLine(x1, y1, x2, y2) {
  this.beginPath();
  this.moveTo(x1,y1);
  this.lineTo(x2,y2);
  this.stroke();
}

function drawSlice(cx, cy, id, od, start, slice) {
  this.resetTransform();
  this.translate(cx,cy);

  const start_angle = start/360 * 2*Math.PI;
  const end_angle = (start+slice)/360 * 2*Math.PI;
  const p1 = {
    x: Math.cos(start_angle)*od,
    y: Math.sin(start_angle)*od
  }
  const p2 = {
    x: Math.cos(start_angle)*id,
    y: Math.sin(start_angle)*id
  }
  const p3 = {
    x: Math.cos(end_angle)*id,
    y: Math.sin(end_angle)*id
  }
  const p4 = {
    x: Math.cos(end_angle)*od,
    y: Math.sin(end_angle)*od
  }

  this.beginPath();
  this.moveTo(p1.x, p1.y);
  this.lineTo(p2.x, p2.y);
  this.arc(0,0, id, start_angle, end_angle);
  this.lineTo(p4.x, p4.y);
  this.arc(0,0, od, start_angle, end_angle);
  this.closePath();
  this.fill();
}


CanvasRenderingContext2D.prototype.drawLine = drawLine;
CanvasRenderingContext2D.prototype.drawSlice = drawSlice;