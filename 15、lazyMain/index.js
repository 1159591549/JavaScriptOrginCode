class _lazyMan {
    constructor(name) {
        const fn = () => {
            console.log(`Hi! This is ${name}`)
            this.next()
        }
        this.tasks = []
        this.tasks.push(fn)
        setTimeout(() => {
            this.next()
        })
    }
    next() {
        const task = this.tasks.shift()
        task && task()
    }
    sleep(delay) {
        this.sleepWrapper(delay)
        return this
    }
    sleepFirst(delay) {
        this.sleepWrapper(delay, true)
        return this
    }
    sleepWrapper(time, first) {
        const fn = () => {
            setTimeout(() => {
                console.log(`Wake up after ${time}`)
                this.next()
            }, time * 1000)
        }
        if (first) {
            this.tasks.unshift(fn)
        } else {
            this.tasks.push(fn)
        }
    }
    eat(food) {
        const fn = () => {
            console.log(`Eat ${food}`)
            this.next()
        }
        this.tasks.push(fn)
        return this
    }

}

const LazyMan = (name) => {
    return new _lazyMan(name)
}
LazyMan('Hank').eat('supper').sleepFirst(5)