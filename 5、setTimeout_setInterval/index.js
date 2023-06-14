// 用setTimeout实现setInterval
const mySetInterval = (fn, delay = 500) => {
    let timer = null
    const interval = () => {
        fn()
        timer = setTimeout(interval, delay)
    }
    timer = setTimeout(interval, delay)

    return {
        cancel: () => {
            clearTimeout(timer)
        }
    }
}

let timer1 = mySetInterval(function(){
    console.log('a一秒一次哦~');
}, 1000)
let timer2 = mySetInterval(function(){
    console.log('b一秒一次哦~');
}, 1000)
