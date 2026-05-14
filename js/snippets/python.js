const PYTHON = [

`# -- Variables & Types --
# str: text data enclosed in quotes
user_name = "Ichito"

# int: whole number, no decimal point
age = 22

# float: number with a decimal point
height = 1.75

# bool: True or False only
is_student = True

# list: ordered collection, items can be changed
hobbies = ["coding", "reading", "music"]

# dict: key-value pairs, like a lookup table
profile = {
    "name": user_name,
    "age": age,
    "height": height,
}

# Print all values using an f-string
# f"..." lets you embed variables with {}
print(f"Name   : {profile['name']}")
print(f"Age    : {profile['age']}")
print(f"Height : {profile['height']} m")
print(f"Student: {is_student}")`,

`# -- Function basics --
# def: keyword to define a function
# name: str  <- type hint, not enforced but helps readability
# age:  int
# Returns: str <- what the function sends back
def greet(name: str, age: int) -> str:
    # f-string builds a single string from multiple values
    return f"Hello, {name}. You are {age} years old."

# -- Calling the function --
# Pass the arguments in the same order as the parameters
message = greet("Ichito", 22)
print(message)  # Hello, Ichito. You are 22 years old.

# -- Default parameter --
# If caller does not pass greeting, "Hi" is used automatically
def greet_with_default(name: str, greeting: str = "Hi") -> str:
    return f"{greeting}, {name}!"

print(greet_with_default("Ichito"))          # Hi, Ichito!
print(greet_with_default("Ichito", "Hello")) # Hello, Ichito!`,

`# -- if / elif / else --
# if checks a condition; the block runs only when True
score = 85

if score >= 90:
    # This block runs when score is 90 or above
    grade = "A"
elif score >= 80:
    # elif is checked only when the above condition was False
    # score is between 80 and 89 here
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    # else catches everything that did not match above
    grade = "F"

print(f"Score: {score} -> Grade: {grade}")  # Score: 85 -> Grade: B

# -- Ternary (one-line if) --
# value_if_true if condition else value_if_false
status = "pass" if score >= 60 else "fail"
print(f"Status: {status}")  # Status: pass`,

`# -- for loop --
# for iterates over every item in a sequence
fruits = ["apple", "banana", "cherry"]

# fruit holds the current item each iteration
for fruit in fruits:
    print(f"Fruit: {fruit}")

# range(n) generates integers 0, 1, ..., n-1
print("--- counting ---")
for i in range(5):
    print(f"  i = {i}")

# range(start, stop, step)
# start=1, stop=10, step=2 -> 1, 3, 5, 7, 9
print("--- odd numbers ---")
for n in range(1, 10, 2):
    print(f"  {n}")

# enumerate gives both index and value
print("--- indexed ---")
for index, fruit in enumerate(fruits):
    print(f"  [{index}] {fruit}")`,

`# -- while loop & break / continue --
# while runs as long as its condition is True
counter = 0

while counter < 5:
    # continue skips the rest of the loop body and retries
    if counter == 2:
        counter += 1
        continue  # jumps back to the while condition check

    print(f"counter = {counter}")
    counter += 1  # += 1 adds 1 to counter (same as counter = counter + 1)

# break exits the loop immediately
print("--- searching ---")
numbers = [4, 7, 1, 9, 3]
target = 9

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break  # stop searching once found
    print(f"  {num} is not the target")`,

`# -- list operations --
# list: mutable ordered sequence
items = ["a", "b", "c"]

# append: add one element to the end
items.append("d")          # ["a", "b", "c", "d"]

# insert(index, value): add at a specific position
items.insert(1, "z")       # ["a", "z", "b", "c", "d"]

# remove: delete the first matching value
items.remove("z")          # ["a", "b", "c", "d"]

# pop(index): remove and return the element at index
last = items.pop()         # last = "d", items = ["a", "b", "c"]

# len: returns the number of items
print(f"Length: {len(items)}")  # Length: 3

# List comprehension: build a new list with a one-liner
# [expression for item in iterable if condition]
numbers = [1, 2, 3, 4, 5, 6]
evens = [n for n in numbers if n % 2 == 0]
print(f"Evens: {evens}")  # Evens: [2, 4, 6]`,

`# -- dict (dictionary) operations --
# dict stores key -> value pairs
# Keys must be unique; values can be anything
user = {
    "name": "Ichito",
    "age": 22,
    "city": "Tokyo",
}

# Access a value by its key
print(user["name"])  # Ichito

# .get(key, default): safe access, returns default if key missing
print(user.get("email", "no email"))  # no email

# Add or update a key
user["email"] = "ichito@example.com"

# Delete a key with del
del user["city"]

# Iterate over key-value pairs with .items()
for key, value in user.items():
    print(f"  {key}: {value}")

# Check if a key exists
if "name" in user:
    print("name key exists")`,

`# -- Exception handling --
# try: run code that might raise an error
# except: handle the error if it occurs
# finally: always runs, error or not

def divide(a: float, b: float) -> float:
    # ZeroDivisionError is raised when b is 0
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

try:
    result = divide(10, 2)
    print(f"10 / 2 = {result}")  # 10 / 2 = 5.0

    result = divide(10, 0)       # This line raises ValueError
    print(result)                # This line is never reached

except ValueError as e:
    # e holds the error message we passed to raise
    print(f"Error caught: {e}")

except ZeroDivisionError:
    print("Math error")

finally:
    # Runs regardless of whether an error occurred
    print("--- done ---")`,

`# -- class & object --
# class: a blueprint for creating objects
class Dog:
    # __init__: called automatically when an object is created
    # self: refers to the object being created
    def __init__(self, name: str, breed: str) -> None:
        self.name  = name   # store name on the object
        self.breed = breed  # store breed on the object

    # Regular method: receives self as the first argument
    def bark(self) -> str:
        return f"{self.name} says: Woof!"

    # __str__: called when you use print() on the object
    def __str__(self) -> str:
        return f"Dog(name={self.name}, breed={self.breed})"


# Create two Dog objects (instances of the class)
dog1 = Dog("Hachi", "Shiba")
dog2 = Dog("Kuro", "Labrador")

print(dog1)          # Dog(name=Hachi, breed=Shiba)
print(dog1.bark())   # Hachi says: Woof!
print(dog2.bark())   # Kuro says: Woof!`,

`# -- File I/O --
# open(path, mode): opens a file
# mode "w" = write (creates or overwrites)
# mode "r" = read
# mode "a" = append (adds to end)
# with ... as f: automatically closes the file when done

file_path = "sample.txt"

# -- Write --
with open(file_path, "w", encoding="utf-8") as f:
    f.write("Line 1: Hello\\n")  # \\n is a newline character
    f.write("Line 2: World\\n")
    f.write("Line 3: Done\\n")

# -- Read all at once --
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()          # reads the entire file as one string
    print(content)

# -- Read line by line --
with open(file_path, "r", encoding="utf-8") as f:
    for line_number, line in enumerate(f, start=1):
        # .strip() removes leading/trailing whitespace including \\n
        print(f"Line {line_number}: {line.strip()}")`

];
