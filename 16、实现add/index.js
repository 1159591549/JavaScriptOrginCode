// 要求：实现一个 add 方法 使计算结果能够满足如下预期：
// add(1)(2)(3)()=6
// add(1,2,3)(4)()=10
function keLi(){
    let args = []
    return function(){
        if (arguments.length === 0) {
            return args.reduce((a, b) => a + b, 0)
        }else{
            args.push(...arguments)
            return arguments.callee
        }
    }
}
let add = keLi()
console.log(add(1,2,3)(4)());