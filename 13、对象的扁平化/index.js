const isObject = obj => {
    return typeof obj === 'object' && obj !== null
}
const flatten = obj => {
    if (!isObject(obj)) return
    const res = {}
    const dfs = (cur, prefix) => {
        if (isObject(cur)) {
            if (Array.isArray(cur)) {
                for (let index in cur) {
                    dfs(cur[index], `${prefix}[${index}]`)
                }
            } else {
                for (let key in cur) {
                    dfs(cur[key], `${prefix}${prefix ? '.' : ''}${key}`)
                }
            }
        } else {
            res[prefix] = cur
        }
    }
    dfs(obj, '')
    return res
}
let obj = {
    a: 1,
    b: {
        a: 2,
        b: 3,
        c: {
            a: 1,
            b: 2,
            c: [1, 2, 3]
        }
    },
    c: [1, 2, 3, 4, { a: 1 }, [11, 22, 33]]
}
console.log(flatten(obj));