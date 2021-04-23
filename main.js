//=====================constant=====================
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//1536*754
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//=====================objects=====================
function GameManager(){
    //canvas
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    //DOM
    this.round = document.querySelector('h1');
    //classes
    this.gameBoard = new GameBoard();
    this.hare = new Hare();
    this.hounds = new Array(3);
}

GameManager.prototype.init = function(){
    this.canvas.addEventListener(this.movePieces());
}

GameManager.prototype.update = function(){

}

GameManager.prototype.draw = function(){

}

GameManager.prototype.loop = function(){

}

GameManager.prototype.movePieces = function(){

}

GameManager.prototype.endGame = function(){

}

GameManager.prototype.getAllHoundsSurrounding = function(){
    //遊戲中有複數個Hound，要一次取得所有實體的變數就不能寫在Hound裡。

}

function Cell(surrounding, isEmpty, piece, x, y){
    this.surrounding = surrounding;
    this.isEmpty = isEmpty;
    this.piece = piece;
    this.x = x;
    this.y = y;
    this.size = height/12;
}

Cell.prototype.drawHint = function(){
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(this.x , this.y, this.size, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.stroke();
}

Cell.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    if(this.piece !== null){
        //在init前會執行一次。但是這時image沒有src，圖跑不出來。
        this.piece.draw();
    }
};

function GameBoard(){
    this.cell = new Array(11);
    this.cell[0] = new Cell([1,2,3],    false, new Hare(width/6-55, height*2/4-55, false), width/6, height*2/4);
    this.cell[1] = new Cell([0,2,4,5],  true,  null, width*2/6, height/4);
    this.cell[2] = new Cell([0,1,3,5],  true,  null, width*2/6, height*2/4);
    this.cell[3] = new Cell([0,2,5,6],  true,  null, width*2/6, height*3/4);
    this.cell[4] = new Cell([1,5,7],    true,  null, width*3/6, height/4);
    this.cell[5] = new Cell([1,2,3,4,6,7,8,9], true, null, width*3/6, height*2/4);
    this.cell[6] = new Cell([3,5,9],    true,  null, width*3/6, height*3/4);
    this.cell[7] = new Cell([4,5,8,10], false, new Hound(width*4/6-55, height/4-55, false, 0), width*4/6, height/4);
    this.cell[8] = new Cell([5,7,9,10], true,  null, width*4/6, height*2/4);
    this.cell[9] = new Cell([5,6,8,10], false, new Hound(width*4/6-55, height*3/4-55, false, 1), width*4/6, height*3/4);
    this.cell[10] = new Cell([7,8,9],   false, new Hound(width*5/6-55, height*2/4-55, false, 2), width*5/6, height*2/4);
}

GameBoard.prototype.init = function(){
    // this.draw();
    let cells = this.cell;
    for( var i = 0; i < cells.length; i++){
        if(cells[i].piece !== null){
            cells[i].piece.init();
        } 
    }
};

GameBoard.prototype.draw = function(){
    ctx.fillStyle = 'rgba(43,100,35)';
    ctx.fillRect(0, 0, width, height);
    gameBoard.drawLine();
    let cells = this.cell;
    for(var i = 0; i < cells.length; i++){
        cells[i].draw();
    }
};

GameBoard.prototype.drawLine = function(){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(this.cell[1].x, this.cell[1].y);
    ctx.lineTo(this.cell[7].x, this.cell[7].y);
    ctx.moveTo(this.cell[0].x, this.cell[0].y);
    ctx.lineTo(this.cell[10].x, this.cell[10].y);
    ctx.moveTo(this.cell[3].x, this.cell[3].y);
    ctx.lineTo(this.cell[9].x, this.cell[9].y);
    ctx.moveTo(this.cell[1].x, this.cell[1].y);
    ctx.lineTo(this.cell[3].x, this.cell[3].y);
    ctx.moveTo(this.cell[4].x, this.cell[4].y);
    ctx.lineTo(this.cell[6].x, this.cell[6].y);
    ctx.moveTo(this.cell[7].x, this.cell[7].y);
    ctx.lineTo(this.cell[9].x, this.cell[9].y);
    ctx.moveTo(this.cell[1].x, this.cell[1].y);
    ctx.lineTo(this.cell[9].x, this.cell[9].y);
    ctx.moveTo(this.cell[7].x, this.cell[7].y);
    ctx.lineTo(this.cell[3].x, this.cell[3].y);
    ctx.moveTo(this.cell[0].x, this.cell[0].y);
    ctx.lineTo(this.cell[1].x, this.cell[1].y);
    ctx.moveTo(this.cell[0].x, this.cell[0].y);
    ctx.lineTo(this.cell[3].x, this.cell[3].y);
    ctx.moveTo(this.cell[10].x, this.cell[10].y);
    ctx.lineTo(this.cell[7].x, this.cell[7].y);
    ctx.moveTo(this.cell[10].x, this.cell[10].y);
    ctx.lineTo(this.cell[9].x, this.cell[9].y);
    ctx.lineWidth = 10;
    ctx.stroke();
}

