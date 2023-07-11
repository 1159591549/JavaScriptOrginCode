// 将对象转换为[[key, value], [key1, value1]]的形式
Object.prototype.sx_entries = function (obj) {
    const res = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && (res.push([key, obj[key]]))
    }
    return res
}
// 将[[key, value], [key1, value1]]形式的数组转换为{ key: value, key1: value1 }的形式
Object.prototype.sx_fromEntries = function (arr) {
    const obj = {}
    for (let item of arr) {
        const [key, value] = item
        obj[key] = item[value]
    }
    return obj
}
// 获取对象的keys
Object.prototype.sx_keys = function (obj) {
    const res = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push(key)
    }
    return res
}
// 获取对象的values
Object.prototype.sx_values = function (obj) {
    const res = []
    for (let key in obj) {
        obj.hasOwnProperty(key) && res.push(obj[key])
    }
    return res
}
// 通过逐层查找children的原型与parent原型进行比对，相等即是parent的实例
const instanceOf = function (parent, children) {
    const fp = parent.prototype
    let cp = children.__proto__
    while (cp) {
        if (fp === cp) {
            return true
        }
        cp = cp.__proto__
    }
    return false
}
/**
 * Object.is返回值为true情况
 * 1、两个值都是 undefined
 * 2、两个值都是 null
 * 3、两个值都是 true 或者都是 false
 * 4、两个值是由相同个数的字符按照相同的顺序组成的字符串
 * 5、两个值指向同一个对象
 * 6、两个值都是数字并且（如下）
 *    都是正零 +0、都是负零 -0、都是 NaN、都是除零和 NaN 外的其它同一个数字
 */
Object.prototype.sx_is = function (x, y) {
    if (x === y) {
        // 防止 +0 和 -0
        return x !== 0 || 1 / x === 1 / y
    }
    // 防止NaN
    return x !== x && y !== y
}
// 将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
Object.prototype.sx_assign = function (target, ...args) {
    if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object')
    }
    target = Object(target)
    for (let obj of args) {
        for (let key in obj) {
            obj.hasOwnProperty(key) && (target[key] = obj[key])
        }
    }
    return target
}
console.log(Object.sx_is('aa', 'aa'));