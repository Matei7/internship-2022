function sumOfThree(number1, number2, number3){
    return(Math.sign(number1 * number2 * number3) < 0 ? 'MINUS' : 'PLUS');
}

//de terminat
function secretSurprise(){
    let aPen = 10, aCat = 200, aDog = 3000, aHorse = 40000, aCar = 5000000;

    let chosenObject = aPen;

    for(let i = 0; i < 5; i++){
        console.log("Take a guess: ");



        console.log(input == chosenObject ? "Yes, you got it!" : "No, take another guess");
    }
}

function sumForFirstNNumbers(n){
    let sum = 0;
    for(let i = 1; i <= n; i++)
        sum += i;

    return sum;
}

function randomNumbers(n){
    while(n < 10000.0){
        n = n * Math.random() * 10;
        console.log("Number: " + n);
    }
}

function createArray(){
    const numbers = [];
    for(let i = 1; i <= 50; i++)
        numbers.push(i);

    numbers.push(89, 99, 120, 412, 124);

    console.log(numbers.pop());

    for(let i = 0; i < numbers.length; i++)
        console.log(numbers.at(i) % 3 === 0 ? numbers.at(i) : "");
}

const object = {age: 31, firstName: "Razvan", secondName: "Codrescu"};

class Human{
    #fullName;

    constructor(fullName){
        this.#fullName = fullName;
    }

    method(){
        console.log("HI I'M " + this.#fullName);
    }

}

let human = new Human("Razvan");
human.method();

//console.log(createArray());
//console.log(randomNumbers(13));
//console.log(sumForFirstNNumbers(1000));
//console.log(sumOfThree(1, 2, -1));