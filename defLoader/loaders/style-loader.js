const loaderUtils = require('loader-utils')

function loader(source) {
    // 在style-loader中导出一个脚本
    let str = `
    let style=document.createElement('style');
    style.innerHTML=${JSON.stringify(source)};
    document.head.appendChild(style);
    `
    return str
}

// style-loader上写了pitch
// style-loader     less-loader!css-loader!./index.less
loader.pitch = function (remainingRequest) { // 剩余请求
    // 让style-loader去处理less-loader!css-loader/./index.less
    // require路径  返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!index.less')
    let str = `
        let style=document.createElement('style');
        style.innerHTML=require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
        document.head.appendChild(style);
    `
    return str
}
module.exports = loader