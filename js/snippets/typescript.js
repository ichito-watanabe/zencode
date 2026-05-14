var TYPESCRIPT = [

`// -- 型アノテーション --

const userName: string  = "Ichito";
let   age:      number  = 22;
let   isActive: boolean = true;

const hobbies: string[] = ["coding", "reading", "music"];
const scores:  number[] = [90, 85, 78];

const point: [number, number] = [10, 20];

let id: number | string = 42;
id = "user_001";

console.log(userName, age, hobbies, point, id);`,

`// -- インターフェース --

interface User {
    id:     number;
    name:   string;
    email?: string;
}

const user: User = { id: 1, name: "Ichito" };

function showUser(u: User): void {
    console.log(\`[\${u.id}] \${u.name}\`);
    if (u.email) console.log(u.email);
}

showUser(user);`,

`// -- 型エイリアスとユニオン型 --

type ID     = number | string;
type Status = "active" | "inactive" | "banned";
type Point  = { x: number; y: number };

interface User       { id: number; name: string; }
type      UserRecord = User & { createdAt: Date; updatedAt: Date };

const status: Status = "active";
const origin: Point  = { x: 0, y: 0 };

function move(p: Point, dx: number, dy: number): Point {
    return { x: p.x + dx, y: p.y + dy };
}

console.log(move(origin, 3, 4));`,

`// -- ジェネリクス --

function getFirst<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
}

console.log(getFirst([1, 2, 3]));
console.log(getFirst(["a", "b", "c"]));
console.log(getFirst([]));

interface ApiResponse<T> {
    data:    T;
    status:  number;
    message: string;
}

const response: ApiResponse<string[]> = {
    data:    ["item1", "item2"],
    status:  200,
    message: "OK",
};

console.log(response.data);
console.log(response.status);`,

`// -- クラスとアクセス修飾子 --

class BankAccount {
    readonly id:      number;
    private  balance: number;
    public   owner:   string;

    constructor(id: number, owner: string, initialBalance: number) {
        this.id      = id;
        this.owner   = owner;
        this.balance = initialBalance;
    }

    get currentBalance(): number { return this.balance; }

    deposit(amount: number): void {
        if (amount <= 0) throw new RangeError("金額は正の数でなければなりません");
        this.balance += amount;
    }

    withdraw(amount: number): void {
        if (amount > this.balance) throw new RangeError("残高不足です");
        this.balance -= amount;
    }
}

const account = new BankAccount(1, "Ichito", 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.currentBalance);`,

`// -- enum --

enum Direction { Up, Down, Left, Right }

enum Color {
    Red   = "RED",
    Green = "GREEN",
    Blue  = "BLUE",
}

function move(direction: Direction): void {
    switch (direction) {
        case Direction.Up:    console.log("上に移動");  break;
        case Direction.Down:  console.log("下に移動");  break;
        case Direction.Left:  console.log("左に移動");  break;
        case Direction.Right: console.log("右に移動"); break;
    }
}

move(Direction.Up);
move(Direction.Right);
console.log(Color.Blue);`,

`// -- 型の絞り込み --

function printLength(value: string | number): void {
    if (typeof value === "string") {
        console.log(\`文字数: \${value.length}\`);
    } else {
        console.log(\`数値: \${value.toFixed(2)}\`);
    }
}

class Cat  { meow() { return "ニャー！"; } }
class Dog2 { bark() { return "ワン！";   } }

function makeSound(animal: Cat | Dog2): string {
    if (animal instanceof Cat) return animal.meow();
    return animal.bark();
}

printLength("こんにちは");
printLength(3.14159);
console.log(makeSound(new Cat()));
console.log(makeSound(new Dog2()));`,

`// -- ユーティリティ型 --

interface Product {
    id:          number;
    name:        string;
    price:       number;
    description: string;
}

type ProductUpdate    = Partial<Product>;
type ProductCard      = Pick<Product, "id" | "name" | "price">;
type ProductWithoutId = Omit<Product, "id">;
type FrozenProduct    = Readonly<Product>;

const patch: ProductUpdate = { price: 999 };
const card:  ProductCard   = { id: 1, name: "キーボード", price: 8000 };
const frozen: FrozenProduct = {
    id: 1, name: "マウス", price: 3000, description: "ワイヤレス"
};

console.log(patch, card);`,

`// -- async/await と型 --

interface GithubUser {
    login:        string;
    public_repos: number;
}

async function fetchGithubUser(username: string): Promise<GithubUser> {
    const url      = \`https://api.github.com/users/\${username}\`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
    return response.json() as Promise<GithubUser>;
}

async function main(): Promise<void> {
    try {
        const user = await fetchGithubUser("ichito-watanabe");
        console.log(\`\${user.login}: \${user.public_repos}リポジトリ\`);
    } catch (error) {
        if (error instanceof Error) console.error(error.message);
    }
}

main();`,

`// -- デコレーター --

function log(
    target:      object,
    propertyKey: string,
    descriptor:  PropertyDescriptor
): PropertyDescriptor {
    const original = descriptor.value as (...args: unknown[]) => unknown;
    descriptor.value = function (...args: unknown[]) {
        console.log(\`\${propertyKey}: 引数=\`, args);
        const result = original.apply(this, args);
        console.log(\`\${propertyKey}: 戻り値=\`, result);
        return result;
    };
    return descriptor;
}

class Calculator {
    @log
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(3, 4);`

];
