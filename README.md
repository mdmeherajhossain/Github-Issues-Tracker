# JavaScript Basic Question Answer

## 1. Difference between var, let and const

var, let and const are used for declaring variable in JavaScript.

var is old system. It can re-declare and also update value.

let is new system. We can update value but we can't re-declare it in same scope.

const is used when value should not change. Once we set value it can't be change again.

## 2. What is spread operator (...)

Spread operator (...) is used to spread or copy values of array or object.

Example:
const arr1 = [1,2,3]
const arr2 = [...arr1]

Now arr2 has same values like arr1.

## 3. Difference between map(), filter(), forEach()

map() → It create a new array after changing each element.

filter() → It return only the elements that match condition.

forEach() → It just run loop in array but it does not return new array.

## 4. What is arrow function?

Arrow function is a short way to write function in JavaScript.

Example:
const sum = (a,b) => {
 return a + b
}

It make code short and simple.

## 5. What are template literals?

Template literals help to write string with variable easily.

Example:
let name = "Rahim"

My name is ${name}

With this we can add variable inside string very easy.