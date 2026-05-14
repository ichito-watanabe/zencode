var TYPESCRIPT = [

`// -- 型アノテーション（型注釈）--
// TypeScript は JavaScript に型を追加した言語
// 変数名: 型 = 値 という形式で型を明示できる

const userName: string = "Ichito";  // string型（文字列）のみ代入できる
let age: number = 22;               // number型（数値）のみ代入できる
let isStudent: boolean = true;      // boolean型（true/false）のみ代入できる

// 配列型: 型[] または Array<型>
const hobbies: string[] = ["coding", "reading", "music"];
const scores:  number[] = [90, 85, 78];

// タプル型: 固定長の配列。各要素の型が決まっている
const point: [number, number] = [10, 20];

// ユニオン型: 複数の型のどれかを受け付ける（|で区切る）
let id: number | string = 42;
id = "user_001";  // stringでも代入できる

// any型: 型チェックを無効にする（使用は最小限に）
let anything: any = "hello";
anything = 99;  // 何でも代入できるがエラーを見逃す危険がある

console.log(userName, age, hobbies);`,

`// -- インターフェース --
// interface: オブジェクトが持つべきプロパティの形（型）を定義する
// コンパイル時に形が合っているか検証される

interface User {
    id:     number;   // 必須プロパティ: 省略不可
    name:   string;   // 必須プロパティ
    email?: string;   // 任意プロパティ: ?を付けると省略可能
}

// User インターフェースを満たすオブジェクト
const user: User = {
    id:   1,
    name: "Ichito",
    // email は任意なので省略してもエラーにならない
};

// 引数と戻り値に型を指定した関数
// void: 戻り値が何もないことを明示する型
function showUser(u: User): void {
    console.log(\`[\${u.id}] \${u.name}\`);

    // email は string | undefined なので存在確認してから使う
    if (u.email) {
        // このブロック内では TypeScript が email を string と推論する
        console.log(\`メール: \${u.email}\`);
    }
}

showUser(user);`,

`// -- 型エイリアスとユニオン型 --

// type: 型に名前を付ける（インターフェースと似ているが任意の型に使える）
type ID = number | string;

// リテラルユニオン型: 特定の文字列値だけを許可する
type Status = "active" | "inactive" | "banned";

type Point = {
    x: number;
    y: number;
};

// インターセクション型（&）: 2つの型を合成して新しい型を作る
type Timestamped = {
    createdAt: Date;
    updatedAt: Date;
};

// UserRecord は User と Timestamped 両方のフィールドを持つ
interface User {
    id:   number;
    name: string;
}
type UserRecord = User & Timestamped;

// 使用例
const status: Status = "active";
// status = "deleted";  // エラー: ユニオンにない値は代入できない

const origin: Point = { x: 0, y: 0 };

// 引数と戻り値の型を明示した関数
function move(p: Point, dx: number, dy: number): Point {
    // 元のオブジェクトを変更せず新しい Point を返す
    return { x: p.x + dx, y: p.y + dy };
}

console.log(move(origin, 3, 4));  // { x: 3, y: 4 }`,

`// -- ジェネリクス（総称型）--
// ジェネリクス: 型をパラメータとして受け取ることで汎用的なコードを書く
// <T>: 型パラメータ。実際に使うときに具体的な型に置き換えられる

// number[] にも string[] にも使えるジェネリック関数
function getFirst<T>(arr: T[]): T | undefined {
    // T[]: 「T型の配列」という意味
    // T | undefined: T型またはundefinedを返す
    return arr.length > 0 ? arr[0] : undefined;
}

// 呼び出すと TypeScript が T を自動推論する
console.log(getFirst([1, 2, 3]));        // T は number に推論される -> 1
console.log(getFirst(["a", "b", "c"])); // T は string に推論される -> "a"
console.log(getFirst([]));               // undefined

// ジェネリックなインターフェース
interface ApiResponse<T> {
    data:    T;       // T はエンドポイントによって変わる
    status:  number;
    message: string;
}

// 具体的な型を指定してジェネリックを使う
const response: ApiResponse<string[]> = {
    data:    ["item1", "item2"],
    status:  200,
    message: "OK",
};

console.log(response.data);    // ["item1", "item2"]
console.log(response.status);  // 200`,

`// -- クラスとアクセス修飾子 --

// アクセス修飾子: プロパティやメソッドの公開範囲を制限する
//   public    : どこからでもアクセス可（デフォルト）
//   private   : クラス内からのみアクセス可
//   protected : クラス内とサブクラスからアクセス可
//   readonly  : コンストラクタ以外では変更不可

class BankAccount {
    readonly id:      number;  // 作成後は変更できない
    private  balance: number;  // このクラス内からしか操作できない
    public   owner:   string;  // どこからでもアクセス可

    constructor(id: number, owner: string, initialBalance: number) {
        this.id      = id;
        this.owner   = owner;
        this.balance = initialBalance;
    }

    // getter: プロパティのように読み取れる（括弧不要）
    get currentBalance(): number {
        return this.balance;
    }

    // deposit: 入金処理
    deposit(amount: number): void {
        if (amount <= 0) throw new RangeError("金額は正の数でなければなりません");
        this.balance += amount;
    }

    // withdraw: 出金処理
    withdraw(amount: number): void {
        if (amount > this.balance) throw new RangeError("残高不足です");
        this.balance -= amount;
    }
}

const account = new BankAccount(1, "Ichito", 1000);
account.deposit(500);
account.withdraw(200);
console.log(account.currentBalance);  // 1300`,

`// -- enum（列挙型）--
// enum: 関連する定数をひとまとめに命名できる型

// 数値enum: 値は 0, 1, 2, ... と自動的に割り当てられる
enum Direction {
    Up,     // 0
    Down,   // 1
    Left,   // 2
    Right,  // 3
}

// 文字列enum: 各メンバーに明示的な文字列を割り当てる
enum Color {
    Red   = "RED",
    Green = "GREEN",
    Blue  = "BLUE",
}

// switch と組み合わせてすべてのケースを網羅できる
function move(direction: Direction): void {
    switch (direction) {
        case Direction.Up:    console.log("上に移動");  break;
        case Direction.Down:  console.log("下に移動");  break;
        case Direction.Left:  console.log("左に移動");  break;
        case Direction.Right: console.log("右に移動"); break;
    }
}

move(Direction.Up);    // 上に移動
move(Direction.Right); // 右に移動

const favorite: Color = Color.Blue;
console.log(favorite);  // "BLUE"`,

`// -- 型の絞り込み（ナローイング）--
// TypeScript は制御フローを解析して型を自動的に絞り込む

// typeof によるナローイング: プリミティブ型に使う
function printLength(value: string | number): void {
    if (typeof value === "string") {
        // このブロック内では value が string と確定している
        console.log(\`文字数: \${value.length}\`);
    } else {
        // ここでは value が number と確定している
        console.log(\`数値: \${value.toFixed(2)}\`);
    }
}

// instanceof によるナローイング: クラスのインスタンスに使う
class Cat  { meow() { return "ニャー！"; } }
class Dog2 { bark() { return "ワン！";   } }

function makeSound(animal: Cat | Dog2): string {
    if (animal instanceof Cat) {
        // このブロック内では animal が Cat と確定している
        return animal.meow();
    }
    // ここでは animal が Dog2 と確定している
    return animal.bark();
}

printLength("こんにちは");  // 文字数: 5
printLength(3.14159);       // 数値: 3.14

const c = new Cat();
const d = new Dog2();
console.log(makeSound(c));  // ニャー！
console.log(makeSound(d));  // ワン！`,

`// -- ユーティリティ型 --
// TypeScript に組み込みのジェネリック型で、既存の型を変換できる

interface Product {
    id:          number;
    name:        string;
    price:       number;
    description: string;
}

// Partial<T>: すべてのフィールドを任意（optional）にする
// 更新リクエストなど「一部だけ変更」したいときに便利
type ProductUpdate = Partial<Product>;
const patch: ProductUpdate = { price: 999 };  // priceだけ変更

// Required<T>: Partial の逆。すべてのフィールドを必須にする
type FullProduct = Required<Product>;

// Pick<T, Keys>: 指定したフィールドだけを抜き出して新しい型を作る
type ProductCard = Pick<Product, "id" | "name" | "price">;
const card: ProductCard = { id: 1, name: "キーボード", price: 8000 };

// Omit<T, Keys>: 指定したフィールドを除いた新しい型を作る
type ProductWithoutId = Omit<Product, "id">;

// Readonly<T>: すべてのフィールドを読み取り専用にする
type FrozenProduct = Readonly<Product>;
const frozen: FrozenProduct = {
    id: 1, name: "マウス", price: 3000, description: "ワイヤレス"
};
// frozen.price = 2000;  // エラー: 読み取り専用プロパティに代入できない

console.log(card);`,

`// -- async/await と型 --

// Promise<T>: T型の値で解決するPromise
interface GithubUser {
    login:        string;
    public_repos: number;
}

// 戻り値の型を明示することで呼び出し元が安全に使える
async function fetchGithubUser(username: string): Promise<GithubUser> {
    const url      = \`https://api.github.com/users/\${username}\`;
    const response = await fetch(url);  // fetch はPromise<Response>を返す

    if (!response.ok) {
        // 失敗した場合はエラーを投げてcatchブロックで処理する
        throw new Error(\`HTTP \${response.status}\`);
    }

    // response.json() は Promise<any> を返すが、型アサーションで型を付ける
    const data: GithubUser = await response.json();
    return data;
}

async function main(): Promise<void> {
    try {
        const user = await fetchGithubUser("ichito-watanabe");
        console.log(\`ログイン名: \${user.login}\`);
        console.log(\`リポジトリ数: \${user.public_repos}\`);
    } catch (error) {
        // instanceof で型を絞り込んでから message にアクセスする
        if (error instanceof Error) {
            console.error(\`取得失敗: \${error.message}\`);
        }
    }
}

main();`,

`// -- デコレーター（実験的機能）--
// デコレーターを使うには tsconfig.json に
// "experimentalDecorators": true を設定する必要がある

// メソッドデコレーター: 関数を引数として受け取り、別の関数を返す
function log(
    target:      object,
    propertyKey: string,
    descriptor:  PropertyDescriptor
): PropertyDescriptor {
    // 元のメソッドを保存する
    const original = descriptor.value as (...args: unknown[]) => unknown;

    // 元のメソッドをラッパー関数で置き換える
    descriptor.value = function (...args: unknown[]) {
        console.log(\`\${propertyKey}を呼び出し: 引数=\`, args);
        const result = original.apply(this, args);
        console.log(\`\${propertyKey}の戻り値=\`, result);
        return result;
    };

    return descriptor;
}

class Calculator {
    @log  // このメソッドに log デコレーターを適用する
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
calc.add(3, 4);
// -> addを呼び出し: 引数= [3, 4]
// -> addの戻り値= 7`

];
