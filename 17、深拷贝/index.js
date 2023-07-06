const deepClone = (obj) => {
    let res = obj instanceof Array ? [] : {}
    for (const key in obj) {
        res[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
    return res
}
let obj = {
    a: 1,
    hobby: [1, 2, 3, [1, 2, 3], { a: 1 }],
    o: {
        a: 1,
        b: {
            a: 1
        },
        list: [1, 2, 3]
    }
}
console.log(deepClone(obj));