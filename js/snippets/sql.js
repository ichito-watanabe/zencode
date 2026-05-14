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

DROP VIEW IF EXISTS user_order_summary;`

];
