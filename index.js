// // var arr =[1,2,3,4];
// // arr.push([0,1,0]);
// // console.log(arr);
// // console.log(arr.length);
// // console.log(arr.pop());


// // let arr5 = [3, 1, 4, 1, 5];
// // // arr5.sort();
// // console.log(arr5.sort()); // [1, 1, 3, 4, 5]


// var array = ["a",'b','c','d','e','f'];
// for(let i=array.length-1;i>0;i--){
//     console.log(array[i]);
//     var a = array.map((num)=>num + array[i]);

// }
// console.log(a);


// const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));

// const alphabetPositions = Object.fromEntries(
//   alphabet.map((letter, index) => [letter, index + 1])
// );

// console.log(alphabetPositions);


function string(str){
   const reversed = str.reverse().join();
    console.log( reversed)
}
string("pooja")