GameBoard.prototype.drawHint = function(startP, endP){
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(startP.x,startP.y);
    ctx.lineTo(endP.x, endP.y);
    ctx.stroke();
}

function Piece(x, y, clicked){
    this.x = x;
    this.y = y;
    this.clicked = clicked;
}

Piece.prototype.init = function(){};
Piece.prototype.draw = function(){};
Piece.prototype.update = function(){};
Piece.prototype.getSurrounding =  function(){};

function Hare(x, y, clicked){
    Piece.call(this,x ,y ,clicked);
    this.img = new Image();
    this.imgSrc = 'images/hare.png';
}
Hare.prototype = Object.create(Piece.prototype);
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

Hare.prototype.isFree = function(){}

function Hound(x, y, clicked, index){
    Piece.call(this, x, y, clicked);
    this.index = index;
    this.img = new Image();
    this.imgSrc = 'images/hound.png';
}
Hound.prototype = Object.create(Piece.prototype);
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


let gameBoard = new GameBoard();
gameBoard.init();
let _hare = { 'current' : {}, 'index' : 0 };
let _hounds = { 'current' : new Array(3), 'index' : new Array(3) };
let houndsTurn = true;
let roundCounter = 1;
let _roundCounter = roundCounter;
let round = document.querySelector('h1');
let winOrLose = '';
let isEnd = false;


function getHareSurround(){
    var temp = gameBoard.cell[_hare.index].surrounding;
    var result = new Array();
    for(var i = 0; i < temp.length; i++){
        if(gameBoard.cell[temp[i]].isEmpty) result.push(temp[i]);   
    }
    return result;
}

function getHoundSurrounding(index){
    var col = Math.floor((index - 1) / 3);
    var max = (col + 1) * 3;
    var _surrounding = gameBoard.cell[index].surrounding;
    var new_surrounding = new Array();
    for(var i = 0; i < _surrounding.length; i++){
        if(_surrounding[i] <= max && gameBoard.cell[ _surrounding[i]].isEmpty === true){
            new_surrounding.push(_surrounding[i]);
        }
    }
    return new_surrounding;
}

function getAllHoundsSurrounding(){
    var houndsSurround = new Array;
    var temp_houndS = new Array;
    for(var i = 0 ; i < _hounds.current.length; i++){
        temp_houndS[i] = getHoundSurrounding(_hounds.index[i]);
    }
    temp_houndS = temp_houndS.flat();
    temp_houndS.sort((a,b) => a - b);
    for(var i = 0 ; i < temp_houndS.length; i++){
        var temp = temp_houndS[i];
        for(var j = i+1; j < temp_houndS.length; j++){
            if(temp === temp_houndS[j]) temp_houndS[j] = undefined;
        }
    }
    houndsSurround = temp_houndS.sort((a,b) => a - b).filter(a => a !== undefined);
    return houndsSurround;
}

function getHareIsFree(){
    var isFree = false;
    var hareSurround = getHareSurround();
    var houndsSurround = getAllHoundsSurrounding();
    for(var i = 0; i < hareSurround.length; i++){
        if(houndsSurround.indexOf(hareSurround[i]) === -1 &&
           houndsSurround.findIndex(e => e > hareSurround[i]) === -1 &&
           hareSurround[i] > 0 &&
           roundCounter > 2){ 
            isFree = true;
            break;
        }
    }
    return isFree;
}

function EndGame(id, string){
    canvas.removeEventListener('click',test);
    cancelAnimationFrame(id);
    alert('Hare is '+string);
}

