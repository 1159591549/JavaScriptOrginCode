const quchong = (arr) => {
    return [...new Set(arr)]
}

// 方法2
const quchong1 = (arr) => {
    const res = []
    arr.reduce((pre, next) => {
        if (!pre.has(next)) {
            pre.set(next, 1)
            res.push(next)
        }
        return pre
    }, new Map())
    return res
}
let arr = [
    {
        name:'hzy',
        age:27
    },
    {
        name:'hzy',
        age:27
    },
    {
        name:'sym',
        age:26
    },
    {
        name:'sym',
        age:26
    }
]
let map = new Map()
let distinctList = []
arr.forEach(item => {
    if (!map.has(item.name)) {
        distinctList.push(item)
        map[item.name] = 0
    }
})