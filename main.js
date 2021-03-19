//=====================constant=====================
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//1536*754
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//=====================objects=====================
function Piece(surrounding, isEmpty, pawn, x, y, size){
    this.surrounding = surrounding;
    this.isEmpty = isEmpty;
    this.pawn = pawn;
    this.x = x;
    this.y = y;
    this.size = size;
}

Piece.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    if(this.pawn !== null){
        //在init前會執行一次。但是這時image沒有src，所以圖跑不出來。
        this.pawn.draw();
    }
};

function Field(){
    this.pieces = new Array(11);
    this.pieces[0] = new Piece([1,2,3],    false, new Hare(158, 307), 228, 377, 70);
    this.pieces[1] = new Piece([0,2,4,5],  true,  null, 498, 149, 70);
    this.pieces[2] = new Piece([0,1,3,5],  true,  null, 498, 377, 70);
    this.pieces[3] = new Piece([0,2,5,6],  true,  null, 498, 605, 70);
    this.pieces[4] = new Piece([1,5,7],    true,  null, 768, 149, 70);
    this.pieces[5] = new Piece([1,2,3,4,6,7,8,9], true, null, 768, 377, 70);
    this.pieces[6] = new Piece([3,5,9],    true,  null, 768, 605, 70);
    this.pieces[7] = new Piece([4,5,8,10], false, new Hound(968, 79, 0), 1038, 149, 70);
    this.pieces[8] = new Piece([5,7,9,10], true,  null, 1038, 377, 70);
    this.pieces[9] = new Piece([5,6,8,10], false, new Hound(968, 535, 1), 1038, 605, 70);
    this.pieces[10] = new Piece([7,8,9],   false, new Hound(1238, 307, 2), 1308, 377, 70);
}

Field.prototype.init = function(){
    this.draw();
    let pieces = this.pieces;
    for( var i = 0; i < pieces.length; i++){
        if(pieces[i].pawn !== null){
            pieces[i].pawn.init();
        } 
    }
};

Field.prototype.draw = function(){
    ctx.fillStyle = 'rgba(43,100,35)';
    ctx.fillRect(0, 0, width, height);
    let pieces = this.pieces;
    for(var i = 0; i < pieces.length; i++){
        pieces[i].draw();
    }
};

function Pawn(x, y){
    this.x = x;
    this.y = y;
}

Pawn.prototype.init = function(){};
Pawn.prototype.draw = function(){};

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
};

Hare.prototype.draw = function(){
    ctx.drawImage(this.img, this.x, this.y);
};

function Hound(x, y, index){
    Pawn.call(this, x, y);
    this.index = index;
    this.img = new Image();
    this.imgSrc = 'images/hound.png';
}
Hound.prototype = Object.create(Pawn.prototype);
Hound.prototype.constructor = Hound;

Hound.prototype.init = function(){
    let x = this.x;
    let y = this.y;
    this.img.addEventListener('load', function(){
        ctx.drawImage(this, x, y);
    });
    this.img.src = this.imgSrc;
};

Hound.prototype.draw = function(){
    ctx.drawImage(this.img, this.x, this.y);
};

//=====================running=====================


let field = new Field();
field.init();
let _hare = { 'current' : {}, 'index' : 0, 'isClicked' : false};
let _hounds = new Array(3);
let houndsTurn = true;
let test = function(event){
    //確認是否點擊在Pawn的範圍上
    if( (event.clientX >= _hare.current.x) &&
        (event.clientX <= _hare.current.x + _hare.current.img.width) &&
        (event.clientY >= _hare.current.y) &&
        (event.clientX <= _hare.current.y + _hare.current.img.height) &&
        houndsTurn === false){
            console.log("hare");
            //如果是，在確認是否點擊在與其相連的格子內。
            // if(_hare.isClicked){
            //     for( var j = 0; j < field.pieces[_hare.index].surrounding.length; j++){
            //        var originX = field.pieces[_hare.index].x;
            //        var originY = field.pieces[_hare.index].y;
            //        if(Math.sqrt((event.x - originX)*(event.x - originX) + (event.y - originY)*(event.y - originY))
            //           <= field.pieces[_hare.index].size){
            //               console.log("nice");
            //         }else{
            //             console.log('out of range');
            //         }
            //     }
            // }
            // _hare.isClicked = true;
            houndsTurn = !houndsTurn;
    }
    for( var i = 0; i < _hounds.length; i++){
        if( (event.clientX >= _hounds[i].x) &&
            (event.clientX <= _hounds[i].x + _hounds[i].img.width) &&
            (event.clientY >= _hounds[i].y) &&
            (event.clientY <= _hounds[i].y + _hounds[i].img.height) &&
            houndsTurn === true && _hare.isClicked === false){
            console.log("hound "+i);
            houndsTurn = !houndsTurn;
        }
    }
}
canvas.addEventListener('click', test);

function loop(){
    var houndNum = 0;
    for( var i = 0; i < field.pieces.length; i++){
        if( field.pieces[i].pawn !== null){
            if( field.pieces[i].pawn.constructor === Hare){
                _hare.current = field.pieces[i].pawn;
                _hare.index = i;
            }else if( field.pieces[i].pawn.constructor === Hound){
                _hounds[houndNum] = field.pieces[i].pawn;
                houndNum++;
            }
        }
    } 
    field.draw();

    requestAnimationFrame(loop);
}

loop();