function loader(source) { // loader参数--代码
    console.log('loader3333333333')
    return source
}

loader.pitch = function() {
    console.log('loader3-pitch')
}

module.exports = loader