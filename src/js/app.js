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