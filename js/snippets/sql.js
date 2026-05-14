var SQL = [

`-- テーブルの作成

CREATE TABLE users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    username   TEXT    NOT NULL UNIQUE,
    email      TEXT    NOT NULL UNIQUE,
    age        INTEGER,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
);`,

`-- データの挿入と取得

INSERT INTO users (username, email, age)
VALUES ('ichito', 'ichito@example.com', 22);

INSERT INTO users (username, email, age)
VALUES
    ('alice',   'alice@example.com',   25),
    ('bob',     'bob@example.com',     30),
    ('charlie', 'charlie@example.com', 19);

SELECT * FROM users;

SELECT
    username   AS 名前,
    age        AS 年齢,
    created_at AS 登録日
FROM users;`,

`-- 条件で絞り込む

SELECT * FROM users WHERE age >= 20;

SELECT * FROM users
WHERE age >= 18 AND age <= 30;

SELECT * FROM users
WHERE age BETWEEN 18 AND 25;

SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE username LIKE 'i%';

SELECT * FROM users
WHERE username IN ('ichito', 'alice', 'bob');

SELECT * FROM users WHERE age IS NULL;
SELECT * FROM users WHERE age IS NOT NULL;`,

`-- 並び替えと件数制限

SELECT * FROM users ORDER BY age ASC;
SELECT * FROM users ORDER BY age DESC;

SELECT * FROM users ORDER BY age ASC, username ASC;

SELECT * FROM users ORDER BY age DESC LIMIT 3;

SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10;

SELECT COUNT(*) AS 総ユーザー数 FROM users;
SELECT COUNT(*) AS 成人数 FROM users WHERE age >= 18;`,

`-- 集計関数

CREATE TABLE orders (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,
    product    TEXT    NOT NULL,
    amount     REAL    NOT NULL,
    ordered_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO orders (user_id, product, amount) VALUES
    (1, 'キーボード', 8000),
    (1, 'マウス',    3000),
    (2, 'モニター',  45000),
    (3, 'ヘッドセット', 12000),
    (3, 'ウェブカメラ', 6500);

SELECT
    COUNT(*)      AS 注文数,
    SUM(amount)   AS 売上合計,
    AVG(amount)   AS 平均注文額,
    MIN(amount)   AS 最安値,
    MAX(amount)   AS 最高値
FROM orders;`,

`-- グループ化

SELECT
    user_id,
    COUNT(*)    AS 注文数,
    SUM(amount) AS 合計金額
FROM orders
GROUP BY user_id
ORDER BY 合計金額 DESC;

SELECT
    user_id,
    COUNT(*)    AS 注文数,
    SUM(amount) AS 合計金額
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2
ORDER BY 合計金額 DESC;`,

`-- テーブルの結合

SELECT
    u.username,
    o.product,
    o.amount
FROM users  AS u
INNER JOIN orders AS o
    ON u.id = o.user_id
ORDER BY u.username;

SELECT
    u.username,
    COUNT(o.id) AS 注文数
FROM users  AS u
LEFT JOIN orders AS o
    ON u.id = o.user_id
GROUP BY u.id, u.username
ORDER BY 注文数 DESC;`,

`-- データの更新と削除

UPDATE users
SET age = 23
WHERE username = 'ichito';

UPDATE users
SET
    email = 'new_ichito@example.com',
    age   = 23
WHERE id = 1;

UPDATE orders
SET amount = amount * 1.1
WHERE product = 'キーボード';

SELECT id, username, email, age FROM users WHERE id = 1;

DELETE FROM orders WHERE amount < 5000;
DELETE FROM users  WHERE username = 'charlie';`,

`-- サブクエリ

SELECT username
FROM users
WHERE id IN (
    SELECT DISTINCT user_id
    FROM orders
);

SELECT product, amount
FROM orders
WHERE amount > (
    SELECT AVG(amount) FROM orders
)
ORDER BY amount DESC;

SELECT username, 合計金額
FROM (
    SELECT user_id, SUM(amount) AS 合計金額
    FROM orders
    GROUP BY user_id
) AS spending
JOIN users ON users.id = spending.user_id
ORDER BY 合計金額 DESC;`,

`-- インデックスとビュー

CREATE INDEX idx_users_email    ON users (email);
CREATE INDEX idx_orders_user_id ON orders (user_id);

CREATE VIEW user_order_summary AS
    SELECT
        u.id              AS user_id,
        u.username,
        COUNT(o.id)       AS 注文数,
        COALESCE(SUM(o.amount), 0) AS 合計金額
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id, u.username;

SELECT * FROM user_order_summary ORDER BY 合計金額 DESC;

DROP VIEW IF EXISTS user_order_summary;`,

`-- トランザクション

BEGIN TRANSACTION;

INSERT INTO users (username, email, age)
VALUES ('dave', 'dave@example.com', 28);

UPDATE orders
SET amount = amount * 0.9
WHERE user_id = 1;

COMMIT;

BEGIN TRANSACTION;

DELETE FROM users WHERE username = 'dave';

ROLLBACK;

SELECT * FROM users ORDER BY id;`,

`-- 外部キー制約

PRAGMA foreign_keys = ON;

CREATE TABLE categories (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT    NOT NULL UNIQUE
);

CREATE TABLE products (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    price       REAL    NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

INSERT INTO categories (name) VALUES ('電子機器'), ('書籍');

INSERT INTO products (name, price, category_id)
VALUES ('キーボード', 8000, 1), ('マウス', 3000, 1);

SELECT p.name, p.price, c.name AS カテゴリ
FROM products p
JOIN categories c ON p.category_id = c.id;`,

`-- CASE式

SELECT
    username,
    age,
    CASE
        WHEN age < 20 THEN '未成年'
        WHEN age < 30 THEN '20代'
        WHEN age < 40 THEN '30代'
        ELSE '40代以上'
    END AS 年代
FROM users
ORDER BY age;

SELECT
    product,
    amount,
    CASE
        WHEN amount >= 10000 THEN '高額'
        WHEN amount >= 5000  THEN '中額'
        ELSE '低額'
    END AS 価格帯
FROM orders
ORDER BY amount DESC;`,

`-- WITH句（CTE）

WITH aged_users AS (
    SELECT *
    FROM users
    WHERE age >= 20
),
high_spenders AS (
    SELECT user_id, SUM(amount) AS total
    FROM orders
    GROUP BY user_id
    HAVING SUM(amount) >= 5000
)
SELECT
    u.username,
    h.total
FROM aged_users u
JOIN high_spenders h ON u.id = h.user_id
ORDER BY h.total DESC;

WITH RECURSIVE counter(n) AS (
    SELECT 1
    UNION ALL
    SELECT n + 1 FROM counter WHERE n < 5
)
SELECT n FROM counter;`,

`-- ウィンドウ関数

SELECT
    username,
    age,
    ROW_NUMBER() OVER (ORDER BY age DESC)  AS 順位,
    RANK()       OVER (ORDER BY age DESC)  AS 同率順位,
    AVG(age)     OVER ()                   AS 平均年齢
FROM users;

SELECT
    user_id,
    product,
    amount,
    SUM(amount) OVER (PARTITION BY user_id)   AS ユーザー合計,
    ROUND(
        amount * 100.0
        / SUM(amount) OVER (PARTITION BY user_id),
        1
    )                                         AS 割合
FROM orders
ORDER BY user_id, amount DESC;`,

`-- UPSERT

CREATE TABLE settings (
    user_id INTEGER NOT NULL,
    key     TEXT    NOT NULL,
    value   TEXT    NOT NULL,
    PRIMARY KEY (user_id, key)
);

INSERT INTO settings (user_id, key, value)
VALUES (1, 'theme', 'dark')
ON CONFLICT (user_id, key)
DO UPDATE SET value = excluded.value;

INSERT OR IGNORE INTO settings (user_id, key, value)
VALUES (1, 'lang', 'python');

INSERT OR REPLACE INTO settings (user_id, key, value)
VALUES (1, 'theme', 'light');

SELECT * FROM settings;`,

`-- 日付操作

SELECT
    username,
    created_at,
    date(created_at)                         AS 日付のみ,
    strftime('%Y年%m月%d日', created_at)     AS 日本語表記,
    CAST(
        julianday('now') - julianday(created_at)
        AS INTEGER
    )                                        AS 経過日数
FROM users;

SELECT
    date('now')             AS 今日,
    date('now', '+7 days')  AS 1週間後,
    date('now', '-1 month') AS 1ヶ月前,
    strftime('%Y', 'now')   AS 今年,
    strftime('%m', 'now')   AS 今月;`,

`-- 文字列操作

SELECT
    username,
    upper(username)                          AS 大文字,
    length(username)                         AS 文字数,
    substr(email, 1, instr(email, '@') - 1) AS メールユーザー名
FROM users;

SELECT
    trim('  hello  ')       AS トリム,
    ltrim('  hello  ')      AS 左トリム,
    rtrim('  hello  ')      AS 右トリム,
    printf('%05d', 42)      AS ゼロ埋め,
    printf('%.2f', 3.14159) AS 小数点以下2桁,
    replace('hello world', 'world', 'SQL') AS 置換;`,

`-- 複数テーブル設計（多対多）

CREATE TABLE tags (
    id   INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT    NOT NULL UNIQUE
);

CREATE TABLE post_tags (
    post_id INTEGER NOT NULL,
    tag_id  INTEGER NOT NULL,
    PRIMARY KEY (post_id, tag_id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);

INSERT INTO tags (name) VALUES ('Python'), ('SQL'), ('JavaScript');

SELECT
    o.product,
    GROUP_CONCAT(t.name, ', ') AS タグ
FROM orders o
LEFT JOIN post_tags pt ON o.id = pt.post_id
LEFT JOIN tags      t  ON pt.tag_id = t.id
GROUP BY o.id;`

];
