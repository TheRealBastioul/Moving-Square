/*
 *Gravity/physics
 *
 */

var gravity = 11;
var gravitycheck = false;
var jumpforce = 222;
var jumplocation = [];
var jumpcounter = 0;
var doublejump = 0;
function lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
}
/*
 *Global variables etc
 */

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var windowW = window.innerWidth;
var windowH = window.innerHeight;
canvas.width = windowW;
canvas.height = windowH;
/**
 *
 */
function Update() {
    requestAnimationFrame(Update);
    rectone.update();
}
/*
 *Rectangle creator
 */
class CanvasRect{
    constructor(x, y, w, h, id){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.id = id;
        this.my = y;
        this.mx = x;
    }
    draw(ctx){
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
    clear(ctx){
        ctx.clearRect(0, 0, windowW, windowH);
    }
    update(){
        this.clear(ctx);
        this.draw(ctx);
        if (gravitycheck == true){
        	this.my += gravity;
          if (jumplocation[0] < this.my){
          gravitycheck = false;
          doublejump = 0;
          jumplocation.pop();
          }
        }
        /*this.mx = (this.mx < 0) ? this.mx + 17 : this.mx;
        this.mx = (this.mx > canvas.width - this.w) ? this.mx - 17 : this.mx;
        this.my = (this.my < 0) ? this.my + 17 : this.my;
        this.my = (this.my > canvas.height - this.h) ? this.my - 17: this.my;
        */
        this.x = lerp(this.x, this.mx, 0.1);
        this.y = lerp(this.y, this.my, 0.1);
    }
}

/*
 *InputHandler
 */
 function InputHandler(){
 	
 }
var multKeys =[];
window.addEventListener("keydown", (event) => {
    multKeys[event.code] = true;
    if (multKeys["ArrowDown"] && multKeys["ArrowRight"]) {
        rectone.mx += 17;
        rectone.my += 17;
    } else if (multKeys["ArrowUp"] && multKeys["ArrowRight"]) {
        rectone.mx += 17;
        rectone.my -= 17;
    } else if (multKeys["ArrowUp"] && multKeys["ArrowLeft"]) {
        rectone.mx -= 17;
        rectone.my -= 17;
    } else if (multKeys['ArrowDown'] && multKeys['ArrowLeft']) {
        rectone.mx -= 17;
        rectone.my += 17;
    } else if (event.code == "ArrowDown") {
        rectone.my += 17;
    } else if (event.code == "ArrowUp") {
        rectone.my -= 17;
    } else if (event.code == "Space" && jumpcounter < 1) {
        jumplocation.push(rectone.y);
        if (doublejump < 2) {
            jumpcounter++;
            rectone.my -= jumpforce;
        }

        gravitycheck = true;
    } else if (multKeys["Space"] && multKeys["ArrowLeft"]) {
        rectone.mx -= 33;
       }else if (event.code == "ArrowLeft") {
        rectone.mx -= 17;
    } else if (event.code == "ArrowRight") {
        rectone.mx += 17;
    }
}, true);
window.addEventListener("keyup", (event) => {
    multKeys[event.code] = false;
    if (event.code == "Space"){
        doublejump++;  
        jumpcounter = 0;
    }
}, true);

/*
 *
 *Initiate
 */
let rectone = new CanvasRect(100, 100, 22, 22, 4324);
Update();
