import "../css/styles.scss";

let a, b, c, product;
a = 5;
b = 6;
c = -7;
product = a * b * c;
if (product >= 0)
{
    console.log("PLUS");
}
else
{
    console.log("MINUS");
}

var dict = {
    10: "pen",
    200: "cat",
    3000: "dog",
    40000: "horse",
    500000: "car"
};
const weight = prompt("What's the weight?");
let found = "false";
for(let value in dict)
{
    if (value == weight)
    {
        console.log(dict[value]);
        found = "true";
    }
}
if (found == "false")
{
    console.log("A truckload of bunnies");
}

const n = prompt("Give n");
let sum = 0;
for(let i = 1; i <= n; i++)
{
    sum += i;
}
console.log(sum);

//a.	You’re given a number. While the number is less than 10,000 print the results of multiplying it with Math.random()*10

let number = prompt("Give number");
while(number < 10000)
{
    number *= Math.random()*10;
    console.log(number);
}