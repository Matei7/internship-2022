import "../css/styles.scss";

///objects

var person = {
    age: 22,
    firstName: "Mihai",
    lastName: "Tudor"
};

///functions

function justCheckingTheSign(n1, n2, n3){
    if ((n1 > 0 && n2 > 0 && n3 > 0) ||
        (n1 > 0 && n2 < 0 && n3 < 0) ||
        (n1 < 0 && n2 > 0 && n3 < 0) ||
        (n1 < 0 && n2 < 0 && n3 > 0)) {
        return "PLUS";
    }
    else{
        return "MINUS";
    }
    ///este o functie sign care returneaza 1/0/-1 si in functie de ea sa fac verificare
}

console.log(justCheckingTheSign(1,2,3));
console.log(justCheckingTheSign(1,2,-3));
console.log(justCheckingTheSign(1,-2,-3));
console.log(justCheckingTheSign(-1,-2,-3));

///b.-ul ii la partea de arrays

///classes - ES5
function Human(fullName){
    this.fullName = fullName;
    this.callMe = function(){
        console.log("HI I'M " + this.fullName);
    };
}

var myInstance = new Human("Tudor Mihai");
myInstance.callMe();

///arrays
//a.
const numbers = []
for(let i = 0; i < 50; ++i){
    numbers.push(i);
}

numbers = [...numbers, 89, 99, 120, 412, 124]

for(let i = 0; i < numbers.length; ++i){
    console.log(numbers[i]);
}

//b.
console.log(numbers[numbers.length - 1]);
numbers.pop();
console.log(numbers[numbers.length - 1]);

//5 b.
function notDivisible(theArray){
    theArray.forEach(element => {
        if (element % 3 !== 0)
            console.log(element)
    });
}

notDivisible(numbers);

///loops
//a.
function sum(n){
    console.log(n*(n + 1) / 2);
}

sum(1000);

//b.
function multiply(n){
    while (n < 10000){
        console.log(n * Math.random() * 10);
        n++;
    }
}

multiply(9996);
multiply(10000);

///conditionals
//a.
var n1 = -4;
var n2 = -5;
var n3 = 2;

if ((n1 > 0 && n2 > 0 && n3 > 0) ||
    (n1 > 0 && n2 < 0 && n3 < 0) ||
    (n1 < 0 && n2 > 0 && n3 < 0) ||
    (n1 < 0 && n2 < 0 && n3 > 0)) {
    console.log("PLUS");
}
else{
    console.log("MINUS");
}

//b.

function recalculate(a ,b){
    return a * b;
}

function aGuess(theWeight){
    var a = 10;
    var i = 1;
    if (theWeight == recalculate(a,i)){
        console.log("A pen");
        return;
    }
    a *= 10;
    i++;
    if (theWeight == recalculate(a,i)){
        console.log("A cat");
        return;
    }
    a *= 10;
    i++;
    if (theWeight == recalculate(a,i)){
        console.log("A dog");
        return;
    }
    a *= 10;
    i++;
    if (theWeight == recalculate(a, i)){
        console.log("A horse");
        return;
    }
    a *= 100;
    i++;
    if (theWeight == recalculate(a, i)){
        console.log("A car");
        return;
    }
    console.log("A truckload of bunnies");
}

///facut cu switch si retinut valorile dintr-o lista

aGuess(10);
aGuess(421);
aGuess(5000000);