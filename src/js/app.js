import "../css/styles.scss";


console.log("hello world!");

function conditionals1a(){
    var firstNumber = prompt("Enter the first number");
    var secondNumber = prompt("Enter the second number");
    var thirdNumber = prompt("Enter the third number");


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
    var i;
    var sum = 0;
    var n = prompt("Enter the number");
    for(i = 1; i<=n;i++)
    {
        sum = sum+i;
    }
    console.log(sum);
}

function loops1b(){
    var n = prompt("Enter the number");
    var result;
    while(n<10000)
    {
        result = n * Math.random()*10;
    }

    console.log(result);

}

function main()
{
    //console.log(conditionals1a());
    //console.log(loops1a());
    console.log(loops1b());
}
main()




