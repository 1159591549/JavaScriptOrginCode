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
            onFulfilled = () => { }
        }
        if (typeof onReject !== 'function') {
            onReject = () => { }
        }
        return new HD((resolve, reject) => {
            // 当promise里面包含setTimeout时候，这个时候要把回调函数收集起来，待执行完resolve的时候再执行
            if (this.status === HD.PEDDING) {
                this.callbacks.push({
                    onFulfilled: value => {
                        // 执行报错的时候要进行错误收集
                        try {
                            onFulfilled(value)
                        } catch (error) {
                            onReject(error)
                        }

                    },
                    onReject: value => {
                        // 执行报错的时候要进行错误收集
                        try {
                            onReject(value)
                        } catch (error) {
                            onReject(error)
                        }
                    }
                })
            }
            // 只有执行了resolve将状态变成fulfilled的时候才可以执行回调函数
            if (this.status === HD.FUFILLED) {
                // promise代码要晚于同步代码块执行顺序 异步执行
                setTimeout(() => {
                    // 防止函数执行出现错误要用代码块包裹
                    try {
                        onFulfilled(this.value)
                    } catch (error) {
                        onReject(error)
                    }
                })
            }
            if (this.status === HD.REJECTED) {
                // promise代码要晚于同步代码块执行顺序 异步执行
                setTimeout(() => {
                    // 防止函数执行出现错误要用代码块包裹
                    try {
                        onReject(this.value)
                    } catch (error) {
                        onReject(error)
                    }
                })
            }
        })
    }
}