const JAVASCRIPT = [

`// -- Variables --
// const: value cannot be reassigned after declaration
const userName = "Ichito";

// let: value can be reassigned later
let age = 22;

// Array: ordered list enclosed in []
// Type: string[]  (array of strings)
const hobbies = ["coding", "reading", "music"];

// Object: key-value pairs enclosed in {}
const profile = {
    name: userName,   // key: "name", value: the string variable
    age: age,         // key: "age",  value: the number variable
    active: true,     // key: "active", value: boolean
};

// Template literal: uses backticks and \${} to embed values
console.log(\`Name   : \${profile.name}\`);
console.log(\`Age    : \${profile.age}\`);
console.log(\`Active : \${profile.active}\`);`,

`// -- Functions --

// Function declaration: hoisted (can be called before this line)
function greet(name, userAge) {
    // Returns a string; the caller receives this value
    return \`Hello, \${name}. You are \${userAge} years old.\`;
}

// Arrow function: shorter syntax, stored in a const
// Parameters: name (string), userAge (number)
// Returns: string
const greetArrow = (name, userAge) => {
    return \`Hello, \${name}. You are \${userAge} years old.\`;
};

// One-liner arrow: implicit return when body is a single expression
const square = (n) => n * n;

console.log(greet("Ichito", 22));       // Hello, Ichito. You are 22 years old.
console.log(greetArrow("Ichito", 22));  // same output
console.log(square(5));                 // 25

// Default parameter: used when caller does not pass the argument
const greetDefault = (name, greeting = "Hi") => \`\${greeting}, \${name}!\`;
console.log(greetDefault("Ichito"));           // Hi, Ichito!
console.log(greetDefault("Ichito", "Hello"));  // Hello, Ichito!`,

`// -- Array methods --
const numbers = [1, 2, 3, 4, 5, 6];

// map: transforms each element, returns a NEW array
// callback receives (currentValue, index, array)
const doubled = numbers.map((n) => n * 2);
console.log(doubled);   // [2, 4, 6, 8, 10, 12]

// filter: keeps elements where callback returns true
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens);     // [2, 4, 6]

// reduce: collapses array to a single value
// accumulator starts at 0 (the second argument)
const sum = numbers.reduce((accumulator, n) => accumulator + n, 0);
console.log(sum);       // 21

// find: returns the FIRST element that matches, or undefined
const firstBig = numbers.find((n) => n > 4);
console.log(firstBig);  // 5

// forEach: runs a function for each element, returns nothing
numbers.forEach((n, index) => {
    console.log(\`[\${index}] \${n}\`);
});`,

`// -- Objects & destructuring --
const user = {
    name: "Ichito",
    age: 22,
    address: {
        city: "Tokyo",
        zip: "100-0001",
    },
};

// Dot notation: access a property by name
console.log(user.name);         // Ichito

// Bracket notation: useful when key is a variable
const key = "age";
console.log(user[key]);         // 22

// Nested access
console.log(user.address.city); // Tokyo

// Destructuring: extract multiple properties at once
const { name, age } = user;
console.log(name, age);         // Ichito 22

// Nested destructuring
const { address: { city } } = user;
console.log(city);              // Tokyo

// Spread operator (...): copy all properties into a new object
const updated = { ...user, age: 23 };
console.log(updated.age);       // 23  (original user.age is still 22)`,

`// -- if / else & switch --
const score = 85;

// if / else if / else: check conditions in order
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    // Only reached when score < 90 AND score >= 80
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else {
    console.log("Grade: F");
}

// Ternary operator: shorthand for a simple if/else
// condition ? valueIfTrue : valueIfFalse
const status = score >= 60 ? "pass" : "fail";
console.log(status);  // pass

// switch: compare one value against multiple cases
const day = "Monday";
switch (day) {
    case "Saturday":
    case "Sunday":
        console.log("Weekend");
        break;  // break stops falling through to the next case
    default:
        // default runs when no case matches
        console.log("Weekday");
}`,

`// -- Loops --
const fruits = ["apple", "banana", "cherry"];

// for...of: iterate over values of an iterable (array, string, etc.)
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in: iterate over keys of an object
const scores = { math: 90, english: 85, science: 78 };
for (const subject in scores) {
    console.log(\`\${subject}: \${scores[subject]}\`);
}

// Classic for loop: when you need the index
for (let i = 0; i < fruits.length; i++) {
    console.log(\`[\${i}] \${fruits[i]}\`);
}

// while loop: runs as long as condition is true
let count = 0;
while (count < 3) {
    console.log(\`count = \${count}\`);
    count++;  // ++ adds 1 (same as count = count + 1)
}`,

`// -- Promises & async/await --

// A Promise represents a value that will arrive in the future
// States: pending -> fulfilled (resolved) or rejected
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        // Simulate network delay with setTimeout
        setTimeout(() => {
            if (id > 0) {
                // resolve: send the success value to the caller
                resolve({ id, name: "Ichito", age: 22 });
            } else {
                // reject: signal that something went wrong
                reject(new Error("Invalid ID"));
            }
        }, 500); // 500 ms delay
    });
}

// async/await: write asynchronous code that reads like sync code
// async marks the function as returning a Promise
async function main() {
    try {
        // await pauses until the Promise resolves
        const user = await fetchUser(1);
        console.log(\`User: \${user.name}\`);
    } catch (error) {
        // catch handles a rejected Promise
        console.error(\`Error: \${error.message}\`);
    }
}

main();`,

`// -- Classes --

// class: a blueprint for creating objects
class Animal {
    // constructor: called automatically when you use new Animal(...)
    constructor(name, sound) {
        this.name  = name;   // attach name to this specific object
        this.sound = sound;
    }

    // Method: a function that belongs to the class
    speak() {
        return \`\${this.name} says \${this.sound}!\`;
    }

    // toString: called implicitly when the object is coerced to a string
    toString() {
        return \`Animal(name=\${this.name})\`;
    }
}

// extends: Dog inherits everything from Animal
class Dog extends Animal {
    constructor(name) {
        // super() must be called first to initialize the parent
        super(name, "Woof");
        this.tricks = [];   // extra property only Dog has
    }

    // New method added to Dog (not in Animal)
    learnTrick(trick) {
        this.tricks.push(trick);
    }
}

const dog = new Dog("Hachi");
console.log(dog.speak());           // Hachi says Woof!
dog.learnTrick("sit");
console.log(dog.tricks);            // ["sit"]`,

`// -- Error handling --

// throw: manually raise an error
// Error types: Error, TypeError, RangeError, etc.
function divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        // TypeError signals wrong argument type
        throw new TypeError("Both arguments must be numbers");
    }
    if (b === 0) {
        throw new RangeError("Cannot divide by zero");
    }
    return a / b;
}

// try: run code that might throw
// catch: handle the error
// finally: always runs, error or not
try {
    console.log(divide(10, 2));    // 5
    console.log(divide(10, 0));    // throws RangeError
} catch (error) {
    // error.name holds the type; error.message holds the description
    console.error(\`\${error.name}: \${error.message}\`);
} finally {
    console.log("--- done ---");   // always printed
}`,

`// -- Modules (ES Module style) --
// Note: this syntax works in browsers with type="module"
// or in Node.js with "type": "module" in package.json

// math.js  (imagine this is a separate file)
// export: makes a value available to other files
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export default function square(n) { return n * n; }

// main.js  (this file)
// import: bring in exports from another file
// import square, { add, multiply } from "./math.js";

// Since we cannot use real imports here, we simulate:
const add      = (a, b) => a + b;
const multiply = (a, b) => a * b;
const square2  = (n) => n * n;

console.log(add(3, 4));       // 7
console.log(multiply(3, 4));  // 12
console.log(square2(5));      // 25

// Named vs default exports:
// Named:   export const foo = ...   -> import { foo } from "..."
// Default: export default ...       -> import foo    from "..."`

];
