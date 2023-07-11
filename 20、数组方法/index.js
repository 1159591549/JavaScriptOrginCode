Array.prototype.sx_forEach = (cb) => {
    for (let i = 0; i < this.length; i++) {
        cb && cb(this[i], i, this)
    }
}
Array.prototype.sx_map = (cb) => {
    const res = []
    for (let i = 0; i < this.length; i++) {
        res[i] = cb && cb(this[i], i, this)
    }
    return res
}
Array.prototype.sx_filter = function (cb) {
    const res = []
    for (let i = 0; i < this.length; i++) {
        cb && cb(this[i], i, this) && (res.push(this[i]))
    }
    return res
}
Array.prototype.sx_every = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb && !cb(this[i], i, this)) {
            return false
        }
    }
    return true
}
Array.prototype.sx_some = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb && cb(this[i], i, this)) {
            return true
        }
    }
    return false
}
Array.prototype.sx_reduce = function (cb, ...args) {
    let pre, start = 0
    if (args.length) {
        pre = args[0]
    } else {
        pre = this[0]
        start = 1
    }
    for (let i = start; i < this.length; i++) {
        pre = cb(pre, this[i], i, this)
    }
    return pre
}
Array.prototype.sx_findIndex = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb && cb(this[i], i, this)) {
            return i
        }
    }
    return -1
}
Array.prototype.sx_find = function (cb) {
    for (let i = 0; i < this.length; i++) {
        if (cb && cb(this[i], i, this)) {
            return this[i]
        }
    }
    return undefined
}
Array.prototype.sx_fill = function (value, start = 0, end) {
    end = end || this.length
    for (let i = start; i < end; i++) {
        this[i] = value
    }
    return this
}
Array.prototype.sx_include = function (value, start = 0) {
    const isnan = Number.isNaN(value)
    for (let i = start; i < this.length; i++) {
        if (this[i] === value || (isnan && Number.isNaN(this[i]))) {
            return true
        }
    }
    return false
}
Array.prototype.sx_join = function (str = ',') {
    let resStr = ''
    for (let i = 0; i < this.length; i++) {
        const item = this[i]
        resStr = i === 0 ? item : `${resStr}${str}${item}`
    }
    return resStr
}
Array.prototype.sx_flat = function (num = Infinity) {
    let arr = this, i = 0
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr)
        i++
        if (i >= num) break
    }
    return arr
}
Array.prototype.sx_splice = function (start, length, ...values) {
    if (length === 0) return []
    length = start + length > this.length - 1 ? this.length - start : length
    const res = [], tempArr = [...this]
    for (let i = start; i < start + values.length; i++) {
        this[i] = values[i - start]
    }
    this.length = start + values.length
    if (values.length < length) {
        const cha = length - values.length
        for (let i = start + values.length; i < tempArr.length; i++) {
            this[i] = tempArr[i + cha]
        }
        this.length = this.length - cha
    }
    if (values.length > length) {
        for (let i = start + length; i < tempArr.length; i++) {
            this.push(tempArr[i])
        }
    }
    for (let i = start; i < start + length; i++) {
        res.push(tempArr[i])
    }
    return res
}