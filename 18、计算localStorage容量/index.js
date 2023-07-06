// 测量一个容量为100K的数组 102400
let str = ''
for (let index = 0; index < 1024; index++) {
    str += '0123456789'
}
let tmp = ''
function computeSize() {
    return new Promise((resolve, reject) => {
        let interval = setInterval(() => {
            try {
                if (tmp.length > 102400) {
                    throw new Error('容量超出~~~')
                }
            } catch (error) {
                resolve(tmp.length / 1024 - 10)
                console.log(error.message);
                clearInterval(interval)
            }
            tmp += str
        }, 0)
    })
}
(async () => {
    let total = await computeSize()
    console.log(total + 'KB');
})()