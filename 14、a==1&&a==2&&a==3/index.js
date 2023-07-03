// 第一种方法
var a = {
    i: 1,
    toString: function () {
        return a.i++;
    }
}
console.log(a == 1 && a == 2 && a == 3) // true

// 第二种方法
// a也不可能同时等于多个不同的值，而在进行==比较的时候，数组会由join方法转换成字符串，因此可以改写join方法。
var a = [1, 2, 3];
a.join = a.shift;
console.log(a == 1 && a == 2 && a == 3); // true

// 第三种方法
var val = 0;
Object.defineProperty(window, 'a', {
    get: function () {
        return ++val;
    }
});
console.log(a == 1 && a == 2 && a == 3) // true