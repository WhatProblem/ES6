/* 高级类型 */

// 1. 交叉类型
function extend<T, U>(first: T, second: U): T & U {
  const result = <T & U>{};
  for (const id in first) {
    (<any>result)[id] = (<any>first)[id];
  }
  for (const id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id];
    }
  }
  console.log(result);
  return result;
}
export default extend;
