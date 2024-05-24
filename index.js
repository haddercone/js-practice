if(!Array.prototype.myFilter) {
    Array.prototype.myFilter = function (callback) {
        if(typeof callback !== 'function' ) {
            throw TypeError(`${callback} is not a function`)
        }
        const result = [];

        for(let i=0; i< this.length; i++) {
            if(callback.call(this, this[i], i, this)) {
                result.push(this[i])
            }
        }
        return result;
    } 
}

if(!Array.prototype.myReduce) {
    Array.prototype.myReduce = function(callback , intialValue) {
        if(typeof callback !== "function") {
            throw TypeError(`${callback} is not a function`)
        }
        let res = intialValue;
        for(let i=0; i< this.length; i++) {
            if(res !== undefined) {
                res = callback(res, this[i], i, this)
            } else {
                res = this[i]
            }
        }
        return res;
    }
}


function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const arr = [1,2,3,4,5,6];

// const res = arr.myFilter((ele) => Boolean(ele))
// console.log(res);

// const sum = arr.myReduce((acc, curr, i, arr) => {
//     return acc - curr;
// })
// console.log(sum);




// function sayHi(a, b){
//     console.log(this.x);
//     console.log(`${a}, ${b}`);
// }

// const object = {
//     x: "a"
// }

// sayHi.call(object, 3,4)

// const fn = () => {
//     console.log(this);
// }
// fn()

Function.prototype.myCall = function(context, ...args) {
    const myContext = context || globalThis;
    let uniqueId = "fn_" + Date.now();
    myContext[uniqueId] = this;
    let result = myContext[uniqueId](...args);
    delete myContext[uniqueId];
    return result; 
}
Function.prototype.myApply = function(context, args) {
    const myContext = context || globalThis;
    let uniqueId = "fn_" + Date.now();
    myContext[uniqueId] = this;
    let result = myContext[uniqueId](...args);
    delete myContext[uniqueId];
    return result; 
}

Function.prototype.myBind = function(...args) {
    let callback = this;
    const context = args.splice(1);
    return function(...a){
        callback.apply(args[0], [...context, ...a])
    }
}

// function b(name){
//     console.log(this.name);
//     console.log(name);
// }
// const obj = {
//     name: "Robin",
// }

// b.myCall(obj, "jojo")
// b.apply(3, ["jojo"])
// const res = b.myBind(obj,"jojo")
// res();


const obj2 = {
    a: 3,
    x : function () {
        function b(name){
            function y(name) {
                console.log(this.x, name)
            }
            y.call(this, name);
        }
        b.call(this, "savdv")
    }
}
// obj2.x();
// b.call(obj, "asdva")
// this.a = -2
// const x =  () => {
//     console.log(this.a);
// }
// x()


// for (var i = 0; i < 5; i++) {
//     ((i) => {
//         setTimeout(() => {
//             console.log(i);
//         },1000)
//     })(i)
// }


const arr1 = [1,2,3]
// console.log(arr1.myReduce((acc ,curr) => acc + curr));
// console.log(arr1.slice(1));
// console.log(arr1);

const object = {
    name : "Robin",
    sayHi : function() {
            console.log(this);
            console.log(`Hi ${this.name}`);
        }
}
object.sayHi();
