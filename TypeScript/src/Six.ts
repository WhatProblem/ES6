/* 命名空间 */

export namespace A {
    export class Dog {
        eat() {
            console.log('吃肉')
        }
    }
}

export namespace B {
    interface TB {
        name: string
        id: number
    }

    export class Dog implements TB {
        name: string
        id: number
        eat() {
            console.log('吃狗粮')
        }
    }
}

let a = new A.Dog()
let b = new B.Dog()