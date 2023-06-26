// 函数柯里化
// 这样看来每次调用curry函数都只是把之前的参数和这次的参数收集到一个数组里，然后返回一个新的函数，
// 而且这个函数已经默认带了之前传入的所有参数。是的，柯里化就是一个参数收集器，返回新的函数而已。
var currying = function (fn) {
    var args = [];
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args);
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
};
var cost = (function () {
    var money = 0;
    return function () {
        [...arguments].reduce((pre, next) => {
            return money = pre + next
        } , money)
        return money;
    }
})();
// 转化成curring函数
var cost = currying(cost);
// 求值并输出：1500
console.log(cost(100)(200)(300)(400, 500)());