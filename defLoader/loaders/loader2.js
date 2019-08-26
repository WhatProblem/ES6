function loader(source) { // loader参数--代码
    console.log('loader22222222222')
    return source
}

loader.pitch = function() {
    console.log('loader2-pitch')
    return 'xxx'
}

module.exports = loader