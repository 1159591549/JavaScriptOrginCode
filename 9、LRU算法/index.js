// LRU(Least Recently Used) 是一种常见的 缓存淘汰算法
// LRU的全称为Least Recently Used，翻译出来就是最近最少使用的意思。
// 它是一种内存淘汰算法，当内存不够时，将内存中最久没使用的数据清理掉。LRU算法常用于缓存的淘汰策略。

/**
 * 主要功能
 * 1、初始化一个 Map，越新访问的值，越靠近 map 的尾部
 * 2、在 getter 中，根据传入的key，查找是否存在对应的数据；如果有，则将其移动到 map 的尾部；如果没有，则返回 undefined
 * 3、在 setter 中，先要根据传入的key，判断是否已存在同 key 的值；如果有，则更新其值，并移动到尾部；如果没有；则需要判断当前 map 的大小是否达到了 缓存空间 的上限，达到了需要先丢弃 map 首部的元素，再往 map 尾部插入新的元素
 */
class LRUCache {
    constructor(size) {
        this.size = size
        this.cache = new Map()
    }
    get(key) {
        const hasKey = this.cache.has(key)
        if (!hasKey) {
            return -1
        } else {
            const val = this.cache.get(key)
            this.cache.delete(key)
            this.cache.set(key, val)
            return val
        }
    }
    put(key, value) {
        const hasKey = this.cache.has(key)
        if (hasKey) {
            this.cache.delete(key)
        }
        this.cache.set(key, value)
        // 当元素容量大于约定好的容量，要插入元素，并剔除首部元素
        if (this.cache.size > this.size) {
            // 移除首部元素
            this.cache.delete(this.cache.keys().next().value)
        }
    }
}