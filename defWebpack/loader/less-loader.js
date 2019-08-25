const less = require('less')

// 将less转换为css
function loader(source) {
    let css = ''
    // 利用less转换css
    less.render(source, function (err, c) {
        css = c.css
    })
    css = css.replace(/\n/g,'\\n')
    return css
}

module.exports = loader