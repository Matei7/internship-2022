import "../css/styles.scss";

// Exercise 1&5 a
function productMark(n1, n2, n3){
    if ((n1 * n2 * n3) >= 0){
        return "PLUS"
    }
    else return "MINUS";
}

// Exercise 2a
function sumOfFirstNumber(n){
    let sum = 0;
    for(let i = 1; i <= n; i+=1){
        sum += i;
    }
    return sum;
}

// Exercise 2b
function lessThan10000(num){
    while (num < 10000){
        num *= Math.random()*10
        console.log(num);
    }
}
// Exercise 3a
function makeArray(){
    let arr = [...Array(50).keys()];
    arr = arr.concat([89, 99, 120, 412, 124]);
    return arr;
}
// Exercise 3b
function removeLastElement(array){
    array.pop();
    return array;
}
// Exercise 4a


function main(){
    // alert(productMark(1, 2, -4))
    // alert(sumOfFirstNumber(1000));
    // lessThan10000(2)
    // console.log(makeArray())
    // console.log(removeLastElement(makeArray()))
/*
    // Exercise 4a
    let user = {
        name: undefined,
        age: undefined
    };
    console.log(user);
*/

}
main()

