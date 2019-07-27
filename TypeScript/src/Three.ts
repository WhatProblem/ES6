/* 类的定义，继承，访问修饰符，静态属性，静态方法，抽象类，多态 */

// 1.定义类
class Person {
    name: string
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    print() {
        return this.name + ':' + this.age
    }
}
let p1 = new Person('p1', 20).print()


// 2.继承类
class Student extends Person {
    cardNumber: string
    school: string
    constructor(name: string, age: number, cardNumber: string, school: string) {
        super(name, age)
        this.cardNumber = cardNumber
        this.school = school
    }
    doWork() {
        return this.name + ':' + this.age + '岁，学号' + this.cardNumber + ',就读于' + this.school
    }
    print() { // 与父类同名方法，执行子类，但是返回类型要相同
        return '123'
    }
}

let p2 = new Student('p1', 20, '001', '中国本地大学')
// 给内部变量赋值方式二：
// p2.cardNumber = '003'
// p2.school = '中国本地大学'


// 3.访问修饰符：public/private/protected
class Per {
    public name: string // 子类，实例都可访问
    private age: number // 只能自身访问
    protected email: string // 自身和子类可访问
    constructor(name: string, age: number, email: string) {
        this.name = name
        this.age = age
        this.email = email
    }
}
let per = new Per('CESHI', 21, '123@QQ.COM')

class Teacher extends Per {
    show() {
        console.log(this.email) // 无报错，可访问
    }
}

// 4.静态属性，静态方法：调用静态属性，静态方法只能使用类
// 传统面型对象实现静态属性，静态方法
function StaticFun(name: string) {
    this.name = name // 实例属性
    this.show = function () { // 实例方法

    }
}
StaticFun._name = '213' // 静态属性
StaticFun._show = function () { // 静态方法

}

class Pop {
    static names: string // 静态属性
    constructor(name: string) {
        Pop.names = name
    }
    static getMsg() {
        console.log('这是静态方法')
    }
    show() {
        Pop.getMsg()
    }
}


// 5.多态：同一父类在不同子类下有不同实现
class Animate {
    eat() {
        console.log('eat something')
    }
}
class Cat extends Animate {
    eat() {
        console.log('猫吃鱼')
    }
}
class Dog extends Animate {
    eat() {
        console.log('狗吃肉')
    }
}

// 6.抽象类，抽象方法：抽象类是提供其他类继承的基类（父类），不能被实例化，
// 抽象方法：抽象方法只能包含在抽象类之中，抽象类中可以包含抽象类与非抽象类
// 子类(可以是抽象类)继承抽象类，实现抽象方法
abstract class Animation {
    abstract eat(): void
    run() {
        return 123
    }
}

class CAT extends Animation {
    eat() {
        console.log('猫吃鱼')
    }
}

abstract class DOG extends Animation {

}

let cat = new CAT()


export default {
    p1, p2: [p2.doWork(), p2.print()], cat: [cat.eat, cat.run()]
}