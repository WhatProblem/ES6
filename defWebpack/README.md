package.json配置bin目录指定运行文件:def-webpack.js
在def-webpack.js文件中定义执行环境(#! /usr/bin/env node)node
通过npm link将当前包链接到全局
通过(npm link def-webpack/npm link defWebpack)将上一步的包链接到本地进行运行
通过npx def-webpack测试执行结果

```javascript
    // babylon 把源码转换成 ast
    // @babel/traverse // 遍历节点
    // @babel/types // 替换节点
    // @babel/generator // 生成处理后的代码文件
---------