var PYTHON = [

`# -- 変数とデータ型 --

# str型（文字列）: テキストデータ。ダブルまたはシングルクォートで囲む
user_name = "Ichito"

# int型（整数）: 小数点のない数値
age = 22

# float型（浮動小数点数）: 小数を含む数値
height = 1.75

# bool型（真偽値）: True か False の2値だけを持つ
is_student = True

# list型（リスト）: 順序付きで変更可能なコレクション。[]で作る
hobbies = ["coding", "reading", "music"]

# dict型（辞書）: キーと値のペアで構成されるデータ構造。{}で作る
profile = {
    "name":   user_name,  # キー"name"に変数user_nameの値を格納
    "age":    age,        # キー"age"に変数ageの値を格納
    "height": height,     # キー"height"に変数heightの値を格納
}

# f文字列: バッククォートではなくfプレフィックス + {}で変数を埋め込む
print(f"名前   : {profile['name']}")
print(f"年齢   : {profile['age']}")
print(f"身長   : {profile['height']} m")
print(f"学生   : {is_student}")`,

`# -- 関数の定義と呼び出し --

# def: 関数を定義するキーワード
# 引数に型ヒント（: str, : int）を書くと可読性が上がる（強制ではない）
# -> str: 戻り値の型ヒント（この関数はstrを返すという意味）
def greet(name: str, age: int) -> str:
    # return: 呼び出し元にこの値を返す
    return f"こんにちは、{name}さん。{age}歳ですね。"

# 関数を呼び出す: 引数を定義と同じ順番で渡す
message = greet("Ichito", 22)
print(message)  # -> こんにちは、Ichitoさん。22歳ですね。

# デフォルト引数: 呼び出し時に省略した場合に使われる値
# greeting="こんにちは" を省略すると自動的に"こんにちは"が使われる
def greet_with_default(name: str, greeting: str = "こんにちは") -> str:
    return f"{greeting}、{name}さん！"

# greetingを省略して呼び出す
print(greet_with_default("Ichito"))            # -> こんにちは、Ichitoさん！

# greetingを指定して呼び出す
print(greet_with_default("Ichito", "やあ"))   # -> やあ、Ichitoさん！`,

`# -- 条件分岐:if / elif / else --

# 比較演算子: >= は「以上」、== は「等しい」、!= は「等しくない」
score = 85

# if: 条件が True のときだけブロックを実行する
if score >= 90:
    grade = "A"

# elif: 上の条件が False だったときにさらに条件を確認する
elif score >= 80:
    # score < 90 かつ score >= 80 のときここに来る
    grade = "B"

elif score >= 70:
    grade = "C"

# else: どの条件にも当てはまらなかった場合
else:
    grade = "F"

print(f"スコア: {score} -> 評価: {grade}")  # -> スコア: 85 -> 評価: B

# 三項演算子: 1行でif/elseを書く短縮形
# 「条件が True の値」 if 条件 else 「条件が False の値」
status = "合格" if score >= 60 else "不合格"
print(f"判定: {status}")  # -> 判定: 合格`,

`# -- for ループ --

# for: シーケンス（リスト・タプル・文字列など）の各要素を順に処理する
fruits = ["りんご", "バナナ", "さくらんぼ"]

# fruit には毎回1つの要素が入る
for fruit in fruits:
    print(f"果物: {fruit}")

# range(n): 0 から n-1 までの整数を順番に生成する
print("-- カウント --")
for i in range(5):
    print(f"  i = {i}")  # 0, 1, 2, 3, 4

# range(start, stop, step): 開始・終了・ステップを指定できる
# 1から10未満を2刻みで -> 1, 3, 5, 7, 9
print("-- 奇数 --")
for n in range(1, 10, 2):
    print(f"  {n}")

# enumerate: インデックスと値を同時に取り出せる
print("-- インデックス付き --")
for index, fruit in enumerate(fruits):
    print(f"  [{index}] {fruit}")`,

`# -- while ループ / break / continue --

# while: 条件が True の間ループを繰り返す
counter = 0

while counter < 5:
    # continue: ループの残りをスキップして次の繰り返しへ戻る
    if counter == 2:
        counter += 1  # += 1 は counter = counter + 1 と同じ
        continue      # counter==2 のときはprintをスキップ

    print(f"counter = {counter}")
    counter += 1

# break: ループを即座に終了する
print("-- 検索 --")
numbers = [4, 7, 1, 9, 3]
target  = 9

for num in numbers:
    if num == target:
        print(f"{target}を発見！")
        break  # 見つかったらそれ以上ループしない
    print(f"  {num} は違います")`,

`# -- リスト操作 --

# list: 順序付きで変更可能（ミュータブル）なコレクション
items = ["a", "b", "c"]

# append(): 末尾に1つ要素を追加する
items.append("d")           # -> ["a", "b", "c", "d"]

# insert(位置, 値): 指定した位置に要素を挿入する
items.insert(1, "z")        # -> ["a", "z", "b", "c", "d"]

# remove(値): 最初に見つかった一致する要素を削除する
items.remove("z")           # -> ["a", "b", "c", "d"]

# pop(): 末尾の要素を取り出して削除する（戻り値: 取り出した値）
last = items.pop()          # last = "d", items = ["a", "b", "c"]

# len(): 要素の数を返す
print(f"件数: {len(items)}")  # -> 件数: 3

# リスト内包表記: 新しいリストを1行で生成できる
# [式 for 変数 in イテラブル if 条件]
numbers = [1, 2, 3, 4, 5, 6]
evens   = [n for n in numbers if n % 2 == 0]  # 偶数だけ抽出
print(f"偶数: {evens}")  # -> 偶数: [2, 4, 6]`,

`# -- 辞書（dict）操作 --

# dict: キーと値のペアを格納するデータ構造
# キーは一意（重複不可）、値は何でもよい
user = {
    "name": "Ichito",
    "age":  22,
    "city": "東京",
}

# キーで値にアクセスする（ブラケット記法）
print(user["name"])  # -> Ichito

# get(キー, デフォルト値): キーが存在しない場合にデフォルト値を返す
# user["email"] だとキーなしでエラーになるが get() なら安全
print(user.get("email", "未登録"))  # -> 未登録

# 新しいキーを追加または既存の値を更新する
user["email"] = "ichito@example.com"

# del: キーと値のペアを削除する
del user["city"]

# items(): キーと値を同時に取り出してループできる
for key, value in user.items():
    print(f"  {key}: {value}")

# in 演算子: キーが辞書に存在するか確認する
if "name" in user:
    print("nameキーが存在します")`,

`# -- 例外処理（エラーハンドリング） --

# raise: 意図的にエラーを発生させる
# ValueError: 値が不正なときに使う例外クラス
def divide(a: float, b: float) -> float:
    if b == 0:
        # b が 0 なら割り算できないのでエラーを送出する
        raise ValueError("0で割ることはできません")
    return a / b  # a / b の結果を返す

# try: エラーが起きるかもしれない処理を書く
try:
    result = divide(10, 2)
    print(f"10 / 2 = {result}")  # -> 10 / 2 = 5.0

    result = divide(10, 0)  # <- ここで ValueError が発生する
    print(result)           # <- この行は実行されない

# except エラークラス as 変数: 発生したエラーを受け取って処理する
except ValueError as e:
    # e には raise に渡したメッセージが入っている
    print(f"エラー: {e}")

# finally: エラーの有無にかかわらず必ず実行される
finally:
    print("-- 処理終了 --")`,

`# -- クラスとオブジェクト --

# class: オブジェクトの設計図を定義するキーワード
class Dog:
    # __init__: オブジェクト生成時に自動的に呼ばれる初期化メソッド
    # self: 生成されたオブジェクト自身を指す（必ず第1引数）
    def __init__(self, name: str, breed: str) -> None:
        self.name  = name   # selfに属性nameを追加して値を格納
        self.breed = breed  # selfに属性breedを追加して値を格納

    # メソッド: クラスに属する関数。selfを第1引数に受け取る
    def bark(self) -> str:
        # 自身のname属性を使って文字列を返す
        return f"{self.name}:ワン！"

    # __str__: print()に渡されたとき呼ばれる特殊メソッド
    def __str__(self) -> str:
        return f"Dog(name={self.name}, breed={self.breed})"


# Dog クラスからオブジェクト（インスタンス）を2つ生成する
dog1 = Dog("ハチ", "柴犬")
dog2 = Dog("クロ", "ラブラドール")

print(dog1)         # -> Dog(name=ハチ, breed=柴犬)
print(dog1.bark())  # -> ハチ:ワン！
print(dog2.bark())  # -> クロ:ワン！`,

`# -- ファイルの読み書き --

# open(パス, モード): ファイルを開く組み込み関数
# モード一覧:
#   "w" = 書き込み（ファイルがなければ作成、あれば上書き）
#   "r" = 読み込み（デフォルト）
#   "a" = 追記（末尾に追加、ファイルがなければ作成）
# with ... as f: ブロックを抜けると自動的にファイルを閉じる

file_path = "sample.txt"

# -- 書き込み --
with open(file_path, "w", encoding="utf-8") as f:
    f.write("1行目: こんにちは\\n")  # \\n は改行文字
    f.write("2行目: 世界\\n")
    f.write("3行目: 完了\\n")

# -- 全体を一括で読み込む --
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()   # ファイル全体を1つの文字列として読み込む
    print(content)

# -- 1行ずつ読み込む --
with open(file_path, "r", encoding="utf-8") as f:
    for line_number, line in enumerate(f, start=1):
        # strip(): 行末の改行や空白を取り除く
        print(f"{line_number}行目: {line.strip()}")`

];
