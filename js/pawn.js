//module "pawn.js"

export function Pawn(type,no){
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
        this.positionData.isEmpty = true;
        delete this.positionData.pawn;

        this.position = index;
        this.positionData = GS.field.units[this.position];
        this.positionData.isEmpty = false;
        this.positionData.pawn = type;
    };

    console.log(`Create new ${this.type} pawn ${this.number !== undefined ? "No."+this.number : ""}`);
}