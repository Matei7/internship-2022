import "../css/styles.scss";

console.log("hello world!");

function conditionals1a(){
    let firstNumber = prompt("Enter the first number");
    let secondNumber = prompt("Enter the second number");
    let thirdNumber = prompt("Enter the third number");


    if (firstNumber > 0 && secondNumber > 0 && thirdNumber > 0) {
        console.log("PLUS");
    }
    else {
        if (firstNumber < 0 && secondNumber < 0 && thirdNumber < 0) {
            console.log("MINUS");
        } else {
            if (firstNumber < 0 && secondNumber < 0 && thirdNumber > 0) {
                console.log("PLUS");
            } else {
                if (firstNumber > 0 && secondNumber < 0 && thirdNumber < 0) {
                    console.log("PLUS");
                }
                else
                {
                    console.log("MINUS");
                }
            }
        }
    }
}

function loops1a(){
    let i;
    let sum = 0;
    let n = prompt("Enter the number");
    for(i = 1; i<=n;i++)
    {
        sum = sum+i;
    }
    console.log(sum);
}

function loops1b(){
    let n = prompt("Enter the number");
    let result = 0;
    while(n<10000)
    {
        result = n * Math.random()*10;
        console.log(result);
        n = result;
    }

}

function arrays1a1b(){

    let array = [];
    const numbers = [89, 99, 120, 412, 124];
    let k = 0;
    let i;
    for(i = 0; i < 50; i++){
        array[k++] = i;
    }
    console.log(array);
    array = array.concat(numbers);
    console.log(array);

    // Remove the last element from your current array
    array.pop();
    console.log(array);
}

function objects(){
    let person = {
        age: 22,
        firstName: "Mihaela",
        lastName: "Petricele"
    }
    console.log(person);
}

function ex1a(firstNumber,secondNumber,thirdNumber){
    if (firstNumber > 0 && secondNumber > 0 && thirdNumber > 0) {
        console.log("PLUS");
    }
    else {
        if (firstNumber < 0 && secondNumber < 0 && thirdNumber < 0) {
            console.log("MINUS");
        } else {
            if (firstNumber < 0 && secondNumber < 0 && thirdNumber > 0) {
                console.log("PLUS");
            } else {
                if (firstNumber > 0 && secondNumber < 0 && thirdNumber < 0) {
                    console.log("PLUS");
                }
                else
                {
                    console.log("MINUS");
                }
            }
        }
    }
}

function notDivisibleBy3(){

    let array = [];
    const numbers = [89, 99, 120, 412, 124];
    let k = 0;
    let i;
    for(i = 0; i < 50; i++){
        array[k++] = i;
    }
    console.log(array);
    array = array.concat(numbers);
    console.log(array);

    // Remove the last element from your current array
    array.pop();

    // Function that iterates over your 3.b array and console.log the numbers NOT divisible with 3
    let result = array.filter(i => array[i] % 3 !==0);
    console.log(result);
}

class myClass{
    #fullName;

    constructor(fullName) {
        this.#fullName = fullName;
    }

    myMethod(){
        return "HI I'M " + this.#fullName;
    }
}

function main()
{
    //console.log(conditionals1a());
    //console.log(loops1a());
    //console.log(loops1b());
    //arrays1a1b();
    //objects();
    //ex1a(20,15,-5);
    //notDivisibleBy3();

    let myObject = new myClass("Mihaela Petricele");
    console.log(myObject.myMethod());
}

main()




