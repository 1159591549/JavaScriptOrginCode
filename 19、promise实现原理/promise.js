class Mpromise {
    static pedding = 'PEDDING'
    static fulfilled = 'FULFILLED'
    static reject = 'REJECT'
    constructor(executor) {
        this.status = Mpromise.pedding
        this.value = ''
        this.callbacks = []
        executor(this.resolve.bind(this), this.reject.bind(this))
    }
    resolve(value) {
        if (this.status === Mpromise.pedding) {
            this.status = Mpromise.fulfilled
            this.value = value
            setTimeout(() => {
                this.callbacks.forEach(callback => {
                    callback.onFulfilled(value)
                })
            })
        }
    }
    reject(reason) {
        if (this.status === Mpromise.pedding) {
            this.status = Mpromise.reject
            this.value = reason
            setTimeout(() => {
                this.callbacks.forEach(callback => {
                    callback.onReject(reason)
                })
            })
        }
    }
    then(onFulfilled, onReject) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = () => this.value
        }
        if (typeof onReject !== 'function') {
            onReject = () => this.value
        }
        // if (this.status === Mpromise.pedding) {
        //     this.callbacks.push({
        //         onFulfilled: (value) => {
        //             onFulfilled(value)
        //         },
        //         onReject: (value) => {
        //             onReject(value)
        //         }
        //     })
        // }
        // if (this.status === Mpromise.fulfilled) {
        //     setTimeout(() => {
        //         onFulfilled(this.value)
        //     })
        // }
        // if (this.status === Mpromise.reject) {
        //     setTimeout(() => {
        //         onReject(this.value)
        //     })
        // }
        return new Mpromise((resolve, reject) => {
            if (this.status === Mpromise.pedding) {
                this.callbacks.push({
                    onFulfilled: (value) => {
                        let result = onFulfilled(value)
                        if (result instanceof Mpromise) {
                            result.then(resolve, reject)
                        } else {
                            resolve(result)
                        }
                    },
                    onReject: (value) => {
                        let result = onReject(value)
                        if (result instanceof Mpromise) {
                            result.then(resolve, reject)
                        } else {
                            reject(result)
                        }
                    }
                })
            }
            if (this.status === Mpromise.fulfilled) {
                setTimeout(() => {
                    let result = onFulfilled(this.value)
                    if (result instanceof Mpromise) {
                        result.then(resolve, reject)
                    } else {
                        resolve(result)
                    }
                })
            }
            if (this.status === Mpromise.reject) {
                setTimeout(() => {
                    let result = onReject(this.value)
                    if (result instanceof Mpromise) {
                        result.then(resolve, reject)
                    } else {
                        reject(result)
                    }
                })
            }
        })
    }
    static RESOLVE(value) {
        return new Mpromise((resolve, reject) => {
            resolve(value)
        })
    }
    static REJECT(reason) {
        return new Mpromise((resolve, reject) => {
            reject(reason)
        })
    }
    static ALL(promises) {
        let res = []
        return new Mpromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(value => {
                    res.push(value)
                    if (res.length === promises.length) {
                        resolve(res)
                    }
                }, reason => {
                    reject(reason)
                })
            })
        })
    }
    static RACE(promises){
        return new Mpromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(value => {
                    resolve(value)
                }, reason => {
                    reject(reason)
                })
            })
        })
    }
}
