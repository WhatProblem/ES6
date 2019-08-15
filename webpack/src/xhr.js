let xhr = new XMLHttpRequest()

xhr.open('GET', '/user')
xhr.onload = function () {
    console.log(xhr.response)
}
xhr.send()

