//import "../css/styles.scss";

// 1.a
function nrPozNeg(){
   let a = prompt("Nr1");
   let b = prompt("Nr2");
   let c = prompt("Nr1");
   let prod=a*b*c;
   if (prod > 0){
       alert("PLUS");
   }
   else if (prod<0){
       alert("MINUS");
   }
}
// 1.b
function box(){
    let weight = prompt("Weight");
    switch (+weight){
        case 10:
            alert("A pen");
            break;
        case 200:
            alert("A cat");
            break;
        case 3000:
            alert("A dog");
            break;
        case 40000:
            alert("A horse");
            break;
        case 500000:
            alert("A car");
            break;
        case null:
            alert("Input something");
        default:
            alert("A truckload of bunnies");
    }
}
// 2.a
function naturalNumberSum() {
    let n = +prompt("Number");
    let sum=0;
    for(let i=1; i<=n; i++){
        sum = sum + i;
    }
    alert(sum);
    //alert((n*(n+1))/2);
}
// 2.b
function loop(){
    let n = +prompt("Number<10000");
    while (n > 0 && n < 10000){
        alert(n+Math.random()*10);
        n = prompt("Number<10000");
    }
}
// 3.a.b
function array(){
    let a1 =[89, 99, 120, 412, 124];
    let array = [];
    for(let i = 1; i<=50;i++){
        array.push(i);
    }
    if (array.length == 50) {
        for (let i = 0; i<a1.length;i++){
            array.push(a1[i]);
        }
    }
    array.pop()
    alert(array);
}
//4
function object(){
    const human={age: 30, firstName:"John", lastName:"Doe"};
}

//5
function nrPozNeg3Num(a,b,c){
    let prod = a*b*c;
    if (prod > 0){
        alert("PLUS");
    }
    else if (prod<0){
        alert("MINUS");
    }
}

//nrPozNeg();
//box();
//naturalNumberSum();
//loop();
//array();
//nrPozNeg3Num(1,2,-10);