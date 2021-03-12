//module "field.js"

export function Field(){
    this.units = new Array(10);

    function Unit(connectList,isEmpty){
        this.connectTo = connectList;
        this.isEmpty = isEmpty;
        console.log("Create new unit object");
    }

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

    console.log("Create new field array");
}