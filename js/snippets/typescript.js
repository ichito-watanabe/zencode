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
calc.add(3, 4);`,

`// -- 条件型 --

type IsString<T>    = T extends string ? "文字列" : "その他";
type Flatten<T>     = T extends Array<infer U> ? U : T;
type NonNullable2<T> = T extends null | undefined ? never : T;

type A = IsString<string>;
type B = IsString<number>;
type C = Flatten<number[]>;
type D = Flatten<string>;

function processValue<T>(value: T): IsString<T> {
    return (typeof value === "string" ? "文字列" : "その他") as IsString<T>;
}

console.log(processValue("hello"));
console.log(processValue(42));`,

`// -- Mapped Types --

type ReadOnly2<T>  = { readonly [K in keyof T]: T[K] };
type Optional2<T>  = { [K in keyof T]?: T[K] };
type Nullable<T>   = { [K in keyof T]: T[K] | null };
type Stringify<T>  = { [K in keyof T]: string };

interface Config {
    host:    string;
    port:    number;
    debug:   boolean;
    timeout: number;
}

type ReadonlyConfig = ReadOnly2<Config>;
type OptionalConfig = Optional2<Config>;

const config: ReadonlyConfig = { host: "localhost", port: 3000, debug: true, timeout: 5000 };
const patch:  OptionalConfig = { host: "production.server.com" };

console.log(config, patch);`,

`// -- keyof と typeof --

interface Product {
    id:    number;
    name:  string;
    price: number;
}

type ProductKey = keyof Product;

function get<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

function set<T, K extends keyof T>(obj: T, key: K, value: T[K]): void {
    obj[key] = value;
}

const item: Product = { id: 1, name: "キーボード", price: 8000 };

console.log(get(item, "name"));
console.log(get(item, "price"));
set(item, "price", 7500);
console.log(item);`,

`// -- インデックスシグネチャ --

interface StringMap { [key: string]: string; }
interface NumberMap { [key: string]: number; }

const colors: StringMap = {
    red:   "#ff0000",
    green: "#00ff00",
    blue:  "#0000ff",
};

const scores: NumberMap = {
    math:    90,
    english: 85,
    science: 78,
};

function merge<T>(
    a: { [k: string]: T },
    b: { [k: string]: T }
): { [k: string]: T } {
    return { ...a, ...b };
}

console.log(colors["red"]);
console.log(merge(scores, { art: 92 }));`,

`// -- 関数のオーバーロード --

function format(value: number): string;
function format(value: string): string;
function format(value: Date):   string;
function format(value: number | string | Date): string {
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }
    if (typeof value === "number") {
        return value.toLocaleString("ja-JP");
    }
    return value.trim();
}

console.log(format(1234567));
console.log(format("  hello world  "));
console.log(format(new Date("2026-05-14")));`,

`// -- 型ガード --

interface Cat  { kind: "cat";  meow(): string; }
interface Dog3 { kind: "dog";  bark(): string; }
interface Bird { kind: "bird"; fly():  string; }

type Animal = Cat | Dog3 | Bird;

function isCat(a: Animal): a is Cat  { return a.kind === "cat"; }
function isDog(a: Animal): a is Dog3 { return a.kind === "dog"; }

function makeSound(animal: Animal): string {
    if (isCat(animal)) return animal.meow();
    if (isDog(animal)) return animal.bark();
    return animal.fly();
}

const animals: Animal[] = [
    { kind: "cat",  meow: () => "ニャー"   },
    { kind: "dog",  bark: () => "ワン"     },
    { kind: "bird", fly:  () => "パタパタ" },
];

animals.forEach(a => console.log(makeSound(a)));`,

`// -- Record と Extract / Exclude --

type Role = "admin" | "editor" | "viewer";

const permissions: Record<Role, string[]> = {
    admin:  ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
};

type StringOrNumber = string | number | boolean;
type OnlyStrNum     = Extract<StringOrNumber, string | number>;
type NotBool        = Exclude<StringOrNumber, boolean>;

