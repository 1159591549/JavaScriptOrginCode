class HD {
    static PEDDING = 'pedding'
    static FUFILLED = 'fufilled'
    static REJECTED = 'rejected'
    constructor(executor) {
        this.status = HD.PEDDING
        this.value = null
        this.callbacks = []
        // 包裹executor执行函数，函数体执行正确时，正常执行，函数体报错执行catch里面的内容
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(value) {
        // promise状态只能从peddding -> fufilled
        if (this.status === HD.PEDDING) {
            this.status = HD.FUFILLED
            this.value = value
            // 优先执行同步代码块
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onFulfilled(value)
                })
            })
        }
    }
    reject(resaon) {
        // promise状态只能从peddding -> rejected
        if (this.status === HD.PEDDING) {
            this.status = HD.REJECTED
            this.value = resaon
            // 优先执行同步代码块
            setTimeout(() => {
                this.callbacks.map(callback => {
                    callback.onReject(resaon)
                })
            })
        }
    }
    then(onFulfilled, onReject) {
        // 防止用户使用的时候不传递函数或者少传函数
        if (typeof onFulfilled !== 'function') {
            // then的穿透效果，当then里面没有传递参数的时候，把上一个promise的value值放到下一个promise中
            onFulfilled = () => this.value
        }
        if (typeof onReject !== 'function') {
            onReject = () => this.value
        }
        let promise = new HD((resolve, reject) => {
            // 当promise里面包含setTimeout时候，这个时候要把回调函数收集起来，待执行完resolve的时候再执行
            if (this.status === HD.PEDDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        this.parse(promise, onFulfilled(value), resolve, reject)
                    },
                    onReject: value => {
                        this.parse(promise, onReject(value), resolve, reject)
                    }
                })
            }
            // 只有执行了resolve将状态变成fulfilled的时候才可以执行回调函数
            if (this.status === HD.FUFILLED) {
                // promise代码要晚于同步代码块执行顺序 异步执行
                setTimeout(() => {
                    // 防止函数执行出现错误要用代码块包裹
                    this.parse(promise, onFulfilled(this.value), resolve, reject)
                })
            }
            if (this.status === HD.REJECTED) {
                // promise代码要晚于同步代码块执行顺序 异步执行
                setTimeout(() => {
                    // 防止函数执行出现错误要用代码块包裹
                    this.parse(promise, onReject(this.value), resolve, reject)
                })
            }
        })
        return promise
    }
    parse(promise, result, resolve, reject) {
        if (promise === result) {
            throw TypeError('Chaining cycle dected!')
        }
        try {
            if (result instanceof HD) {
                result.then(resolve, reject)
            } else {
                resolve(result)
            }
        } catch (error) {
            reject(error)
        }
    }
    static resolve(value) {
        return new HD((resolve, reject) => {
            if (value instanceof HD) {
                value.then(resolve, reject)
            } else {
                resolve(value)
            }
        })
    }
    static reject(resaon){
        return new HD((resolve, reject) => {
            reject(resaon)
        })
    }
}