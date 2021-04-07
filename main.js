//=====================constant=====================
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

//1536*754
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//=====================objects=====================
function Grid(surrounding, isEmpty, piece, x, y, size){
    this.surrounding = surrounding;
    this.isEmpty = isEmpty;
    this.piece = piece;
    this.x = x;
    this.y = y;
    this.size = size;
}

Grid.prototype.drawHint = function(){
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.arc(this.x , this.y, this.size, 0, 2 * Math.PI);
    ctx.lineWidth = 10;
    ctx.stroke();
}

Grid.prototype.draw = function(){
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    if(this.piece !== null){
        //在init前會執行一次。但是這時image沒有src，圖跑不出來。
        this.piece.draw();
    }
};

function Field(){
    this.grid = new Array(11);
    this.grid[0] = new Grid([1,2,3],    false, new Hare(173, 322, false), 228, 377, 70);
    this.grid[1] = new Grid([0,2,4,5],  true,  null, 498, 149, 70);
    this.grid[2] = new Grid([0,1,3,5],  true,  null, 498, 377, 70);
    this.grid[3] = new Grid([0,2,5,6],  true,  null, 498, 605, 70);
    this.grid[4] = new Grid([1,5,7],    true,  null, 768, 149, 70);
    this.grid[5] = new Grid([1,2,3,4,6,7,8,9], true, null, 768, 377, 70);
    this.grid[6] = new Grid([3,5,9],    true,  null, 768, 605, 70);
    this.grid[7] = new Grid([4,5,8,10], false, new Hound(983, 94, false, 0), 1038, 149, 70);
    this.grid[8] = new Grid([5,7,9,10], true,  null, 1038, 377, 70);
    this.grid[9] = new Grid([5,6,8,10], false, new Hound(983, 550, false, 1), 1038, 605, 70);
    this.grid[10] = new Grid([7,8,9],   false, new Hound(1258, 322, false, 2), 1308, 377, 70);
}

Field.prototype.init = function(){
    // this.draw();
    let grids = this.grid;
    for( var i = 0; i < grids.length; i++){
        if(grids[i].piece !== null){
            grids[i].piece.init();
        } 
    }
};

Field.prototype.draw = function(){
    ctx.fillStyle = 'rgba(43,100,35)';
    ctx.fillRect(0, 0, width, height);
    field.drawLine();
    let grids = this.grid;
    for(var i = 0; i < grids.length; i++){
        grids[i].draw();
    }
};

Field.prototype.drawLine = function(){
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo(this.grid[1].x, this.grid[1].y);
    ctx.lineTo(this.grid[7].x, this.grid[7].y);
    ctx.moveTo(this.grid[0].x, this.grid[0].y);
    ctx.lineTo(this.grid[10].x, this.grid[10].y);
    ctx.moveTo(this.grid[3].x, this.grid[3].y);
    ctx.lineTo(this.grid[9].x, this.grid[9].y);
    ctx.moveTo(this.grid[1].x, this.grid[1].y);
    ctx.lineTo(this.grid[3].x, this.grid[3].y);
    ctx.moveTo(this.grid[4].x, this.grid[4].y);
    ctx.lineTo(this.grid[6].x, this.grid[6].y);
    ctx.moveTo(this.grid[7].x, this.grid[7].y);
    ctx.lineTo(this.grid[9].x, this.grid[9].y);
    ctx.moveTo(this.grid[1].x, this.grid[1].y);
    ctx.lineTo(this.grid[9].x, this.grid[9].y);
    ctx.moveTo(this.grid[7].x, this.grid[7].y);
    ctx.lineTo(this.grid[3].x, this.grid[3].y);
    ctx.moveTo(this.grid[0].x, this.grid[0].y);
    ctx.lineTo(this.grid[1].x, this.grid[1].y);
    ctx.moveTo(this.grid[0].x, this.grid[0].y);
    ctx.lineTo(this.grid[3].x, this.grid[3].y);
    ctx.moveTo(this.grid[10].x, this.grid[10].y);
    ctx.lineTo(this.grid[7].x, this.grid[7].y);
    ctx.moveTo(this.grid[10].x, this.grid[10].y);
    ctx.lineTo(this.grid[9].x, this.grid[9].y);
    ctx.lineWidth = 10;
    ctx.stroke();
}

