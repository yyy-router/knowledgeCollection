/**
 * 让下面的解构成立
 * 解决思路：让他满足可迭代协议即可
 * [Symbol.iterator]:function(){
 *      return 迭代器(对象)
 * }
 * 迭代器中有一个next(),不断的执行next方法
*/
Object.prototype[Symbol.iterator] = function () {
    var arr = Object.values(this);
    const iter = arr[Symbol.iterator]();//拿到迭代器
    return iter;
}
var [a, b] = { a: 1, b: 2 };
console.log('a', a)
console.log('b', b)