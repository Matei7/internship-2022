import "../css/styles.scss";

let productSign = (n1, n2, n3) => {
    let sign = 1;
    sign *= Math.sign(n1);
    sign *= Math.sign(n2);
    sign *= Math.sign(n3);
    return (sign === -1  ? 'MINUS' : 'PLUS');
}

let secretBox = (weight) =>{
    switch(weight){
        case 10:
            return 'A pen';
        case 200:
            return 'A cat';
        case 3000:
            return 'A dog';
        case 40000:
            return 'A horse';
        case 5000000:
            return 'A car';
        default:
            return 'A truckload of bunnies';
    }
}
let sum = (n) =>{
    return (n !== 0) ? n + sum(n-1) : 0;
}

let randList = (size) => {
    let res = '';
    for(let i = 1; i < size-1; i ++){
        res += i * Math.random()*10 + ',';
    }
    res += (size-1) * Math.random()*10;
    return res;
}

let arrayMerge= () => {
    let arr1 = [...Array(50).keys()];
    let arr2 = [89, 99, 120, 412, 124, 130] //added 130 at the end and popped it to solve both 3a, 3b in one
    let res = arr1.concat(arr2);
    res.pop();
    return res;
}

let filterDivThree= (arr) =>{
    return arr.filter(el => el % 3);
}

const obj = {
    age : "20",
    firstName: "Dum",
    LastName: "Dum"
};

let testSum = () =>{
    let test = [1,5,10,25,1000]
    let res = '';
    for(let i = 0; i < test.length; i ++){
        res += 'Sum for '+  test[i] + ' is: ' + sum(test[i]) + '\n';
    }
    return res;
}


let testSecretBox = () =>{
    let test = [0,10 , 15, 200, 250,3000, 30001, 40000, 40001, 5000000]
    let res = '';
    for(let i = 0; i < test.length; i ++){
        res += test[i] + ' = ' + secretBox(test[i]) + '\n';
    }
    return res;
}

let testProductSign = () =>{
    let testSize = 2;
    let res = '';
    for(let i = -testSize; i <= testSize; i ++) {
        for(let j = -testSize; j <= testSize; j ++) {
            for(let k = -testSize; k <= testSize; k ++) {
                res += i + '*' + j + '*' + k + '=' + productSign(i, j, k) + '\n';
            }
        }
    }
    return res;
}


console.log(testProductSign());
console.log(testSecretBox());
console.log(testSum());
console.log(randList(10000));
console.log(arrayMerge());
console.log(obj);
console.log(filterDivThree(arrayMerge()));

