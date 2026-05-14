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
        print(f"{i}: {line.strip()}")`

];
