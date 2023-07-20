/**
 * 
 * @param {*} start 可选。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。
 * 也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
 * @param {*} end 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。
 * 如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
 * @returns 
 */
String.prototype.sx_slice = function (start = 0, end) {
    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end
    if (start >= end) return ''
    let str = ''
    for (let i = start; i < end; i++) {
        str += this[i]
    }
    return str
}
/**
 * 
 * @param {*} start 要抽取的子串的起始下标。必须是数值。如果是负数，那么该参数声明从字符串的尾部开始算起的位置。
 * 也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
 * @param {*} length 可选。子串中的字符数。必须是数值。如果省略了该参数，那么返回从 stringObject 的开始位置到结尾的字串。
 * @returns 
 */
String.prototype.sx_substr = function (start = 0, length) {
    if (length < 0) return ''
    start = start < 0 ? this.length + start : start
    length = (!length && length !== 0) || length > this.length - start ? this.length : start + length
    let str = ''
    for (let i = start; i < length; i++) {
        str += this[i]
    }
    return str
}
/**
 * 
 * @param {*} start 必需。一个非负的整数，规定要提取的子串的第一个字符在 string Object 中的位置。
 * @param {*} end 可选。一个非负的整数，比要提取的子串的最后一个字符在 string Object 中的位置多 1。
 * 如果省略该参数，那么返回的子串会一直到字符串的结尾。
 * @returns 
 */
String.prototype.sx_substring = function (start = 0, end) {
    start = start < 0 ? this.length + start : start
    end = !end && end !== 0 ? this.length : end
    if (start >= end) [start, end] = [end, start]
    let str = ''
    for (let i = start; i < end; i++) {
        str += this[i]
    }
    return str
}