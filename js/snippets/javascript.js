var JAVASCRIPT = [

`// -- 変数 --

const name    = "Ichito";
const age     = 22;
let   counter = 0;

const hobbies = ["coding", "reading", "music"];
const profile = { name, age, city: "東京" };

counter++;
console.log(profile);
console.log(\`\${name}は\${age}歳\`);`,

`// -- 関数とアロー関数 --

function greet(name, age) {
    return \`こんにちは、\${name}さん。\${age}歳ですね。\`;
}

const double = (n) => n * 2;
const add    = (a, b) => a + b;

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(double);
const sum     = numbers.reduce(add, 0);

console.log(greet("Ichito", 22));
console.log(doubled);
console.log(sum);`,

`// -- 配列メソッド --

const items  = ["a", "b", "c", "d", "e"];
const upper  = items.map(s => s.toUpperCase());
const evens  = [1, 2, 3, 4, 5, 6].filter(n => n % 2 === 0);
const total  = [10, 20, 30].reduce((acc, n) => acc + n, 0);
const found  = items.find(s => s === "c");
const sorted = [...items].sort();

console.log(upper);
console.log(evens, total);
console.log(found, sorted);`,

`// -- オブジェクトと分割代入 --

const user = { id: 1, name: "Ichito", age: 22 };

const { name, age }   = user;
const { id, ...rest } = user;
const updated         = { ...user, age: 23 };

const pairs = Object.entries(user);

console.log(name, age);
console.log(rest);
console.log(updated);
console.log(pairs);`,

`// -- 条件分岐 --

const score = 85;

if (score >= 90) {
    console.log("評価: A");
} else if (score >= 80) {
    console.log("評価: B");
} else if (score >= 70) {
    console.log("評価: C");
} else {
    console.log("評価: F");
}

const status = score >= 60 ? "合格" : "不合格";

const day = "月曜日";
switch (day) {
    case "土曜日":
    case "日曜日":
        console.log("週末");
        break;
    default:
        console.log("平日");
}`,

`// -- ループ --

const fruits = ["りんご", "バナナ", "さくらんぼ"];

for (const fruit of fruits) {
    console.log(fruit);
}

const scores = { 数学: 90, 英語: 85, 理科: 78 };
for (const subject in scores) {
    console.log(\`\${subject}: \${scores[subject]}\`);
}

let count = 0;
while (count < 3) {
    console.log(\`count = \${count}\`);
    count++;
}`,

`// -- クラスと継承 --

class Animal {
    constructor(name, sound) {
        this.name  = name;
        this.sound = sound;
    }

    speak() {
        return \`\${this.name}は\${this.sound}と鳴く！\`;
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name, "ワン");
        this.tricks = [];
    }

    learnTrick(trick) {
        this.tricks.push(trick);
    }
}

const dog = new Dog("ハチ");
console.log(dog.speak());
dog.learnTrick("お手");
console.log(dog.tricks);`,

`// -- 非同期処理 --

function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: "Ichito", age: 22 });
            } else {
                reject(new Error("IDが不正です"));
            }
        }, 500);
    });
}

async function main() {
    try {
        const user = await fetchUser(1);
        console.log(\`ユーザー: \${user.name}\`);
    } catch (error) {
        console.error(\`エラー: \${error.message}\`);
    }
}

main();`,

`// -- エラーハンドリング --

function divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        throw new TypeError("引数は数値でなければなりません");
    }
    if (b === 0) {
        throw new RangeError("0で割ることはできません");
    }
    return a / b;
}

try {
    console.log(divide(10, 2));
    console.log(divide(10, 0));
} catch (error) {
    console.error(\`\${error.name}: \${error.message}\`);
} finally {
    console.log("処理完了");
}`,

`// -- クロージャ --

function makeCounter(start = 0) {
    let count = start;
    return {
        increment: () => ++count,
        decrement: () => --count,
        reset:     () => { count = start; },
        value:     () => count,
    };
}

const counter = makeCounter(10);
counter.increment();
counter.increment();
counter.decrement();
console.log(counter.value());

const pipe    = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const process = pipe(x => x * 2, x => x + 1, x => x ** 2);
console.log(process(3));`

];
