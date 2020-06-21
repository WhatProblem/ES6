/* 基础类型 */

// 1. 布尔值
const isDone = false
console.log(isDone)

// 2. 数字
const decLiteral = 6
const hexLiteral = 0xf00d
const binaryLiteral = 0b1010
const octalLiteral = 0o744

// 3. 字符串
let names = 'bob'
names = 'smith'

// 4. 数组
const list: number[] = [1, 2, 3]
const lists: Array<number> = [1, 2]

// 5. 元组
// Declare a tuple type
// let x: [string, number];
// // Initialize it
// x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, 'hello']; // Error

// 6. 枚举
// enum Color { Red, Green, Blue }
// let c: Color = Color.Green
// console.log(c) // 1

// enum Color { Red = 1, Green, Blue }
// let c: Color = Color.Green
// console.log(c) // 2

// enum Color { Red = 1, Green = 2, Blue = 4 }
// let c: Color = Color.Green
// console.log(c) // 2

enum Color {
	Red = 1,
	Green,
	Blue,
}
const colorName: string = Color[2]
console.log(colorName) // Green

// 7. any
// 8. void
// 9. null undefined
// 10. never
