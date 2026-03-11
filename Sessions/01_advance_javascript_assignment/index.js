//Spread operator
//1. 
function convertToArray(a){
    return [...String(a)];
}

//2.
var alphabets = ["A", ..."BCD", "E"];
console.log(alphabets); 
//["A", "B", "C", "D", "E"]

//3.
console.log(...[,,]);
// undefined undefined

//Object/Array Destructuring

//2.  
const arrValue = ["one", ["two", "three"]];
const [x, [y, z]] = arrValue;
console.log(x);
console.log([y,z]); 
console.log(z); 
//one
//[ 'two', 'three' ]
//three

//3.
let arrValue = [10];
let [x = 5,  y = 7] = arrValue;
console.log(x);
console.log(y);
//10
//7

//4.
const [a, b, ...[ length ]] = [1, 2, 3,4,5];
console.log(a, b, length);
//1 2 3


//5.

const [a, b, ...{ length }] = [1, 2, 3,4,5,6];
console.log(a, b, length);
//1 2 4


// Call, Apply and Bind

let person1 = {
    firstName : "Krunal",
    lastName : "Khairanar",
    getFullName : function(){
        return this.firstName + " " + this.lastName;
    }
}

let person2 = {
    firstName : "chintan",
    lastName : "Thacker"
}

console.log(person1.getFullName.call(person2));

// Prototype

Array.prototype.PrintReverse = function() {
    for(let i = this.length - 1; i >= 0; i--){
        console.log(this[i]);
    }
}

let arr = [1, 2, 3, 4, 5];
arr.PrintReverse();
