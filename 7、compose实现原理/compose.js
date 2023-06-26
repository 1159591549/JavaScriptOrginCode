function fn1(x) {
    return x + 1;
}

function fn2(x) {
    return x + 2;
}

function fn3(x) {
    return x + 3;
}

function fn4(x) {
    return x + 4;
}
const compose = (...fns) => {
    if (fns.length === 0) return (num) => num
    if (fns.length === 1) return fns[0]
    return fns.reduce((pre, next) => {
        return (num) => {
            return pre(next(num))
        }
    })
}
// 实现：接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出
// 作用：实现函数式编程中的 pointfree 风格（无参数），使我们专注于【转换】而不是【数据】
const a = compose(fn1, fn2, fn3, fn4)
console.log(a(1)); 