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
console.log(process(3));`,

`// -- Map と Set --

const scores = new Map([
    ["Ichito",  95],
    ["Alice",   88],
    ["Bob",     72],
]);

scores.set("Charlie", 91);
scores.delete("Bob");

for (const [name, score] of scores) {
    console.log(\`\${name}: \${score}\`);
}

const tags = new Set(["js", "css", "html", "js", "css"]);
tags.add("python");

console.log([...tags]);
console.log(tags.has("js"), tags.size);`,

`// -- スプレッドとレスト（応用）--

const [first, , third, ...rest] = [1, 2, 3, 4, 5];
const { a = 10, b = 20, c }    = { c: 30 };

function sum(...nums) {
    return nums.reduce((acc, n) => acc + n, 0);
}

const arr1   = [1, 2, 3];
const arr2   = [4, 5, 6];
const merged = [...arr1, ...arr2];
const flat   = [[1, 2], [3, 4]].flat();

console.log(first, third, rest);
console.log(a, b, c);
console.log(sum(1, 2, 3, 4, 5));
console.log(merged, flat);`,

`// -- 正規表現 --

const email = /[\\w.+-]+@[\\w-]+\\.\\w+/g;
const text  = "連絡先: ichito@example.com または sub@test.io";

console.log(text.match(email));

const date  = "2026-05-14";
const m     = date.match(/(\\d{4})-(\\d{2})-(\\d{2})/);
if (m) console.log(m[1], m[2], m[3]);

const slug  = "Hello World Python".toLowerCase().replace(/\\s+/g, "-");
console.log(slug);

const valid = /^[\\w.+-]+@[\\w-]+\\.\\w+$/.test("ichito@example.com");
console.log(valid);`,

`// -- Symbol と Iterator --

const id    = Symbol("id");
const debug = Symbol("debug");

const user = {
    name: "Ichito",
    [id]:    1001,
    [debug]: true,
};

console.log(user.name);
console.log(user[id]);
console.log(Object.keys(user));

function range(start, end, step = 1) {
    return {
        [Symbol.iterator]() {
            let n = start;
            return {
                next() {
                    return n < end
                        ? { value: n += step, done: false }
                        : { value: undefined,  done: true };
                },
            };
        },
    };
}

console.log([...range(0, 10, 2)]);`,

`// -- Generator --

function* counter(start = 0, step = 1) {
    while (true) {
        yield start;
        start += step;
    }
}

function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function take(gen, n) {
    return [...Array(n)].map(() => gen.next().value);
}

console.log(take(counter(10, 2), 5));
console.log(take(fibonacci(),    8));`,

`// -- Optional Chaining と Nullish Coalescing --

const user = {
    name:    "Ichito",
    address: { city: "東京" },
    greet:   () => "こんにちは！",
};

console.log(user?.address?.city);
console.log(user?.address?.zip);
console.log(user?.profile?.avatar);
console.log(user?.greet?.());

const city    = user?.address?.city    ?? "不明";
const country = user?.address?.country ?? "日本";
const score   = null    ?? 0;
const name    = undefined ?? "ゲスト";

console.log(city, country, score, name);`,

`// -- プライベートフィールドとクラス設計 --

class EventEmitter {
    #listeners = new Map();

    on(event, fn) {
        if (!this.#listeners.has(event)) {
            this.#listeners.set(event, []);
        }
        this.#listeners.get(event).push(fn);
        return this;
    }

    emit(event, ...args) {
        this.#listeners.get(event)?.forEach(fn => fn(...args));
        return this;
    }

    off(event, fn) {
        const fns = this.#listeners.get(event) ?? [];
        this.#listeners.set(event, fns.filter(f => f !== fn));
        return this;
    }
}

const emitter = new EventEmitter();
emitter
    .on("data",  d => console.log("受信:", d))
    .on("close", () => console.log("接続終了"))
    .emit("data", { id: 1, value: 42 })
    .emit("close");`,

`// -- Fetch API --

async function getUser(username) {
    const res = await fetch(\`https://api.github.com/users/\${username}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return res.json();
}

async function postData(url, data) {
    const res = await fetch(url, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
    });
    return res.json();
}

async function main() {
    try {
        const user = await getUser("ichito-watanabe");
        console.log(user.login, user.public_repos);
    } catch (e) {
        console.error(e.message);
    }
}

main();`,

`// -- 配列の高度な操作 --

const users = [
    { name: "Ichito", age: 22, score: 95 },
    { name: "Alice",  age: 25, score: 88 },
    { name: "Bob",    age: 19, score: 72 },
    { name: "Carol",  age: 22, score: 91 },
];

const sorted   = [...users].sort((a, b) => b.score - a.score);
const topScore = users.reduce((best, u) => u.score > best.score ? u : best);
const avgScore = users.map(u => u.score).reduce((a, b) => a + b) / users.length;
const byAge    = users.filter(u => u.age === 22).map(u => u.name);

console.log(sorted.map(u => u.name));
console.log(topScore.name);
console.log(avgScore.toFixed(1));
console.log(byAge);`,

`// -- String メソッド --

const s = "  Hello, JavaScript World!  ";

console.log(s.trim());
console.log(s.toLowerCase());
console.log(s.includes("JavaScript"));
console.log(s.replace("JavaScript", "Beautiful"));
console.log(s.split(",").map(p => p.trim()));

console.log("abc".repeat(3));
console.log("42".padStart(5, "0"));
console.log("hello".at(-1));
console.log("hello world".indexOf("world"));
console.log("  hi  ".trimStart());`,

`// -- 数値と Math --

console.log(Number.isInteger(42));
console.log(Number.isFinite(Infinity));
console.log(Number.isNaN(NaN));
console.log(Number.parseInt("42px"));
console.log(Number.parseFloat("3.14rem"));

console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.round(4.5));
console.log(Math.abs(-7));
console.log(Math.max(1, 5, 3, 9, 2));
console.log(Math.min(1, 5, 3, 9, 2));

const random = Math.floor(Math.random() * 100);
console.log(random);
console.log((3.14159).toFixed(2));`,

`// -- localStorage と JSON --

const KEY = "zencode:settings";

function saveSettings(settings) {
    localStorage.setItem(KEY, JSON.stringify(settings));
}

function loadSettings() {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : { theme: "dark", lang: "python" };
}

function clearSettings() {
    localStorage.removeItem(KEY);
}

const settings = loadSettings();
settings.lang  = "typescript";
saveSettings(settings);

console.log(loadSettings());`,

`// -- Promise.all と並列実行 --

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchScore(name) {
    await delay(100);
    const scores = { Ichito: 95, Alice: 88, Bob: 72 };
    return { name, score: scores[name] ?? 0 };
}

async function main() {
    const results = await Promise.all([
        fetchScore("Ichito"),
        fetchScore("Alice"),
        fetchScore("Bob"),
    ]);

    results.forEach(({ name, score }) => {
        console.log(\`\${name}: \${score}\`);
    });

    const first = await Promise.race([
        fetchScore("Alice"),
        fetchScore("Ichito"),
    ]);
    console.log("最初:", first.name);
}

main();`,

`// -- WeakMap とメモ化 --

const cache = new WeakMap();

function memoize(fn) {
    return function(obj) {
        if (cache.has(obj)) return cache.get(obj);
        const result = fn(obj);
        cache.set(obj, result);
        return result;
    };
}

const computeTotal = memoize(user => {
    return user.scores.reduce((a, b) => a + b, 0);
});

const user1 = { name: "Ichito", scores: [90, 85, 78] };
const user2 = { name: "Alice",  scores: [95, 92, 88] };

console.log(computeTotal(user1));
console.log(computeTotal(user1));
console.log(computeTotal(user2));`

];
