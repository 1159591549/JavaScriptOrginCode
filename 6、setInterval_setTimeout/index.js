// 用setInterval实现setTimeout
let mySetTimeout = (fun, delay = 1000) => {
    let timer = setInterval(() => {
        fun()
        clearInterval(timer)
    }, delay)
    
}
mySetTimeout(() => {
    console.log('用setInterval实现setTimeout');
})