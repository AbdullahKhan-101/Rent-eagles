// const convertAnyFunctionInMemorizeFunction = (fn) => {
//     const lorem = new Map();

//     return (...args) => {
//         if (lorem.has(JSON.stringify(args))) {
//             const result = lorem.get(JSON.stringify(args));
//             console.log("Memo")
//             return result;
//         }

//         const result = fn(...args);
//         lorem.set(JSON.stringify(args), result);
//         return result;
//     }
// };

// function a (a , b){
//     return a*b;
// }

// const aa = convertAnyFunctionInMemorizeFunction(a)

// console.log(aa(3,54));
// console.log(aa(3,56564));
// console.log(aa(3,54));