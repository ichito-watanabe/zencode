const SQL = [

`-- CREATE TABLE: define the structure of a new table
-- Each column has a name, a data type, and optional constraints
CREATE TABLE users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    -- PRIMARY KEY: uniquely identifies each row
    -- AUTOINCREMENT: database assigns the next integer automatically

    username   TEXT    NOT NULL UNIQUE,
    -- NOT NULL: this column cannot be left empty
    -- UNIQUE: no two rows can have the same username

    email      TEXT    NOT NULL UNIQUE,
    age        INTEGER,
    -- No constraint: age can be NULL (unknown)

    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
    -- DEFAULT: if not provided, the current timestamp is used
);`,

`-- INSERT: add one or more rows into a table
-- Column list must match the VALUES list in order

INSERT INTO users (username, email, age)
VALUES ('ichito', 'ichito@example.com', 22);

-- Insert multiple rows in one statement (more efficient)
INSERT INTO users (username, email, age)
VALUES
    ('alice',   'alice@example.com',   25),
    ('bob',     'bob@example.com',     30),
    ('charlie', 'charlie@example.com', 19);

-- SELECT to verify what was inserted
-- * means "return every column"
SELECT * FROM users;

-- SELECT specific columns only
SELECT username, email FROM users;

-- AS: give a column an alias in the result
SELECT
    username           AS name,
    age                AS user_age,
    created_at         AS joined
FROM users;`,

`-- WHERE: filter rows based on a condition
-- Only rows where the condition is TRUE are returned

SELECT * FROM users WHERE age >= 20;

-- AND / OR: combine multiple conditions
SELECT * FROM users
WHERE age >= 18 AND age <= 30;

-- OR: at least one condition must be true
SELECT * FROM users
WHERE username = 'ichito' OR username = 'alice';

-- BETWEEN: shorthand for >= AND <=
SELECT * FROM users
WHERE age BETWEEN 18 AND 25;

-- LIKE: pattern matching
-- % matches any sequence of characters
-- _ matches exactly one character
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE username LIKE 'i%';

-- IN: shorthand for multiple OR conditions
SELECT * FROM users
WHERE username IN ('ichito', 'alice', 'bob');

-- IS NULL / IS NOT NULL: check for missing values
SELECT * FROM users WHERE age IS NULL;
SELECT * FROM users WHERE age IS NOT NULL;`,

`-- ORDER BY: sort the result set
-- ASC (default): smallest/earliest first
-- DESC: largest/latest first

SELECT * FROM users ORDER BY age ASC;
SELECT * FROM users ORDER BY age DESC;

-- Sort by multiple columns: first by age, then by username alphabetically
SELECT * FROM users ORDER BY age ASC, username ASC;

-- LIMIT: return only the first N rows
SELECT * FROM users ORDER BY age DESC LIMIT 3;

-- OFFSET: skip the first N rows (used for pagination)
-- Page 2 with 10 rows per page: skip 10, return next 10
SELECT * FROM users ORDER BY id LIMIT 10 OFFSET 10;

-- COUNT: count the number of matching rows
SELECT COUNT(*) AS total_users FROM users;

-- COUNT with WHERE: count only matching rows
SELECT COUNT(*) AS adult_count FROM users WHERE age >= 18;`,

`-- Aggregate functions: compute a value across multiple rows

-- COUNT(*): total number of rows
-- SUM(col): total of a numeric column
-- AVG(col): average value
-- MIN(col): smallest value
-- MAX(col): largest value

CREATE TABLE orders (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id    INTEGER NOT NULL,  -- references the users table
    product    TEXT    NOT NULL,
    amount     REAL    NOT NULL,  -- REAL: decimal number
    ordered_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO orders (user_id, product, amount) VALUES
    (1, 'Keyboard', 8000),
    (1, 'Mouse',    3000),
    (2, 'Monitor',  45000),
    (3, 'Headset',  12000),
    (3, 'Webcam',   6500);

SELECT
    COUNT(*)      AS total_orders,
    SUM(amount)   AS total_revenue,
    AVG(amount)   AS avg_order_value,
    MIN(amount)   AS cheapest,
    MAX(amount)   AS most_expensive
FROM orders;`,

`-- GROUP BY: split rows into groups, then aggregate each group
-- Each group produces exactly one row in the result

-- How much did each user spend in total?
SELECT
    user_id,
    COUNT(*)    AS order_count,   -- orders per user
    SUM(amount) AS total_spent    -- total yen per user
FROM orders
GROUP BY user_id          -- one result row per unique user_id
ORDER BY total_spent DESC;

-- HAVING: filter GROUPS (like WHERE but for aggregated results)
-- WHERE filters individual rows; HAVING filters groups
-- Show only users who placed 2 or more orders
SELECT
    user_id,
    COUNT(*)    AS order_count,
    SUM(amount) AS total_spent
FROM orders
GROUP BY user_id
HAVING COUNT(*) >= 2   -- keep only groups with 2+ orders
ORDER BY total_spent DESC;`,

`-- JOIN: combine rows from two or more tables
-- Tables must share a related column (foreign key -> primary key)

-- INNER JOIN: return only rows that have a match in BOTH tables
SELECT
    u.username,
    o.product,
    o.amount
FROM users  AS u              -- alias u for the users table
INNER JOIN orders AS o        -- alias o for the orders table
    ON u.id = o.user_id       -- match condition: user id must be equal
ORDER BY u.username;

-- LEFT JOIN: return all rows from the LEFT table,
-- even when there is no matching row in the right table
-- Missing right-side columns will be NULL
SELECT
    u.username,
    COUNT(o.id) AS order_count  -- users with no orders will count as 0
FROM users  AS u
LEFT JOIN orders AS o
    ON u.id = o.user_id
GROUP BY u.id, u.username
ORDER BY order_count DESC;`,

`-- UPDATE: modify existing rows
-- ALWAYS use WHERE — without it, every row is updated

-- Change the age of one specific user
UPDATE users
SET age = 23
WHERE username = 'ichito';

-- Update multiple columns at once
UPDATE users
SET
    email = 'new_ichito@example.com',
    age   = 23
WHERE id = 1;

-- Update based on a computed value
UPDATE orders
SET amount = amount * 1.1   -- 10% price increase
WHERE product = 'Keyboard';

-- Verify the update
SELECT id, username, email, age FROM users WHERE id = 1;

-- DELETE: remove rows permanently
-- ALWAYS use WHERE — without it, all rows are deleted
DELETE FROM orders WHERE amount < 5000;

-- Remove a specific user
DELETE FROM users WHERE username = 'charlie';`,

`-- Subquery: a SELECT nested inside another SQL statement
-- The inner query runs first; its result is used by the outer query

-- Find users who have placed at least one order
-- The subquery returns a list of user_ids that appear in orders
SELECT username
FROM users
WHERE id IN (
    SELECT DISTINCT user_id  -- DISTINCT removes duplicate ids
    FROM orders
);

-- Scalar subquery: returns exactly one value (one row, one column)
-- Find orders where the amount is above the overall average
SELECT product, amount
FROM orders
WHERE amount > (
    SELECT AVG(amount) FROM orders  -- returns a single number
)
ORDER BY amount DESC;

-- Subquery in FROM (derived table)
SELECT username, total_spent
FROM (
    SELECT user_id, SUM(amount) AS total_spent
    FROM orders
    GROUP BY user_id
) AS spending
JOIN users ON users.id = spending.user_id
ORDER BY total_spent DESC;`,

`-- CREATE INDEX & VIEW

-- INDEX: speeds up WHERE / JOIN / ORDER BY on a column
-- The database creates an internal sorted structure for fast lookup
-- Trade-off: INSERT/UPDATE/DELETE become slightly slower
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_orders_user_id ON orders (user_id);

-- VIEW: a saved SELECT query you can reference like a table
-- The data is not stored; the query runs each time you SELECT from it
CREATE VIEW user_order_summary AS
    SELECT
        u.id              AS user_id,
        u.username,
        COUNT(o.id)       AS total_orders,
        COALESCE(SUM(o.amount), 0) AS total_spent
        -- COALESCE: returns first non-NULL value (handles users with 0 orders)
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id, u.username;

-- Query the view exactly like a table
SELECT * FROM user_order_summary ORDER BY total_spent DESC;

-- Drop (delete) the view when no longer needed
DROP VIEW IF EXISTS user_order_summary;`

];
