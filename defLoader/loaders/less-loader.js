const less = require('less')


function loader(source) {
    let css;
    less.render(source, function (err, res) {
        css = res.css
    })
    return css
}
module.exports = loader