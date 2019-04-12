// ES6：class继承

// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）
// ES6 的继承，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用super方法），然后再用子类的构造函数修改this
// 父类的静态方法会被子类继承




// Object.getPrototypeOf()用来从子类上获取父类
// 可以使用这个方法判断，一个类是否继承了另一个类
// Object.getPrototypeOf(ColorPoint) === Point // true




// super关键字两种作用: 既可以当作函数使用，也可以当作对象使用

// super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数
/* 
class A { }
class B extends A {
    constructor() {
        super();
    }
}
 */
/* 
class A {
    constructor() {
        console.log(new.target.name)
    }
}
class B extends A {
    constructor() {
        super()
    }
}
new A(); // A
new B(); // B
 */

// super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
/* 
class A {
    p() {
        return 2;
    }
}
class B extends A {
    constructor() {
        super();
        console.log(super.p())
    }
}
let b = new B();
 */

// 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的
/* 
class A {
    constructor() {
        this.p = 2;
    }
}
class B extends A {
    get m() {
        return super.p;
    }
}
let b = new B();
console.log(b.m); // undefined
 */
/* 
class A { }
A.prototype.x = 2;
class B extends A {
    constructor() {
        super();
        console.log(super.x);
    }
}
let b = new B();
 */

// ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例
/* 
class A {
    constructor() {
        this.x = 1;
    }
    print() {
        console.log(this.x);
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    m() {
        super.print();
    }
}
let b = new B();
b.m(); // 2
 */

/* 
class A {
    constructor() {
        this.x = 1;
    }
}
class B extends A {
    constructor() {
        super();
        this.x = 2;
        super.x = 3; // 指向当前子类实例
        console.log(super.constructor === A); // true
        console.log(super.x); // undefined--执行父类原型对象
        console.log(this.x); // 3
    }
}
let b = new B();
 */





// super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
/* 
class Parent {
    static myMethod(msg) {
        console.log('static', msg);
    }

    myMethod(msg) {
        console.log('instance', msg);
    }
}

class Child extends Parent {
    static myMethod(msg) {
        super.myMethod(msg);
    }

    myMethod(msg) {
        super.myMethod(msg);
    }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2
 */


// 在子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类，而不是子类的实例
/* 
class A {
    constructor() {
        this.x = 1;
    }
    static print() {
        console.log(this.x);
    }
}

class B extends A {
    constructor() {
        super();
        this.x = 2;
    }
    static m() {
        super.print();
    }
}

B.x = 3;
B.m() // 3
 */


// super.valueOf()表明super是一个对象，因此就不会报错。同时，由于super使得this指向B的实例，所以super.valueOf()返回的是一个B的实例
/* 
class A { }
class B extends A {
    constructor() {
        super();
        console.log(super.valueOf() instanceof B); // true
    }
}

let b = new B();
 */


// 由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字
/* 
var obj = {
    toString() {
        return "MyObject: " + super.toString();
    }
};

console.log(obj.toString()); // MyObject: [object Object]
 */






// 类的 prototype 属性和__proto__属性
// 每一个对象都有__proto__属性，指向对应的构造函数的prototype属性
/* 
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
*/


// 子类B的__proto__属性指向父类A，子类B的prototype属性的__proto__属性指向父类A的prototype属性

// 类的继承是按照下面的模式实现的
/* 
class A {
}

class B {
}

// B 的实例继承 A 的实例
Object.setPrototypeOf(B.prototype, A.prototype);

// B 继承 A 的静态属性
Object.setPrototypeOf(B, A);

const b = new B();
*/




// 实例的 __proto__ 属性
// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型
/* 
class A { }
class B extends A {
    constructor() {
        super()
    }
}
let a = new A();
let b = new B();
console.log(b.__proto__); // B {}
console.log(b.__proto__.__proto__); // A {}
console.log(a.__proto__); // A {}
 */




// Mixin 模式的实现
/* 
function mix(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}

function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
            && key !== 'prototype'
            && key !== 'name'
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

// 使用的时候，只要继承这个类即可
class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
}
 */

