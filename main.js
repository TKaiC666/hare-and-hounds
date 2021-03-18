//=====================constant=====================
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//1536*754
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//=====================objects=====================
function Piece(surrounding, isEmpty, x, y, size){
    this.surrounding = surrounding;
    this.isEmpty = isEmpty;
    this.x = x;
    this.y = y;
    this.size = size;
}

Piece.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

function Field(){
    this.pieces = new Array(11);
    this.pieces[0] = new Piece([1,2,3], true, 228, 377, 70);
    this.pieces[1] = new Piece([0,2,4,5], true, 498, 149, 70);
    this.pieces[2] = new Piece([0,1,3,5], true, 498, 377, 70);
    this.pieces[3] = new Piece([0,2,5,6], true, 498, 605, 70);
    this.pieces[4] = new Piece([1,5,7], true, 768, 149, 70);
    this.pieces[5] = new Piece([1,2,3,4,6,7,8,9], true, 768, 377, 70);
    this.pieces[6] = new Piece([3,5,9], true, 768, 605, 70);
    this.pieces[7] = new Piece([4,5,8,10], true, 1038, 149, 70);
    this.pieces[8] = new Piece([5,7,9,10], true, 1038, 377, 70);
    this.pieces[9] = new Piece([5,6,8,10], true, 1038, 605, 70);
    this.pieces[10] = new Piece([7,8,9], true, 1308, 377, 70);
    this.hare = new Hare(158, 307);
}

Field.prototype.init = function(){
    this.draw();
    this.hare.init();
}

Field.prototype.draw = function(){
    let pieces = this.pieces;
    for(var i = 0; i < pieces.length; i++){
        pieces[i].draw();
    }
}

function Pawn(x, y){
    this.x = x;
    this.y = y;
}

function Hare(x, y){
    Pawn.call(this,x ,y);
    this.img = new Image();
    this.imgSrc = 'images/hare.png';
}
Hare.prototype = Object.create(Pawn.prototype);
Hare.prototype.constructor = Hare;

Hare.prototype.init = function(){
    let x = this.x;
    let y = this.y;
    this.img.addEventListener('load', function(){
        ctx.drawImage(this, x, y);
    });
    this.img.src = this.imgSrc;
}

Hare.prototype.draw = function(){
    ctx.drawImage(this.img, this.x, this.y);
}

function Hound(x, y, index){
    Pawn.call(this, x, y);
    this.index = index;
}
Hound.prototype = Object.create(Pawn.prototype);
Hound.prototype.constructor = Hound;

//=====================running=====================

ctx.fillStyle = 'rgba(43,100,35)';
ctx.fillRect(0, 0, width, height);

let field = new Field();
field.init();