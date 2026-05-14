var PYTHON = [

`# -- 変数とデータ型 --

name    = "Ichito"
age     = 22
height  = 1.75
hobbies = ["coding", "reading", "music"]

profile = {
    "name":   name,
    "age":    age,
    "height": height,
}

for key, value in profile.items():
    print(f"  {key}: {value}")`,

`# -- 関数 --

def greet(name: str, age: int) -> str:
    return f"こんにちは、{name}さん。{age}歳ですね。"

def greet_with_default(name: str, greeting: str = "こんにちは") -> str:
    return f"{greeting}、{name}さん！"

print(greet("Ichito", 22))
print(greet_with_default("Ichito"))
print(greet_with_default("Ichito", "やあ"))`,

`# -- 条件分岐 --

score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"スコア: {score} -> 評価: {grade}")

status = "合格" if score >= 60 else "不合格"
print(f"判定: {status}")`,

`# -- for ループ --

fruits = ["りんご", "バナナ", "さくらんぼ"]

for fruit in fruits:
    print(fruit)

for i in range(5):
    print(i)

for index, fruit in enumerate(fruits):
    print(f"[{index}] {fruit}")

squares = [n ** 2 for n in range(1, 6)]
print(squares)`,

`# -- while / break / continue --

counter = 0
while counter < 5:
    if counter == 2:
        counter += 1
        continue
    print(f"counter = {counter}")
    counter += 1

numbers = [4, 7, 1, 9, 3]
target  = 9

for num in numbers:
    if num == target:
        print(f"{target}を発見！")
        break`,

`# -- リスト操作 --

items = ["a", "b", "c"]
items.append("d")
items.insert(1, "z")
items.remove("z")
last = items.pop()

print(f"件数: {len(items)}")

numbers = [1, 2, 3, 4, 5, 6]
evens   = [n for n in numbers if n % 2 == 0]
squares = {n: n ** 2 for n in range(1, 6)}

print(evens)
print(squares)`,

`# -- 辞書（dict）--

user = {
    "name": "Ichito",
    "age":  22,
    "city": "東京",
}

print(user["name"])
print(user.get("email", "未登録"))

user["email"] = "ichito@example.com"
del user["city"]

for key, value in user.items():
    print(f"  {key}: {value}")`,

`# -- 例外処理 --

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("0で割ることはできません")
    return a / b

try:
    print(divide(10, 2))
    print(divide(10, 0))
except ValueError as e:
    print(f"エラー: {e}")
finally:
    print("処理完了")`,

`# -- クラス --

class Dog:
    def __init__(self, name: str, breed: str) -> None:
        self.name  = name
        self.breed = breed

    def bark(self) -> str:
        return f"{self.name}: ワン！"

    def __str__(self) -> str:
        return f"Dog({self.name}, {self.breed})"


dog1 = Dog("ハチ", "柴犬")
dog2 = Dog("クロ", "ラブラドール")

print(dog1)
print(dog1.bark())
print(dog2.bark())`,

`# -- ファイルの読み書き --

file_path = "sample.txt"

with open(file_path, "w", encoding="utf-8") as f:
    f.write("1行目: こんにちは\\n")
    f.write("2行目: 世界\\n")
    f.write("3行目: 完了\\n")

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()
    print(content)

with open(file_path, "r", encoding="utf-8") as f:
    for i, line in enumerate(f, start=1):
        print(f"{i}: {line.strip()}")`,

`# -- lambda / map / filter --

double  = lambda x: x * 2
is_even = lambda x: x % 2 == 0
add     = lambda x, y: x + y

numbers = [1, 2, 3, 4, 5, 6]
doubled = list(map(double, numbers))
evens   = list(filter(is_even, numbers))

print(doubled)
print(evens)
print(add(3, 4))

from functools import reduce
total = reduce(lambda acc, n: acc + n, numbers)
print(total)`,

`# -- 文字列操作 --

s = "  Hello, Python World!  "

print(s.strip())
print(s.lower())
print(s.upper())
print(s.replace("Python", "Beautiful"))

words = s.split()
print(words)
print(", ".join(words))

print(s.startswith("  Hello"))
print("Python" in s)

name = "Ichito"
print(f"{'右寄せ':>10}")
print(f"{'左寄せ':<10}")
print(f"{3.14159:.2f}")`,

`# -- タプルとセット --

point = (3, 4)
x, y  = point
print(f"x={x}, y={y}")

rgb     = (255, 128, 0)
r, g, b = rgb
print(f"R:{r} G:{g} B:{b}")

tags  = {"python", "coding", "music"}
langs = {"python", "javascript", "typescript"}

both   = tags & langs
either = tags | langs
only   = tags - langs

print(both)
print(either)
print(only)

tags.add("reading")
tags.discard("music")
print(tags)`,

`# -- デコレーター --

import time
import functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start  = time.perf_counter()
        result = func(*args, **kwargs)
        end    = time.perf_counter()
        print(f"{func.__name__}: {end - start:.4f}秒")
        return result
    return wrapper

def repeat(n):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@timer
@repeat(3)
def greet(name: str) -> str:
    return f"こんにちは、{name}！"

print(greet("Ichito"))`,

`# -- ジェネレーター --

def count_up(start: int, step: int = 1):
    n = start
    while True:
        yield n
        n += step

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

counter = count_up(10, 2)
print(next(counter))
print(next(counter))
print(next(counter))

fib = fibonacci()
first_ten = [next(fib) for _ in range(10)]
print(first_ten)

squares_gen = (n ** 2 for n in range(10))
print(list(squares_gen))`,

`# -- dataclass --

from dataclasses import dataclass, field

@dataclass
class Point:
    x: float
    y: float

    def distance(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5

@dataclass
class User:
    name:    str
    age:     int
    hobbies: list = field(default_factory=list)

    def add_hobby(self, hobby: str) -> None:
        self.hobbies.append(hobby)

p = Point(3.0, 4.0)
print(p)
print(p.distance())

u = User("Ichito", 22)
u.add_hobby("coding")
u.add_hobby("music")
print(u)`,

`# -- 型ヒント（typing）--

from typing import Optional, Union, Callable, TypeVar

def find_user(user_id: int) -> Optional[str]:
    users = {1: "Ichito", 2: "Alice"}
    return users.get(user_id)

def format_id(value: Union[int, str]) -> str:
    return f"ID-{value:04}" if isinstance(value, int) else f"ID-{value}"

T = TypeVar("T")

def first(items: list[T]) -> Optional[T]:
    return items[0] if items else None

def apply(func: Callable[[int], int], value: int) -> int:
    return func(value)

print(find_user(1))
print(find_user(99))
print(format_id(42))
print(first([10, 20, 30]))
print(apply(lambda x: x ** 2, 5))`,

`# -- 正規表現 --

import re

text = "連絡先: ichito@example.com または sub@test.io"

emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.\\w+", text)
print(emails)

match = re.search(r"(\\d{4})-(\\d{2})-(\\d{2})", "2026-05-14")
if match:
    print(match.group(0))
    print(match.groups())

result = re.sub(r"\\s+", "_", "hello world python")
print(result)

words = re.split(r"[,\\s]+", "apple, banana,cherry  date")
print(words)`,

`# -- datetime --

from datetime import datetime, date, timedelta

now   = datetime.now()
today = date.today()

print(now.strftime("%Y-%m-%d %H:%M:%S"))
print(today.isoformat())

deadline  = today + timedelta(days=30)
yesterday = today - timedelta(days=1)
print(f"締切: {deadline}")
print(f"昨日: {yesterday}")

birth = date(2004, 5, 14)
age   = (today - birth).days // 365
print(f"年齢: {age}歳")

parsed = datetime.strptime("2026-01-01", "%Y-%m-%d")
print(parsed)`,

`# -- collections --

from collections import Counter, defaultdict, deque

words  = ["apple", "banana", "apple", "cherry", "banana", "apple"]
counts = Counter(words)
print(counts.most_common(2))
print(counts["apple"])

graph = defaultdict(list)
graph["A"].append("B")
graph["A"].append("C")
graph["B"].append("D")
print(dict(graph))

queue = deque(["first", "second", "third"])
queue.appendleft("zero")
queue.append("fourth")
print(queue.popleft())
print(queue.pop())
print(queue)`,

`# -- pathlib --

from pathlib import Path

base = Path(".")
log  = base / "logs" / "app.log"

print(log.parent)
print(log.name)
print(log.stem)
print(log.suffix)

config = Path("config.json")
if config.exists():
    text = config.read_text(encoding="utf-8")
    print(text[:100])

py_files = list(base.glob("**/*.py"))
for f in py_files[:3]:
    print(f)`,

`# -- json --

import json

data = {
    "name":    "Ichito",
    "age":     22,
    "hobbies": ["coding", "reading"],
    "active":  True,
}

json_str = json.dumps(data, ensure_ascii=False, indent=2)
print(json_str)

loaded = json.loads(json_str)
print(loaded["name"])
print(type(loaded["age"]))`,

`# -- 継承 --

class Shape:
    def area(self) -> float:
        raise NotImplementedError

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}(area={self.area():.2f})"

class Circle(Shape):
    def __init__(self, radius: float) -> None:
        self.radius = radius

    def area(self) -> float:
        return 3.14159 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width: float, height: float) -> None:
        self.width  = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

shapes = [Circle(5), Rectangle(4, 6), Circle(3)]
for s in shapes:
    print(s)

largest = max(shapes, key=lambda s: s.area())
print(f"最大: {largest}")`,

`# -- 内包表記（応用）--

matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

flat    = [n for row in matrix for n in row]
doubled = [[n * 2 for n in row] for row in matrix]

print(flat)
print(doubled)

words    = ["hello", "world", "python", "code"]
filtered = {w: len(w) for w in words if len(w) > 4}
print(filtered)

pairs = [(x, y) for x in range(3) for y in range(3) if x != y]
print(pairs)`,

`# -- コンテキストマネージャー --

from contextlib import contextmanager
import time

@contextmanager
def timer(label: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        print(f"{label}: {elapsed:.4f}秒")

@contextmanager
def temp_list():
    lst = []
    try:
        yield lst
    finally:
        lst.clear()
        print("リストをクリアしました")

with timer("処理"):
    total = sum(range(1_000_000))
    print(f"合計: {total}")

with temp_list() as items:
    items.extend([1, 2, 3])
    print(f"items: {items}")`,

`# -- 非同期処理（asyncio）--

import asyncio

async def fetch(url: str) -> str:
    await asyncio.sleep(0.1)
    return f"response from {url}"

async def process(name: str, delay: float) -> str:
    await asyncio.sleep(delay)
    return f"{name} 完了"

async def main() -> None:
    result = await fetch("https://example.com")
    print(result)

    tasks = [
        process("task-A", 0.3),
        process("task-B", 0.1),
        process("task-C", 0.2),
    ]
    results = await asyncio.gather(*tasks)
    for r in results:
        print(r)

asyncio.run(main())`

];