Field.prototype.drawHint = function(startP, endP){
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


let field = new Field();
field.init();
let _hare = { 'current' : {}, 'index' : 0 };
let _hounds = { 'current' : new Array(3), 'index' : new Array(3) };
let houndsTurn = true;
let roundCounter = 1;
let round = document.querySelector('h1');
let winOrLose = '';
let isEnd = false;


function getHareSurround(){
    var temp = field.grid[_hare.index].surrounding;
    var result = new Array();
    for(var i = 0; i < temp.length; i++){
        if(field.grid[temp[i]].isEmpty) result.push(temp[i]);   
    }
    return result;
}

function getHoundSurrounding(index){
    var col = Math.floor((index - 1) / 3);
    var max = (col + 1) * 3;
    var _surrounding = field.grid[index].surrounding;
    var new_surrounding = new Array();
    for(var i = 0; i < _surrounding.length; i++){
        if(_surrounding[i] <= max && field.grid[ _surrounding[i]].isEmpty === true){
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
        for( var j = 0; j < field.grid[_hare.index].surrounding.length; j++){
            var selectP = field.grid[_hare.index].surrounding[j];
            var originX = field.grid[selectP].x;
            var originY = field.grid[selectP].y;
            if(Math.sqrt((event.x - originX)*(event.x - originX) + (event.y - originY)*(event.y - originY))
                <= field.grid[_hare.index].size &&
                field.grid[selectP].isEmpty){
                console.log("nice");
                //將兔子移動到點選的位置
                _hare.current.x = originX - _hare.current.img.width/2;
                _hare.current.y = originY - _hare.current.img.height/2;
                field.grid[_hare.index].isEmpty = true;
                field.grid[_hare.index].piece = null;
                field.grid[selectP].isEmpty = false; 
                field.grid[selectP].piece = _hare.current;
                //---------------------
                houndsTurn = !houndsTurn;
                roundCounter++;
                j = field.grid[_hare.index].surrounding.length;
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
                var originX = field.grid[selectP].x;
                var originY = field.grid[selectP].y;
                if(Math.sqrt((event.x - originX)*(event.x - originX) + (event.y - originY)*(event.y - originY))
                    <= field.grid[_hounds.index[i]].size &&
                    field.grid[selectP].isEmpty){
                    console.log("nice");
                    //將獵犬移動到點選的位置
                    _hounds.current[i].x = originX - _hounds.current[i].img.width/2;
                    _hounds.current[i].y = originY - _hounds.current[i].img.height/2;
                    field.grid[_hounds.index[i]].isEmpty = true;
                    field.grid[_hounds.index[i]].piece = null;
                    field.grid[selectP].isEmpty = false; 
                    field.grid[selectP].piece = _hounds.current[i];
                    //---------------------
                    houndsTurn = !houndsTurn;
                    roundCounter++;
                    j = field.grid[_hounds.index[i]].surrounding.length;
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
    round.innerHTML = '現在回合 : ' + roundCounter;

    //抓Hare和Hound的資料
    var houndNum = 0;
    for( var i = 0; i < field.grid.length; i++){
        if( field.grid[i].piece !== null){
            if( field.grid[i].piece.constructor === Hare){
                _hare.current = field.grid[i].piece; 
                _hare.index = i;
            }else if( field.grid[i].piece.constructor === Hound){
                _hounds.current[houndNum] = field.grid[i].piece;
                _hounds.index[houndNum] = i;
                houndNum++;
            }
        }
    }

    //畫棋盤和提示
    field.draw();
    if(_hare.current.clicked){
        for( var i = 0; i < field.grid[_hare.index].surrounding.length; i++){
            if(field.grid[field.grid[_hare.index].surrounding[i]].isEmpty){
                field.drawHint(field.grid[_hare.index], field.grid[field.grid[_hare.index].surrounding[i]]);
                field.grid[field.grid[_hare.index].surrounding[i]].draw();
                field.grid[field.grid[_hare.index].surrounding[i]].drawHint();
            }
            if(i === field.grid[_hare.index].surrounding.length - 1){
                field.grid[_hare.index].draw();
            }
        }
    }
    for( var i = 0; i < _hounds.current.length; i++){
        if(_hounds.current[i].clicked){
            var _s = getHoundSurrounding(_hounds.index[i]);
            for( var j = 0; j < _s.length; j++){
                if(field.grid[_s[j]].isEmpty){
                    field.drawHint(field.grid[_hounds.index[i]], field.grid[_s[j]]);
                    field.grid[_s[j]].draw();
                    field.grid[_s[j]].drawHint();
                }

                if(j === _s.length - 1){
                    field.grid[_hounds.index[i]].draw();
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
        var count = field.grid[_hare.index].surrounding;
        var num = 0;
        for(var i = 0; i < count.length; i++){
            if(field.grid[count[i]].isEmpty===false) num++;
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