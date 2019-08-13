function* gen() {
    yield 1
}
console.log(gen().next())

export default gen