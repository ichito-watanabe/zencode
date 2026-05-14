const JAVASCRIPT = [

`// ── 変数宣言 ──

// const: 宣言後に再代入できない定数。基本的にこちらを使う
const userName = "Ichito";

// let: 後から値を変更できる変数
let age = 22;

// 配列: []で作る順序付きリスト。型はstring[]（文字列の配列）
const hobbies = ["coding", "reading", "music"];

// オブジェクト: {}で作るキーと値のペア
const profile = {
    name:   userName,  // キー: name、値: userName変数の中身
    age:    age,       // キー: age、値: age変数の中身
    active: true,      // キー: active、値: 真偽値
};

// テンプレートリテラル: バッククォートで囲み${}で変数を埋め込む
console.log(\`名前   : \${profile.name}\`);
console.log(\`年齢   : \${profile.age}\`);
console.log(\`有効   : \${profile.active}\`);`,

`// ── 関数の書き方 ──

// 関数宣言: function キーワードを使う
// ホイスティング（巻き上げ）により宣言前に呼び出すことができる
function greet(name, userAge) {
    // return: 呼び出し元にこの値を返す
    return \`こんにちは、\${name}さん。\${userAge}歳ですね。\`;
}

// アロー関数: より短い構文で関数を定義する
// 変数に代入するのでホイスティングはされない
const greetArrow = (name, userAge) => {
    return \`こんにちは、\${name}さん。\${userAge}歳ですね。\`;
};

// 1行アロー関数: 式が1つだけなら return と {} を省略できる
const square = (n) => n * n;

console.log(greet("Ichito", 22));        // こんにちは、Ichitoさん。22歳ですね。
console.log(greetArrow("Ichito", 22));   // 同じ出力

// デフォルト引数: 呼び出し時に引数が省略された場合に使われる値
const greetDefault = (name, greeting = "こんにちは") =>
    \`\${greeting}、\${name}さん！\`;

console.log(greetDefault("Ichito"));            // こんにちは、Ichitoさん！
console.log(greetDefault("Ichito", "やあ"));   // やあ、Ichitoさん！`,

`// ── 配列メソッド ──

const numbers = [1, 2, 3, 4, 5, 6];

// map: 各要素を変換した新しい配列を返す（元の配列は変わらない）
// コールバック関数: (現在の値, インデックス, 元の配列) => 変換後の値
const doubled = numbers.map((n) => n * 2);
console.log(doubled);   // [2, 4, 6, 8, 10, 12]

// filter: コールバックが true を返す要素だけを集めた新しい配列を返す
const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens);     // [2, 4, 6]

// reduce: 配列を1つの値に集約する
// accumulator: 前の反復の結果（初期値は第2引数の 0）
const sum = numbers.reduce((accumulator, n) => accumulator + n, 0);
console.log(sum);       // 21

// find: 条件に最初にマッチした要素を返す。なければ undefined
const firstBig = numbers.find((n) => n > 4);
console.log(firstBig);  // 5

// forEach: 各要素に対して処理を実行する（戻り値はない）
numbers.forEach((n, index) => {
    console.log(\`[\${index}] \${n}\`);
});`,

`// ── オブジェクトと分割代入 ──

const user = {
    name:    "Ichito",
    age:     22,
    address: {
        city: "東京",
        zip:  "100-0001",
    },
};

// ドット記法: プロパティ名で値にアクセスする
console.log(user.name);         // Ichito

// ブラケット記法: 変数をキーとして使いたいときに便利
const key = "age";
console.log(user[key]);         // 22

// ネストしたオブジェクトへのアクセス
console.log(user.address.city); // 東京

// 分割代入: 複数のプロパティを一度に変数として取り出す
const { name, age } = user;
console.log(name, age);         // Ichito 22

// ネストした分割代入
const { address: { city } } = user;
console.log(city);              // 東京

// スプレッド演算子（...）: オブジェクトのプロパティをすべてコピーして新しいオブジェクトを作る
// 元の user.age は変わらない（イミュータブルな更新）
const updated = { ...user, age: 23 };
console.log(updated.age);       // 23`,

`// ── 条件分岐: if / else と switch ──

const score = 85;

// if / else if / else: 条件を上から順に評価する
if (score >= 90) {
    console.log("評価: A");
} else if (score >= 80) {
    // score < 90 かつ score >= 80 のときここに来る
    console.log("評価: B");
} else if (score >= 70) {
    console.log("評価: C");
} else {
    console.log("評価: F");
}

// 三項演算子: 条件 ? trueの値 : falseの値
const status = score >= 60 ? "合格" : "不合格";
console.log(status);  // 合格

// switch: 1つの値を複数の case と比較する
const day = "月曜日";
switch (day) {
    case "土曜日":
    case "日曜日":
        // 2つのcaseが同じブロックを共有 → どちらでも同じ処理
        console.log("週末");
        break;  // break がないと次のcase に処理が流れてしまう（フォールスルー）
    default:
        // どのcaseにも一致しなかった場合
        console.log("平日");
}`,

`// ── ループ ──

const fruits = ["りんご", "バナナ", "さくらんぼ"];

// for...of: 配列・文字列など反復可能なオブジェクトの値を順に取り出す
for (const fruit of fruits) {
    console.log(fruit);
}

// for...in: オブジェクトのキーを順に取り出す
const scores = { 数学: 90, 英語: 85, 理科: 78 };
for (const subject in scores) {
    console.log(\`\${subject}: \${scores[subject]}\`);
}

// 古典的な for ループ: インデックスが必要なときに使う
for (let i = 0; i < fruits.length; i++) {
    console.log(\`[\${i}] \${fruits[i]}\`);
}

// while ループ: 条件が true の間繰り返す
let count = 0;
while (count < 3) {
    console.log(\`count = \${count}\`);
    count++;  // ++ は 1 加算する（count = count + 1 と同じ）
}`,

`// ── Promise と async/await ──

// Promise: 非同期処理の「将来の値」を表すオブジェクト
// 状態: pending（待機中）→ fulfilled（成功）または rejected（失敗）
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        // setTimeout: 指定ミリ秒後にコールバックを実行する（擬似的な遅延）
        setTimeout(() => {
            if (id > 0) {
                // resolve: 成功した結果を呼び出し元に渡す
                resolve({ id, name: "Ichito", age: 22 });
            } else {
                // reject: 失敗を通知する
                reject(new Error("IDが不正です"));
            }
        }, 500); // 500ミリ秒後に実行
    });
}

// async/await: 非同期処理を同期的なコードのように書ける
// async: Promiseを返す関数として宣言する
async function main() {
    try {
        // await: Promiseが解決するまで処理を一時停止する
        const user = await fetchUser(1);
        console.log(\`ユーザー: \${user.name}\`);
    } catch (error) {
        // catchブロック: Promiseが reject されたときに実行される
        console.error(\`エラー: \${error.message}\`);
    }
}

main();`,

`// ── クラス ──

// class: オブジェクトを生成するための設計図
class Animal {
    // constructor: new Animal(...) で呼び出したときに自動実行される
    constructor(name, sound) {
        this.name  = name;   // this: 生成されたオブジェクト自身を指す
        this.sound = sound;
    }

    // メソッド: クラスに属する関数
    speak() {
        return \`\${this.name}は\${this.sound}と鳴く！\`;
    }

    // toString: オブジェクトを文字列に変換するときに暗黙的に呼ばれる
    toString() {
        return \`Animal(name=\${this.name})\`;
    }
}

// extends: Dog は Animal を継承する（Animalの機能をすべて引き継ぐ）
class Dog extends Animal {
    constructor(name) {
        // super(): 親クラス（Animal）のコンストラクタを呼ぶ（必須）
        super(name, "ワン");
        this.tricks = [];  // Dog固有の追加プロパティ
    }

    // Dog だけが持つメソッド（Animal にはない）
    learnTrick(trick) {
        this.tricks.push(trick);  // tricks配列の末尾に追加
    }
}

const dog = new Dog("ハチ");
console.log(dog.speak());           // ハチはワンと鳴く！
dog.learnTrick("お手");
console.log(dog.tricks);            // ["お手"]`,

`// ── エラーハンドリング ──

// throw: 意図的にエラーを発生させる
// エラーの種類: Error（汎用）, TypeError（型が違う）, RangeError（範囲外）など
function divide(a, b) {
    if (typeof a !== "number" || typeof b !== "number") {
        // typeof: 変数の型を文字列で返す演算子
        throw new TypeError("引数は数値でなければなりません");
    }
    if (b === 0) {
        // RangeError: 数値の範囲が不正なときに使う
        throw new RangeError("0で割ることはできません");
    }
    return a / b;
}

// try: エラーが発生するかもしれないコードを書く
// catch: エラーを受け取って処理する
// finally: エラーの有無にかかわらず必ず実行される
try {
    console.log(divide(10, 2));    // 5
    console.log(divide(10, 0));    // → RangeError が throw される
} catch (error) {
    // error.name: エラーの種類名
    // error.message: エラーに渡したメッセージ
    console.error(\`\${error.name}: \${error.message}\`);
} finally {
    console.log("── 処理完了 ──");  // 必ず実行される
}`,

`// ── モジュール（ESモジュール形式）──
// この構文はブラウザで type="module" または
// Node.js で "type": "module" を指定した場合に使える

// math.js（別ファイルのイメージ）
// export: 他のファイルから使えるようにする
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;
// export default function square(n) { return n * n; }

// main.js（このファイルのイメージ）
// import: 別ファイルのexportを読み込む
// import square, { add, multiply } from "./math.js";

// ここでは実際にimportできないため、同等の関数を直接定義する
const add      = (a, b) => a + b;       // 加算
const multiply = (a, b) => a * b;       // 乗算
const square2  = (n) => n * n;          // 二乗

console.log(add(3, 4));       // 7
console.log(multiply(3, 4));  // 12
console.log(square2(5));      // 25

// 名前付きexport と デフォルトexport の違い:
// 名前付き: export const foo = ...   → import { foo } from "..."
// デフォルト: export default ...     → import foo    from "..."`

];
