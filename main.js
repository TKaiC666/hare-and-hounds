let GameManager = CreateGM();
GameManager.initial();

function CreateGM(){
    let GM = {};
    let field;
    let hound1,
        hound2,
        hound3;
    let rabbit;

    GM.initial = function(){

        console.log("intial start");

        field = createNewField();
        hound1 = createNewPawn("hound",1);
        hound2 = createNewPawn("hound",2);
        hound3 = createNewPawn("hound",3);
        rabbit = createNewPawn("rabbit");
        
        function createNewField(){
            let new_field = new Array(10);
        
            function createNewGridUnit(connectList,emptyState){
                let obj_gridUnit={};
                obj_gridUnit.connectTo = connectList;
                obj_gridUnit.isEmpty = emptyState;
                console.log("Create new grid unit object");
                return obj_gridUnit;
            }
        
            new_field[0] = createNewGridUnit([1,2,3],true);
            new_field[1] = createNewGridUnit([0,2,4,5],true);
            new_field[2] = createNewGridUnit([0,1,3,5],true);
            new_field[3] = createNewGridUnit([0,2,5,6],true);
            new_field[4] = createNewGridUnit([1,5,7],true);
            new_field[5] = createNewGridUnit([1,2,3,4,6,7,8,9],true);
            new_field[6] = createNewGridUnit([3,5,9],true);
            new_field[7] = createNewGridUnit([4,5,8,10],true);
            new_field[8] = createNewGridUnit([5,7,9,10],true);
            new_field[9] = createNewGridUnit([5,6,8,10],true);
            new_field[10] = createNewGridUnit([7,8,9],true);
        
            console.log("Create new field array");
            return new_field;
        }
        
        function createNewPawn(type,no){
            let obj = {};
            let index = 0;
            obj.type=type;
        
            if(type === "rabbit"){
                index = 0;
            }
            else if(type === "hound"){
                if(no===1) index = 7;
                else if(no===2) index = 8;
                else if(no===3) index = 9;
                else {
                    console.error("Wrong parameter : hound number is out of range");
                    return undefined;
                }
                obj.number = no;
            }
            else{
                console.error("Wrong parameter : type unfound");
                return undefined;
            }
        
            obj.positionIndex = index;
            obj.positionData = field[obj.positionIndex];
            obj.positionData.isEmpty = false;
        
            obj.moveTo = function(index){
                this.positionData.isEmpty = true;
                this.positionIndex = index;
                this.positionData = field[this.positionIndex];
                this.positionData.isEmpty = false;
            };
        
            console.log(`Create new ${obj.type} pawn ${obj.number !== undefined ? "No."+obj.number : ""}`);
            return obj;
        }
        
        console.log("intial finish");
    };

    GM.runGame = function(){};
    GM.endGame = function(){};

    return GM;
}


