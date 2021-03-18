//import Field from './field.js';

let GS = CreateGamesystem();
GS.init();
GS.running();

function CreateGamesystem(){
    let GS = {};
    GS.field;
    GS.hounds = new Array(3);
    GS.hare;
    GS.player;
    GS.CPU;

    GS.init = function(){

        console.warn("initial start");

        GS.field = new Field();
        for(var i = 0; i < GS.hounds.length; i++){
            GS.hounds[i] = new Pawn("hound",i+1);
        }
        GS.hare = new Pawn("hare");
        GS.player = GS.hare.type;
        GS.CPU = GS.hounds[0].type;
        
        function Field(){
            this.pieces = new Array(10);
            this.pieces[0] = new Piece(0,[1,2,3],true);
            this.pieces[1] = new Piece(1,[0,2,4,5],true);
            this.pieces[2] = new Piece(2,[0,1,3,5],true);
            this.pieces[3] = new Piece(3,[0,2,5,6],true);
            this.pieces[4] = new Piece(4,[1,5,7],true);
            this.pieces[5] = new Piece(5,[1,2,3,4,6,7,8,9],true);
            this.pieces[6] = new Piece(6,[3,5,9],true);
            this.pieces[7] = new Piece(7,[4,5,8,10],true);
            this.pieces[8] = new Piece(8,[5,7,9,10],true);
            this.pieces[9] = new Piece(9,[5,6,8,10],true);
            this.pieces[10] = new Piece(10,[7,8,9],true);
            this.getMovable = function(index){
                let arr = new Array();
                let target = this.pieces[index].connectTo;
                for(var i = 0; i < target.length; i++){
                    if(this.pieces[target[i]].isEmpty) arr.push(target[i]);
                }
                return arr;
            }
            this.getPieces = function(){
                return this.pieces;
            }
        
            function Piece(index,connectList,isEmpty){
                this.connectTo = connectList;
                this.isEmpty = isEmpty;
                this.element = document.getElementsByClassName("piece")["p"+index];

                console.log("Create new piece");
            }
            
        
            console.log("Create new field");
        }

        function Pawn(type,no){
            let index = 0;
            let element = {};
            this.type=type;
        
            if(type === "hare"){
                index = 0;
                element = document.getElementsByClassName("hare")[0];
            }
            else if(type === "hound"){
                if(no===1) index = 7;
                else if(no===2) index = 10;
                else if(no===3) index = 9;
                else {
                    console.error("Wrong parameter : hound number is out of range");
                    return undefined;
                }
                this.number = no;
                element = document.getElementsByClassName("hound")[this.number-1];
            }
            else{
                console.error("Wrong parameter : type unfound");
                return undefined;
            }
        
            this.position = index;
            this.positionData = GS.field.pieces[this.position];
            this.positionData.isEmpty = false;
            this.positionData.pawn = type;
            this.element = element;
            this.selected = false;

            this.getConnectTo = function(){
                return this.positionData.connectTo;
            }

            this.getSelected = function(){
                return this.selected;
            }

            this.setSelected = function(bool){
                this.selected = bool;
            }
        
            this.moveTo = function(index){
                var old = this.position;
                this.positionData.isEmpty = true;
                delete this.positionData.pawn;
        
                this.position = index;
                this.positionData = GS.field.pieces[this.position];
                this.positionData.isEmpty = false;
                this.positionData.pawn = type;
                console.log(`${this.type}${this.number !== undefined ? this.number : ""} move from ${old} to ${this.position}`);
            };
        
            console.log(`Create new ${this.type} pawn ${this.number !== undefined ? "No."+this.number : ""}`);
        }
        
        console.warn("initial finish");

    };
    

    //先實作一種對戰狀態，玩家兔子 vs CPU獵犬
    //遊戲規則是獵犬先手
    GS.running = function(){
        console.warn("running game...");

        let wait = false;
        setEvent(this.hounds[1]);
        setEvent(this.hare);

        function setEvent(pawn){
            let target = pawn;
            let connectList = target.positionData.connectTo;
            let index = 0;
            let around;
            let once = {once : true};
            target.element.parentElement.addEventListener('click',selectPawn,once);
            wait = true;
            function selectPawn(){
                console.log(`select ${target.type}`);
                for (let i = 0; i < connectList.length; i++){
                    console.log("creat click event of piece["+connectList[i]+"]");
                    around = GS.field.pieces[connectList[i]].element;
                    around.addEventListener('click',setAround);
                }
            }

            function setAround(event){
                index = Number(event.target.id.substring(1));
                target.moveTo(index);
                target.element.parentElement.removeChild(target.element.parentElement.lastElementChild);
                event.target.appendChild(target.element);
                target.setSelected(false);
                for (let i = 0; i < connectList.length; i++){
                    around = GS.field.pieces[connectList[i]].element;
                    around.removeEventListener('click',setAround);
                    console.log("remove click event of piece["+connectList[i]+"]");
                }
                wait = false;
            }
        }

        function removeEvent(pawn){

        }

        function judgement(){
            return true;
        }
    };   

    GS.endGame = function(){
        return true;
    }; 

    return GS;
}


