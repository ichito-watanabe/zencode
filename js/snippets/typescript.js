const TYPESCRIPT = [

`// -- Type annotations --
// TypeScript adds types on top of JavaScript
// Syntax: variableName: Type = value

const userName: string = "Ichito";  // only strings allowed
let age: number = 22;               // only numbers allowed
let isStudent: boolean = true;      // only true / false

// Array type: Type[]  or  Array<Type>
const hobbies: string[] = ["coding", "reading", "music"];
const scores: number[]  = [90, 85, 78];

// Tuple: fixed-length array where each position has a known type
const point: [number, number] = [10, 20];

// Union type: the variable can hold one of several types
let id: number | string = 42;
id = "user_001";  // also valid because of the union

// any: disables type checking (use sparingly)
let anything: any = "hello";
anything = 99;  // no error, but loses type safety

console.log(userName, age, hobbies);`,

`// -- Interfaces --
// interface: describes the shape an object must have
// TypeScript checks at compile time that the shape matches

interface User {
    id:     number;   // required field
    name:   string;   // required field
    email?: string;   // optional field (? means it may be absent)
}

// This object satisfies the User interface
const user: User = {
    id:   1,
    name: "Ichito",
    // email is omitted — allowed because it is optional
};

// TypeScript will error if a required field is missing or wrong type
// const bad: User = { id: "x", name: 1 };  // ERROR

function showUser(u: User): void {
    // void: the function returns nothing
    console.log(\`[\${u.id}] \${u.name}\`);
    if (u.email) {
        // Inside this block TypeScript knows email is string, not undefined
        console.log(\`Email: \${u.email}\`);
    }
}

showUser(user);`,

`// -- Type aliases & Union types --

// type alias: give a name to any type expression
type ID = number | string;

type Status = "active" | "inactive" | "banned";  // string literal union

type Point = {
    x: number;
    y: number;
};

// Intersection type (&): combine two types into one
type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};

type UserRecord = User & Timestamped;
// UserRecord must have all fields from both User and Timestamped

// Usage
const status: Status = "active";
// status = "deleted";  // ERROR: not in the union

const origin: Point = { x: 0, y: 0 };

function move(p: Point, dx: number, dy: number): Point {
    // Returns a new Point object (does not mutate the original)
    return { x: p.x + dx, y: p.y + dy };
}

console.log(move(origin, 3, 4));  // { x: 3, y: 4 }

interface User {
    id:   number;
    name: string;
}`,

`// -- Generics --
// Generics let you write code that works with any type
// <T> is a type parameter — T is replaced with a real type at use time

// Generic function: works with number[], string[], etc.
function getFirst<T>(arr: T[]): T | undefined {
    // T[] means "array of T"
    // Returns T (the element) or undefined if array is empty
    return arr.length > 0 ? arr[0] : undefined;
}

console.log(getFirst([1, 2, 3]));        // 1   (T inferred as number)
console.log(getFirst(["a", "b", "c"])); // "a" (T inferred as string)
console.log(getFirst([]));               // undefined

// Generic interface
interface ApiResponse<T> {
    data:    T;       // T is the payload type; changes per endpoint
    status:  number;
    message: string;
}

// Use the generic with a concrete type
const response: ApiResponse<string[]> = {
    data:    ["item1", "item2"],
    status:  200,
    message: "OK",
};

console.log(response.data);    // ["item1", "item2"]
console.log(response.status);  // 200`,

`// -- Classes with TypeScript --

// Access modifiers control visibility:
//   public    : accessible from anywhere (default)
//   private   : accessible only inside this class
//   protected : accessible inside this class and subclasses
//   readonly  : can be set in constructor, not changed after

class BankAccount {
    readonly id:        number;
    private  balance:   number;
    public   owner:     string;

    constructor(id: number, owner: string, initialBalance: number) {
        this.id      = id;
        this.owner   = owner;
        this.balance = initialBalance;
    }

    // Getter: accessed like a property (no parentheses)
    get currentBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        if (amount <= 0) throw new RangeError("Amount must be positive");
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount > this.balance) throw new RangeError("Insufficient funds");
        this.balance -= amount;
    }
}

const account = new BankAccount(1, "Ichito", 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.currentBalance);  // 1300`,

`// -- Enums --
// enum: a set of named constants
// Numeric enum: values are 0, 1, 2, ... by default

enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right,  // 3
}

// String enum: each member has an explicit string value
enum Color {
    Red   = "RED",
    Green = "GREEN",
    Blue  = "BLUE",
}

function move(direction: Direction): void {
    switch (direction) {
        case Direction.Up:    console.log("Moving up");    break;
        case Direction.Down:  console.log("Moving down");  break;
        case Direction.Left:  console.log("Moving left");  break;
        case Direction.Right: console.log("Moving right"); break;
    }
}

move(Direction.Up);    // Moving up
move(Direction.Right); // Moving right

const favorite: Color = Color.Blue;
console.log(favorite);  // "BLUE"`,

`// -- Type narrowing --
// TypeScript uses control flow to narrow a broad type to a specific one

// typeof narrowing: works for primitive types
function printLength(value: string | number): void {
    if (typeof value === "string") {
        // Inside this block TypeScript knows value is string
        console.log(\`String length: \${value.length}\`);
    } else {
        // Here TypeScript knows value is number
        console.log(\`Number: \${value.toFixed(2)}\`);
    }
}

// instanceof narrowing: works for class instances
class Cat  { meow()  { return "Meow!";  } }
class Dog2 { bark()  { return "Woof!";  } }

function makeSound(animal: Cat | Dog2): string {
    if (animal instanceof Cat) {
        return animal.meow();   // TypeScript knows it is Cat here
    }
    return animal.bark();       // TypeScript knows it is Dog2 here
}

printLength("hello");  // String length: 5
printLength(3.14159);  // Number: 3.14

const c = new Cat();
const d = new Dog2();
console.log(makeSound(c));  // Meow!
console.log(makeSound(d));  // Woof!`,

`// -- Utility types --
// TypeScript ships with built-in generic types that transform other types

interface Product {
    id:          number;
    name:        string;
    price:       number;
    description: string;
}

// Partial<T>: makes every field optional
// Useful for update payloads where you only send changed fields
type ProductUpdate = Partial<Product>;
const patch: ProductUpdate = { price: 999 };  // only price changed

// Required<T>: opposite of Partial — every field is required
type FullProduct = Required<Product>;

// Pick<T, Keys>: select only the listed fields
type ProductCard = Pick<Product, "id" | "name" | "price">;
const card: ProductCard = { id: 1, name: "Keyboard", price: 8000 };

// Omit<T, Keys>: exclude the listed fields
type ProductWithoutId = Omit<Product, "id">;

// Readonly<T>: prevents any field from being reassigned
type FrozenProduct = Readonly<Product>;
const frozen: FrozenProduct = { id: 1, name: "Mouse", price: 3000, description: "Wireless" };
// frozen.price = 2000;  // ERROR: cannot assign to readonly property

console.log(card);`,

`// -- Async / Await with types --

// Promise<T>: a Promise that resolves with type T
interface GithubUser {
    login:      string;
    public_repos: number;
}

// The return type annotation tells callers what to expect
async function fetchGithubUser(username: string): Promise<GithubUser> {
    const url = \`https://api.github.com/users/\${username}\`;
    const response = await fetch(url);  // fetch returns Promise<Response>

    if (!response.ok) {
        // Throw an error so the caller's catch block handles it
        throw new Error(\`HTTP \${response.status}\`);
    }

    // response.json() returns Promise<any>; we cast it to GithubUser
    const data: GithubUser = await response.json();
    return data;
}

async function main(): Promise<void> {
    try {
        const user = await fetchGithubUser("ichito-watanabe");
        console.log(\`Login: \${user.login}\`);
        console.log(\`Repos: \${user.public_repos}\`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(\`Failed: \${error.message}\`);
        }
    }
}

main();`,

`// -- Decorators (experimental) --
// Decorators add metadata or behavior to classes and methods
// Enable with: "experimentalDecorators": true in tsconfig.json

// A simple logging decorator for methods
function log(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    // Save the original method so we can call it
    const original = descriptor.value as (...args: unknown[]) => unknown;

    // Replace the method with our wrapper
    descriptor.value = function (...args: unknown[]) {
        console.log(\`Calling \${propertyKey} with\`, args);
        const result = original.apply(this, args);
        console.log(\`\${propertyKey} returned\`, result);
        return result;
    };

    return descriptor;
}

class Calculator {
    @log  // applies the log decorator to this method
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(3, 4);
// Calling add with [3, 4]
// add returned 7`

];
