// ES5--类的实现
/* function Point(x, y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function () {
    var res = '(' + this.x + ',' + this.y + ')';
    console.log(res);
}
var p = new Point(1, 2);
p.toString();
console.log(p.constructor === Point)
console.log(Point.prototype.constructor === Point) */


// ES6--类的创建: 类的所有方法都定义在类的prototype属性上面
/* class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        let res = '(' + this.x + ',' + this.y + ')';
        console.log(res);
    }
}
let p = new Point(1, 2);
p.toString();
let c = Point.prototype.constructor;
console.log(c===Point); */


// 类的所有方法都定义在类的prototype属性上面
/* class Point {
    constructor() {
        // ...
    }

    toString() {
        // ...
    }

    toValue() {
        // ...
    }
}

// 等同于

Point.prototype = {
    constructor() { },
    toString() { },
    toValue() { },
}; */