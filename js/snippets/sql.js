var SQL = [

`-- ── テーブルの作成（CREATE TABLE）──
-- テーブル: データを行と列で管理する入れ物
-- 各列には 列名・データ型・制約 を定義する

CREATE TABLE users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    -- PRIMARY KEY: 行を一意に識別するキー（重複不可・NULL不可）
    -- AUTOINCREMENT: 挿入のたびに自動で次の整数を割り当てる

    username   TEXT    NOT NULL UNIQUE,
    -- NOT NULL: この列を空（NULL）のまま挿入することを禁止する
    -- UNIQUE: 列内の値がすべて異なることを強制する

    email      TEXT    NOT NULL UNIQUE,
    age        INTEGER,
    -- 制約なし: ageはNULL（不明）を許容する

    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    -- DEFAULT: 値を省略した場合に自動で入力される値
    -- datetime('now'): SQLiteで現在日時を取得する関数
);`,

`-- ── データの挿入（INSERT）──

-- INSERT INTO テーブル名 (列名, ...) VALUES (値, ...);
-- 列リストと値の順番は必ず一致させる

-- 1行挿入する
INSERT INTO users (username, email, age)
VALUES ('ichito', 'ichito@example.com', 22);

-- 複数行をまとめて挿入する（1回のINSERTで効率的）
INSERT INTO users (username, email, age)
VALUES
    ('alice',   'alice@example.com',   25),
    ('bob',     'bob@example.com',     30),
    ('charlie', 'charlie@example.com', 19);

-- SELECT: テーブルからデータを読み取る
-- * はすべての列を意味する
SELECT * FROM users;

-- 特定の列だけを選択する
SELECT username, email FROM users;

-- AS: 結果の列に別名（エイリアス）を付ける
SELECT
    username   AS 名前,
    age        AS 年齢,
    created_at AS 登録日
FROM users;`,

`-- ── 条件で絞り込む（WHERE）──
-- WHERE句が True の行だけを結果として返す

-- 年齢が20以上のユーザーを取得
SELECT * FROM users WHERE age >= 20;

-- AND: 2つの条件を両方満たす行を取得
SELECT * FROM users
WHERE age >= 18 AND age <= 30;

-- OR: どちらか一方の条件を満たす行を取得
SELECT * FROM users
WHERE username = 'ichito' OR username = 'alice';

-- BETWEEN: 範囲内の値（>= AND <=の省略形）
SELECT * FROM users
WHERE age BETWEEN 18 AND 25;

-- LIKE: パターンマッチング
-- %: 0文字以上の任意の文字列にマッチする
-- _: 任意の1文字にマッチする
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE username LIKE 'i%';

-- IN: 複数のOR条件の省略形
SELECT * FROM users
WHERE username IN ('ichito', 'alice', 'bob');

-- IS NULL / IS NOT NULL: 値が空（NULL）かどうかを確認する
SELECT * FROM users WHERE age IS NULL;
SELECT * FROM users WHERE age IS NOT NULL;`,

`-- ── 並び替えと件数制限（ORDER BY / LIMIT）──

-- ORDER BY: 結果を並び替える
-- ASC（昇順）: 小さい値から大きい値へ（デフォルト）
-- DESC（降順）: 大きい値から小さい値へ
SELECT * FROM users ORDER BY age ASC;
SELECT * FROM users ORDER BY age DESC;

-- 複数列で並び替え: まず年齢で並べ、同じ年齢の場合はusernameで並べる
SELECT * FROM users ORDER BY age ASC, username ASC;

-- LIMIT: 返す行数の上限を設定する
SELECT * FROM users ORDER BY age DESC LIMIT 3;

-- OFFSET: 最初のN行をスキップしてから取得する（ページネーションに使う）
-- 1ページ10行の場合、2ページ目は LIMIT 10 OFFSET 10
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10;

-- COUNT: 条件に一致する行数を数える集計関数
SELECT COUNT(*) AS 総ユーザー数 FROM users;
SELECT COUNT(*) AS 成人数 FROM users WHERE age >= 18;`,

`-- ── 集計関数（Aggregate Functions）──
-- 複数の行にまたがって計算を行う関数

-- COUNT(*): 行数を数える
-- SUM(列): 数値列の合計
-- AVG(列): 数値列の平均値
-- MIN(列): 最小値
-- MAX(列): 最大値

CREATE TABLE orders (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,  -- どのユーザーの注文かを示す外部キー
    product    TEXT    NOT NULL,
    amount     REAL    NOT NULL,  -- REAL: 小数を扱える数値型
    ordered_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO orders (user_id, product, amount) VALUES
    (1, 'キーボード', 8000),
    (1, 'マウス',    3000),
    (2, 'モニター',  45000),
    (3, 'ヘッドセット', 12000),
    (3, 'ウェブカメラ', 6500);

-- 注文全体の集計
SELECT
    COUNT(*)      AS 注文数,
    SUM(amount)   AS 売上合計,
    AVG(amount)   AS 平均注文額,
    MIN(amount)   AS 最安値,
    MAX(amount)   AS 最高値
FROM orders;`,

`-- ── グループ化（GROUP BY / HAVING）──

-- GROUP BY: 指定した列の値ごとに行をグループにまとめ、集計する
-- 各グループが結果の1行になる

-- ユーザーごとの注文数と合計金額を集計する
SELECT
    user_id,
    COUNT(*)    AS 注文数,
    SUM(amount) AS 合計金額
FROM orders
GROUP BY user_id          -- user_id が同じ行をまとめてグループ化
ORDER BY 合計金額 DESC;

-- HAVING: グループに対して条件を絞り込む
-- WHERE は個々の行に条件をかける
-- HAVING は集計後のグループに条件をかける
-- 2件以上注文したユーザーのみを表示する
SELECT
    user_id,
    COUNT(*)    AS 注文数,
    SUM(amount) AS 合計金額
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2   -- グループの注文数が2以上のグループだけ残す
ORDER BY 合計金額 DESC;`,

`-- ── テーブルの結合（JOIN）──
-- 複数のテーブルを関連するキーで結合して横につなげる

-- INNER JOIN: 両方のテーブルで一致する行だけを返す
SELECT
    u.username,   -- uはusersテーブルのエイリアス（別名）
    o.product,    -- oはordersテーブルのエイリアス
    o.amount
FROM users  AS u
INNER JOIN orders AS o
    ON u.id = o.user_id   -- user_id が一致する行同士を結合する
ORDER BY u.username;

-- LEFT JOIN: 左テーブル（users）の行はすべて返す
-- 右テーブル（orders）に一致がない場合はNULLになる
SELECT
    u.username,
    COUNT(o.id) AS 注文数   -- 注文なしのユーザーは0になる
FROM users  AS u
LEFT JOIN orders AS o
    ON u.id = o.user_id
GROUP BY u.id, u.username
ORDER BY 注文数 DESC;`,

`-- ── データの更新と削除（UPDATE / DELETE）──

-- UPDATE: 既存の行の値を変更する
-- WHERE を必ず付ける！付け忘れると全行が変更される
UPDATE users
SET age = 23
WHERE username = 'ichito';  -- usernameがichitoの行だけ更新

-- 複数の列を同時に更新する
UPDATE users
SET
    email = 'new_ichito@example.com',
    age   = 23
WHERE id = 1;

-- 計算式による更新: 現在の値をもとに変更する
UPDATE orders
SET amount = amount * 1.1   -- 全注文を10%値上げ
WHERE product = 'キーボード';

-- 更新結果を確認する
SELECT id, username, email, age FROM users WHERE id = 1;

-- DELETE: 行を完全に削除する（元に戻せない）
-- WHERE を必ず付ける！付け忘れると全行が削除される
DELETE FROM orders WHERE amount < 5000;
DELETE FROM users  WHERE username = 'charlie';`,

`-- ── サブクエリ ──
-- SELECT の中にさらに SELECT を入れ子にできる
-- 内側のクエリが先に実行され、その結果が外側のクエリで使われる

-- IN サブクエリ: 注文が1件以上あるユーザーを取得する
-- 内側: orders テーブルに存在する user_id のリストを返す
-- 外側: そのリストの中にある id を持つユーザーだけを返す
SELECT username
FROM users
WHERE id IN (
    SELECT DISTINCT user_id  -- DISTINCT: 重複する user_id を除去する
    FROM orders
);

-- スカラーサブクエリ: 1行1列の値を返す（定数のように使える）
-- 平均注文額より高い注文を取得する
SELECT product, amount
FROM orders
WHERE amount > (
    SELECT AVG(amount) FROM orders  -- 全注文の平均を1つの値として返す
)
ORDER BY amount DESC;

-- FROM 句のサブクエリ（派生テーブル）
SELECT username, 合計金額
FROM (
    SELECT user_id, SUM(amount) AS 合計金額
    FROM orders
    GROUP BY user_id
) AS spending   -- サブクエリの結果に別名を付ける（必須）
JOIN users ON users.id = spending.user_id
ORDER BY 合計金額 DESC;`,

`-- ── インデックスとビュー ──

-- CREATE INDEX: 検索を高速化するための索引を作る
-- WHERE / JOIN / ORDER BY に使う列に作ると効果的
-- トレードオフ: INSERT/UPDATE/DELETE がわずかに遅くなる
CREATE INDEX idx_users_email    ON users (email);
CREATE INDEX idx_orders_user_id ON orders (user_id);

-- CREATE VIEW: SELECT文に名前を付けて保存する（仮想テーブル）
-- データは保存されず、SELECT するたびにクエリが実行される
CREATE VIEW user_order_summary AS
    SELECT
        u.id              AS user_id,
        u.username,
        COUNT(o.id)       AS 注文数,
        COALESCE(SUM(o.amount), 0) AS 合計金額
        -- COALESCE: 第1引数がNULLなら第2引数を返す
        -- 注文なしユーザーのSUM(NULL)を0に変換する
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id, u.username;

-- ビューは通常のテーブルと同じ方法でSELECTできる
SELECT * FROM user_order_summary ORDER BY 合計金額 DESC;

-- ビューが不要になったら削除する（IF EXISTS でエラーを防ぐ）
DROP VIEW IF EXISTS user_order_summary;`

];