function hasPermission(role: Role, action: string): boolean {
    return permissions[role].includes(action);
}

console.log(hasPermission("admin",  "delete"));
console.log(hasPermission("viewer", "write"));
console.log(permissions);`,

`// -- infer と ReturnType --

type ReturnType2<T>  = T extends (...args: unknown[]) => infer R ? R : never;
type FirstArg<T>     = T extends (first: infer F, ...rest: unknown[]) => unknown ? F : never;
type Awaited2<T>     = T extends Promise<infer U> ? Awaited2<U> : T;

type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Fn = (x: number, y: string) => boolean;
type R  = ReturnType2<Fn>;
type F  = FirstArg<Fn>;
type AW = Awaited2<Promise<Promise<string>>>;

const config: DeepReadonly<{ db: { host: string; port: number } }> = {
    db: { host: "localhost", port: 5432 },
};

console.log(config.db.host);`,

`// -- Template Literal Types --

type Direction   = "top" | "right" | "bottom" | "left";
type Property    = "margin" | "padding";
type CSSProp     = \`\${Property}-\${Direction}\`;

type EventName   = "click" | "focus" | "blur";
type HandlerName = \`on\${Capitalize<EventName>}\`;

function createHandler<E extends EventName>(event: E): HandlerName {
    const cap = event.charAt(0).toUpperCase() + event.slice(1);
    return \`on\${cap}\` as HandlerName;
}

const marginTop:    CSSProp     = "margin-top";
const paddingLeft:  CSSProp     = "padding-left";
const clickHandler: HandlerName = createHandler("click");

console.log(marginTop, paddingLeft, clickHandler);`,

`// -- Branded Types --

type Brand<T, B extends string> = T & { readonly _brand: B };

type UserId  = Brand<number, "UserId">;
type OrderId = Brand<number, "OrderId">;
type Email   = Brand<string, "Email">;

function createUserId(id: number):  UserId  { return id as UserId; }
function createOrderId(id: number): OrderId { return id as OrderId; }
function createEmail(e: string):    Email   { return e as Email; }

function fetchUser(id: UserId):    void { console.log(\`ユーザー: \${id}\`); }
function fetchOrder(id: OrderId):  void { console.log(\`注文: \${id}\`); }

const userId  = createUserId(1);
const orderId = createOrderId(42);

fetchUser(userId);
fetchOrder(orderId);`,

`// -- satisfies 演算子 --

type Color   = "red" | "green" | "blue";
type Palette = Record<Color, string | [number, number, number]>;

const palette = {
    red:   "#ff0000",
    green: [0, 255, 0],
    blue:  "#0000ff",
} satisfies Palette;

console.log(palette.red.toUpperCase());
console.log(palette.green[0]);

type Route = { path: string; component: string; exact?: boolean };

const routes = [
    { path: "/",       component: "Home",  exact: true },
    { path: "/about",  component: "About"              },
    { path: "/login",  component: "Login"              },
] satisfies Route[];

console.log(routes[0].path);`,

`// -- 高階関数とジェネリクス --

function compose<T>(...fns: ((x: T) => T)[]): (x: T) => T {
    return (x) => fns.reduceRight((v, f) => f(v), x);
}

function pipe3<T>(...fns: ((x: T) => T)[]): (x: T) => T {
    return (x) => fns.reduce((v, f) => f(v), x);
}

function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
    const cache = new Map<T, R>();
    return (arg) => {
        if (cache.has(arg)) return cache.get(arg)!;
        const result = fn(arg);
        cache.set(arg, result);
        return result;
    };
}

const double  = (n: number) => n * 2;
const addOne  = (n: number) => n + 1;
const square  = (n: number) => n ** 2;

const transform = pipe3(double, addOne, square);
console.log(transform(3));

const fib = memoize((n: number): number => n <= 1 ? n : fib(n - 1) + fib(n - 2));
console.log(fib(10));`

];
