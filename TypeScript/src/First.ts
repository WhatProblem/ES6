/* 基础数据类型 */

// 1.string类型，支持模板字符串
let email: string = '123@qq.com'

// 2.boolean类型
let isShow: boolean = false

// 3.number类型
let age: number = 20

// 4.array类型
let list: number[] = [1, 2, 3, 4]

// 5.tumple元组类型: 方便数组的混合赋值
let arr: [string, number] = ['123', 1]

// 6.emum枚举类型：定义变量赋值的范围在指定枚举类型之内
enum Weeks { mon, tue, wed }
let day: Weeks = Weeks.mon
let enumObj = { index: Weeks[0], val: Weeks['mon'] }

// 7.any类型
let x1: any = 123
x1 = '456'

// 8.void函数的返回值：代表无返回值
function test(): void {

}

// 9.undefined和null: 该类型的值只有对应的undefined或null
let x: undefined = undefined
let y: null = null

// 10.联合类型
let x2: string | number | boolean = 1
x2 = '123'
x2 = false

// 11.类型推断
let x3 = 1 // 推论x3是number类型
// x3 = '12' // 报错

// 12.类型断言: 根据联合类型来断言应该是什么类型
/* 
let x4: number | string | boolean
// let strlengt:number = x4.length // 报错
let strlength: number = (x4 as string).length // 断言
let str1: number = (<string>x4).length // 断言
 */

export default {
    email, isShow, age, list, arr, day, enumObj, x1
}