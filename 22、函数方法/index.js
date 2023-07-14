Function.prototype.sx_call = function (obj, ...args) {
    obj = obj || window
    const fn = Symbol()
    obj[fn] = this
    const res = obj[fn](...args)
    delete obj[fn]
    return res
}
Function.prototype.sx_apply = function (obj, args) {
    obj = obj || window
    const fn = Symbol()
    obj[fn] = this
    const res = obj[fn](...args)
    delete obj[fn]
    return res
}
Function.prototype.sx_bind = function (obj, ...args) {
    obj = obj || window
    const fn = Symbol()
    obj[fn] = this
    const _this = this

    const res = function (...innerArgs) {
        console.log(this, _this)
        if (this instanceof _this) {
            this[fn] = _this
            this[fn](...[...args, ...innerArgs])
            delete this[fn]
        } else {
            obj[fn](...[...args, ...innerArgs])
            delete obj[fn]
        }
    }
    res.prototype = Object.create(this.prototype)
    return res
}
function fun(name) {
    console.log(name);
}
const f = fun.sx_bind(this, '胡智尧')
f()