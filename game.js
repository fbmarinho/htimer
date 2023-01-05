import Slice from './graphics.js';

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let MX = WIDTH / 2;
let MY = HEIGHT / 2;
let mouse = {x: 0, y: 0};
let slices = [];

let ctx = {};

function setup(){
  const canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  ctx.canvas.width = WIDTH;
  ctx.canvas.height = HEIGHT;

  const id = 150;
  const od = 300;

  slices.push(new Slice(MX,MY,id,od,0,90,'red'));
  slices.push(new Slice(MX,MY,id,od,90,90,'blue'));
  slices.push(new Slice(MX,MY,id,od,180,90,'yellow'));
  slices.push(new Slice(MX,MY,id,od,270,90,'green'));

  //playNote(1000, "sine", 1);
  // const colors = [];
  // const max = 2+Math.random()*28;
  // for(var i = 1; i<=max;i++){
  //   const randColor = () => Math.round(Math.random()*255);
  //   colors.push(`rgb(${randColor()},${randColor()},${randColor()})`)
  // }
  // console.log(colors);
  // colors.forEach((color, i)=>{
  //   ctx.fillStyle = color;
  //   const offset = 10;
  //   const slice = 360/colors.length - offset;
  //   const start = i*(slice+offset);
  //   ctx.drawSlice(MX,MY, id, od, start, slice);
  // })
}


function loop(){
  slices.forEach((s)=>{
    s.draw(ctx);
    s.colide(mouse);
  });
  console.log('teste');
  requestAnimationFrame(loop);
}

document.addEventListener("DOMContentLoaded", ()=>{
  setup();
  loop();
})

document.addEventListener("mousedown",(e)=>{
  mouse = {x:e.clientX,y:e.clientY};
})

document.addEventListener("mouseup",(e)=>{
  mouse = {x:0,y:0};
})

