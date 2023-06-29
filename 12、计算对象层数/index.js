const loopGetLevel = (obj) => {
    let num = 1
    const computed = (obj, level) => {
        level = level || 0
        if (typeof obj === 'object' && obj !== null) {
            Object.values(obj).forEach(v => {
                if (typeof v === 'object' && v !== null) {
                    computed(v, level + 1)
                } else {
                    num = level + 1 > num ? level + 1 : num
                }
            })
        } else {
            num = level > num ? level : num
        }
    }
    computed(obj)
    return num
}
let obj = {
    a: {
        b: {
            a: 1
            // c: {
            //     d: {
            //         e: 1
            //     }
            // }
        }
    },
    b: {
        a: 1
    }
}
console.log(loopGetLevel(obj));