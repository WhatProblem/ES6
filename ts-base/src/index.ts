import './styles/reset.css'
// 基础类型
import './basicDatatype/index.ts'
// 高级类型
import extend from './SeniorType/index'

const res = extend<number, string>(1, 'abc')

console.log(res)