let test = function(event){
    //2. 如果已經點擊過Hare，確認是否點擊在與其相連的格子內。
    if(_hare.current.clicked){
        _hare.current.clicked = false;
        for( var j = 0; j < gameBoard.cell[_hare.index].surrounding.length; j++){
            var selectP = gameBoard.cell[_hare.index].surrounding[j];
            var originX = gameBoard.cell[selectP].x;
            var originY = gameBoard.cell[selectP].y;
            if(Math.sqrt((event.x - originX)*(event.x - originX) + (event.y - originY)*(event.y - originY))
                <= gameBoard.cell[_hare.index].size &&
                gameBoard.cell[selectP].isEmpty){
                console.log("nice");
                //將兔子移動到點選的位置
                _hare.current.x = originX - _hare.current.img.width/2;
                _hare.current.y = originY - _hare.current.img.height/2;
                gameBoard.cell[_hare.index].isEmpty = true;
                gameBoard.cell[_hare.index].piece = null;
                gameBoard.cell[selectP].isEmpty = false; 
                gameBoard.cell[selectP].piece = _hare.current;
                //---------------------
                houndsTurn = !houndsTurn;
                roundCounter++;
                j = gameBoard.cell[_hare.index].surrounding.length;
            }
        }
    }
        //3. 如果已經點擊過Hound，確認是否點擊在與其相連的格子內。
    for(var i = 0; i < _hounds.current.length; i++){
        if(_hounds.current[i].clicked){
            _hounds.current[i].clicked = false;
            _s = getHoundSurrounding(_hounds.index[i]);
            for( var j = 0; j < _s.length; j++){
                var selectP = _s[j];
                var originX = gameBoard.cell[selectP].x;
                var originY = gameBoard.cell[selectP].y;
                if(Math.sqrt((event.x - originX)*(event.x - originX) + (event.y - originY)*(event.y - originY))
                    <= gameBoard.cell[_hounds.index[i]].size &&
                    gameBoard.cell[selectP].isEmpty){
                    console.log("nice");
                    //將獵犬移動到點選的位置
                    _hounds.current[i].x = originX - _hounds.current[i].img.width/2;
                    _hounds.current[i].y = originY - _hounds.current[i].img.height/2;
                    gameBoard.cell[_hounds.index[i]].isEmpty = true;
                    gameBoard.cell[_hounds.index[i]].piece = null;
                    gameBoard.cell[selectP].isEmpty = false; 
                    gameBoard.cell[selectP].piece = _hounds.current[i];
                    //---------------------
                    houndsTurn = !houndsTurn;
                    roundCounter++;
                    j = gameBoard.cell[_hounds.index[i]].surrounding.length;
                }
            }
        }
    }

    //1. 是否點擊在Pawn的範圍上
    if( (event.clientX >= _hare.current.x) &&
        (event.clientX <= _hare.current.x + _hare.current.img.width) &&
        (event.clientY >= _hare.current.y) &&
        (event.clientY <= _hare.current.y + _hare.current.img.height) &&
        houndsTurn === false){
        _hare.current.clicked = true;
        console.log("hare");
    }
    for(var i = 0; i < _hounds.current.length; i++){
        if( (event.clientX >= _hounds.current[i].x) &&
            (event.clientX <= _hounds.current[i].x + _hounds.current[i].img.width) &&
            (event.clientY >= _hounds.current[i].y) &&
            (event.clientY <= _hounds.current[i].y + _hounds.current[i].img.height) &&
            houndsTurn === true && _hare.current.clicked === false){
            console.log("hound "+i);
            _hounds.current[i].clicked = true;
            console.log(getHoundSurrounding(_hounds.index[i]));
        }
    }
}
canvas.addEventListener('click', test);

function loop(){
    if(_roundCounter !== roundCounter){
        round.innerHTML = '現在回合 : ' + roundCounter;
    }
    _roundCounter = roundCounter;

    //抓Hare和Hound的資料
    var houndNum = 0;
    for( var i = 0; i < gameBoard.cell.length; i++){
        if( gameBoard.cell[i].piece !== null){
            if( gameBoard.cell[i].piece.constructor === Hare){
                _hare.current = gameBoard.cell[i].piece; 
                _hare.index = i;
            }else if( gameBoard.cell[i].piece.constructor === Hound){
                _hounds.current[houndNum] = gameBoard.cell[i].piece;
                _hounds.index[houndNum] = i;
                houndNum++;
            }
        }
    }

    //畫棋盤和提示
    gameBoard.draw();
    if(_hare.current.clicked){
        for( var i = 0; i < gameBoard.cell[_hare.index].surrounding.length; i++){
            if(gameBoard.cell[gameBoard.cell[_hare.index].surrounding[i]].isEmpty){
                gameBoard.drawHint(gameBoard.cell[_hare.index], gameBoard.cell[gameBoard.cell[_hare.index].surrounding[i]]);
                gameBoard.cell[gameBoard.cell[_hare.index].surrounding[i]].draw();
                gameBoard.cell[gameBoard.cell[_hare.index].surrounding[i]].drawHint();
            }
            if(i === gameBoard.cell[_hare.index].surrounding.length - 1){
                gameBoard.cell[_hare.index].draw();
            }
        }
    }
    for( var i = 0; i < _hounds.current.length; i++){
        if(_hounds.current[i].clicked){
            var _s = getHoundSurrounding(_hounds.index[i]);
            for( var j = 0; j < _s.length; j++){
                if(gameBoard.cell[_s[j]].isEmpty){
                    gameBoard.drawHint(gameBoard.cell[_hounds.index[i]], gameBoard.cell[_s[j]]);
                    gameBoard.cell[_s[j]].draw();
                    gameBoard.cell[_s[j]].drawHint();
                }

                if(j === _s.length - 1){
                    gameBoard.cell[_hounds.index[i]].draw();
                }
            }
        }
    }
    var id = 0;
    id = requestAnimationFrame(loop);

    //判斷兔子贏或輸，其中一個成立就停止遊戲。
    //兔子是否贏
    if(roundCounter >= 30 || getHareIsFree()){
        isEnd = true;
        winOrLose = 'Win';
    }else{
        //兔子是否輸
        var count = gameBoard.cell[_hare.index].surrounding;
        var num = 0;
        for(var i = 0; i < count.length; i++){
            if(gameBoard.cell[count[i]].isEmpty===false) num++;
        }
        if(num === count.length){
            isEnd = true;
            winOrLose = 'Lose';
        }
    }

    if(isEnd){
        EndGame(id, winOrLose);
    }

}

loop();