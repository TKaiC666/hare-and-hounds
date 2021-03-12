//import Field from './field.js';

let GS = CreateGamesystem();
GS.initial();
GS.running();

function CreateGamesystem(){
    let GS = {};
    GS.field;
    GS.hounds = new Array(3);
    GS.rabbit;
    GS.player;
    GS.CPU;

    GS.initial = function(){

        console.log("intial start");

        GS.field = new Field();
        for(var i = 0; i < GS.hounds.length; i++){
            GS.hounds[i] = new Pawn("hound",i+1);
        }
        GS.rabbit = new Pawn("rabbit");
        GS.player = GS.rabbit.type;
        GS.CPU = GS.hounds[0].type;
        
        function Field(){
            this.units = new Array(10);
            this.units[0] = new Unit([1,2,3],true);
            this.units[1] = new Unit([0,2,4,5],true);
            this.units[2] = new Unit([0,1,3,5],true);
            this.units[3] = new Unit([0,2,5,6],true);
            this.units[4] = new Unit([1,5,7],true);
            this.units[5] = new Unit([1,2,3,4,6,7,8,9],true);
            this.units[6] = new Unit([3,5,9],true);
            this.units[7] = new Unit([4,5,8,10],true);
            this.units[8] = new Unit([5,7,9,10],true);
            this.units[9] = new Unit([5,6,8,10],true);
            this.units[10] = new Unit([7,8,9],true);
            this.getMovable = function(index){
                let arr = new Array();
                let target = this.units[index].connectTo;
                for(var i = 0; i < target.length; i++){
                    if(this.units[target[i]].isEmpty) arr.push(target[i]);
                }
                return arr;
            }
            this.getUnits = function(){
                return this.units;
            }
        
            function Unit(connectList,isEmpty){
                this.connectTo = connectList;
                this.isEmpty = isEmpty;
                console.log("Create new unit object");
            }
            
        
            console.log("Create new field array");
        }

        function Pawn(type,no){
            let index = 0;
            this.type=type;
        
            if(type === "rabbit"){
                index = 0;
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
            }
            else{
                console.error("Wrong parameter : type unfound");
                return undefined;
            }
        
            this.position = index;
            this.positionData = GS.field.units[this.position];
            this.positionData.isEmpty = false;
            this.positionData.pawn = type;
        
            this.moveTo = function(index){
                var old = this.position;
                this.positionData.isEmpty = true;
                delete this.positionData.pawn;
        
                this.position = index;
                this.positionData = GS.field.units[this.position];
                this.positionData.isEmpty = false;
                this.positionData.pawn = type;
                console.log(`${this.type}${this.number !== undefined ? this.number : ""} move from ${old} to ${this.position}`);
            };
        
            console.log(`Create new ${this.type} pawn ${this.number !== undefined ? "No."+this.number : ""}`);
        }
        
        console.log("intial finish");

    };
    

    //先實作一種對戰狀態，玩家兔子 vs CPU獵犬
    //遊戲規則是獵犬先手
    GS.running = function(){

        console.log("running game...");

        let player;
        let CPU;

        pawnSetting("rabbit");
        while(judgement){
            houndsTurn();
            rabbitTurn();
            console.log(this.field.getUnits());
        }
        // houndsTurn();
        // rabbitTurn();
        return true;

        function pawnSetting(playerSelec){
            player = playerSelec;
            CPU = player === "rabbit" ? "hounds" : "rabbit";
            console.log(`${player} is player, ${CPU} is CPU`);
        }

        function houndsTurn(){
            let randNum = Math.floor(Math.random() * 3);
            let moveRange = GS.field.units[GS.hounds[randNum].position].connectTo;
            let randTarget = Math.floor(Math.random() * moveRange.length);
            let newPosition;
            while(GS.field.units[moveRange[randTarget]].isEmpty !== true){
                randTarget = Math.floor(Math.random() * moveRange.length);
            }
            newPosition = moveRange[randTarget];
            GS.hounds[randNum].moveTo(newPosition);
        }

        function rabbitTurn(){
            //for test
            let targetIndex = GS.rabbit.position;
            let possibleRange = GS.field.getMovable(targetIndex);
            console.log(possibleRange);
            let hint = possibleRange;
            let newPosition = prompt(`請問下一步要往?\n可前往${hint}\n`);
            GS.rabbit.moveTo(newPosition);
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


