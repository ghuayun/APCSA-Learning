export interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeExample?: {
    code: string;
    language: string;
    output?: string;
  };
  miniQuiz?: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  };
}

export const unit5Lesson: { title: string; sections: LessonSection[] } = {
  title: "Writing Classes",
  sections: [
    {
      id: "why-write-your-own-classes",
      title: "Why Write Your Own Classes?",
      content: `So far you've been using classes that other people wrote — \`String\`, \`Math\`, \`Scanner\`. But what if you want to represent something that doesn't already exist in Java? A student, a pet, a bank account, a character in a game?

That's where **writing your own classes** comes in. A class is like a blueprint — it describes what an object *has* (data) and what it can *do* (methods). Then you use that blueprint to create as many objects as you want.

Think of it this way:
- A **class** is like a cookie cutter 🍪 — it defines the shape.
- An **object** is a cookie — made from the cutter, but each one can have different frosting, sprinkles, etc.

In this unit, you'll learn to design your own blueprints from scratch. This is where Java goes from "I can write code" to "I can build things." Let's go! 🚀`,
    },
    {
      id: "anatomy-of-a-class",
      title: "Anatomy of a Class",
      content: `Every class you write has the same basic structure:

\`\`\`
public class ClassName {
    // 1. Instance variables (the DATA the object holds)
    // 2. Constructor(s) (how to BUILD the object)
    // 3. Methods (what the object can DO)
}
\`\`\`

Let's break down each part:

| Part | Purpose | Example |
|------|---------|---------|
| **Instance variables** | Store the object's data | \`private String name;\` |
| **Constructor** | Initialize the object when created with \`new\` | \`public Dog(String n) { ... }\` |
| **Methods** | Define what the object can do | \`public String getName() { ... }\` |

**The big idea:** A class bundles related data and behavior together. Instead of having a loose \`String name\` and \`int age\` floating around, you group them into a \`Student\` class. This is called **encapsulation** — one of the core principles of object-oriented programming (OOP).`,
      codeExample: {
        code: `public class Dog {
    // Instance variables — what a Dog HAS
    private String name;
    private int age;

    // Constructor — how to BUILD a Dog
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Methods — what a Dog can DO
    public String getName() {
        return name;
    }

    public String bark() {
        return name + " says: Woof!";
    }
}

// In main:
// Dog myDog = new Dog("Buddy", 3);
// System.out.println(myDog.bark());`,
        language: "java",
        output: `Buddy says: Woof!`,
      },
      miniQuiz: {
        question:
          "Which part of a class is responsible for initializing an object when it's created?",
        options: [
          "Instance variable",
          "Constructor",
          "Getter method",
          "The main method",
        ],
        correct: 1,
        explanation:
          "The constructor runs automatically when you use `new` to create an object. Its job is to set up the initial values of the instance variables.",
      },
    },
    {
      id: "constructors-building-objects",
      title: "Constructors — Building Objects",
      content: `A **constructor** is a special method that runs when you create a new object. It has some unique rules:

1. **Same name as the class** — exactly, including capitalization
2. **No return type** — not even \`void\`!
3. **Called with \`new\`** — \`new Dog("Buddy", 3)\` calls the Dog constructor

You can have multiple constructors with different parameter lists — this is called **constructor overloading**:

\`\`\`java
public class Dog {
    private String name;
    private int age;

    // Constructor 1: takes both values
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Constructor 2: name only, default age to 1
    public Dog(String name) {
        this.name = name;
        this.age = 1;
    }
}
\`\`\`

Now you can create dogs two ways:
- \`new Dog("Buddy", 3)\` — sets name AND age
- \`new Dog("Max")\` — sets name, age defaults to 1

**Pro tip:** If you don't write ANY constructor, Java gives you a free **default constructor** (no parameters, all fields get default values). But the moment you write even one constructor, Java stops giving you the freebie.`,
      codeExample: {
        code: `public class Student {
    private String name;
    private int grade;

    // Parameterized constructor
    public Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    // Default constructor — uses the other one!
    public Student() {
        this("Unknown", 9);  // calls the constructor above
    }

    public String toString() {
        return name + " (Grade " + grade + ")";
    }
}

// In main:
Student s1 = new Student("Alice", 10);
Student s2 = new Student();
System.out.println(s1);
System.out.println(s2);`,
        language: "java",
        output: `Alice (Grade 10)
Unknown (Grade 9)`,
      },
    },
    {
      id: "instance-variables",
      title: "Instance Variables (private!)",
      content: `Instance variables hold the **data** that each object carries around. Every object gets its own copy.

\`\`\`java
Dog dog1 = new Dog("Buddy", 3);
Dog dog2 = new Dog("Max", 5);
// dog1 has its own name ("Buddy") and age (3)
// dog2 has its own name ("Max") and age (5)
\`\`\`

### Why \`private\`?

You should (almost) always declare instance variables as \`private\`. This is called **encapsulation** — hiding the internal data from the outside world.

| Access Level | Who can see it? |
|-------------|-----------------|
| \`private\` | Only code inside the same class |
| \`public\` | Any code anywhere |

**Why not just make everything public?** Because then anyone can break your object! Imagine a \`BankAccount\` class where \`balance\` is public — anyone could write \`account.balance = -1000000;\` and wreck everything.

With \`private\`, you force code to go through your methods, where you can add rules:

\`\`\`java
public void setAge(int age) {
    if (age >= 0) {        // Can't set a negative age!
        this.age = age;
    }
}
\`\`\`

Think of it like a drive-through window 🍔: you can't walk into the kitchen (private), but you CAN order through the window (public methods).`,
      codeExample: {
        code: `public class Score {
    private int points;       // Private — can't be changed directly
    private int maxPoints;

    public Score(int maxPoints) {
        this.points = 0;
        this.maxPoints = maxPoints;
    }

    public void addPoints(int amount) {
        if (amount > 0) {
            points += amount;
            if (points > maxPoints) {
                points = maxPoints;  // Can't exceed max!
            }
        }
    }

    public int getPoints() {
        return points;
    }
}

// In main:
Score s = new Score(100);
s.addPoints(50);
s.addPoints(80);  // Would be 130, but capped at 100
System.out.println(s.getPoints());`,
        language: "java",
        output: `100`,
      },
      miniQuiz: {
        question:
          "Why should instance variables be declared `private` instead of `public`?",
        options: [
          "Private variables run faster",
          "Java requires all variables to be private",
          "It protects data integrity by forcing access through methods",
          "Private variables use less memory",
        ],
        correct: 2,
        explanation:
          "Making variables private means outside code must use your getter/setter methods. This lets you validate data, prevent illegal values, and change the internal implementation without breaking other code.",
      },
    },
    {
      id: "accessor-mutator-methods",
      title: "Accessor & Mutator Methods",
      content: `Since instance variables are \`private\`, we need public methods to interact with them. These come in two flavors:

### Accessors (Getters) — "Let me SEE the data"
- Return the value of an instance variable
- Named \`getVariableName()\`
- Have a return type that matches the variable
- Take no parameters

### Mutators (Setters) — "Let me CHANGE the data"
- Modify the value of an instance variable
- Named \`setVariableName()\`
- Return \`void\`
- Take a parameter of the matching type

\`\`\`java
// Accessor — just returns the value
public String getName() {
    return name;
}

// Mutator — changes the value (with validation!)
public void setName(String name) {
    if (name != null && name.length() > 0) {
        this.name = name;
    }
}
\`\`\`

**AP Exam Note:** Not every variable needs a setter! If a value should never change after construction (like a student ID), just don't write a setter for it. This makes the data **immutable** — read-only after creation.`,
      codeExample: {
        code: `public class Temperature {
    private double fahrenheit;

    public Temperature(double fahrenheit) {
        this.fahrenheit = fahrenheit;
    }

    // Accessor — gets the raw value
    public double getFahrenheit() {
        return fahrenheit;
    }

    // Accessor — computes a value without storing it!
    public double getCelsius() {
        return (fahrenheit - 32) * 5.0 / 9.0;
    }

    // Mutator — sets with a validity check
    public void setFahrenheit(double fahrenheit) {
        if (fahrenheit >= -459.67) {  // Absolute zero check
            this.fahrenheit = fahrenheit;
        }
    }
}

// In main:
Temperature t = new Temperature(98.6);
System.out.println("F: " + t.getFahrenheit());
System.out.println("C: " + t.getCelsius());
t.setFahrenheit(212.0);
System.out.println("Boiling in C: " + t.getCelsius());`,
        language: "java",
        output: `F: 98.6
C: 37.0
Boiling in C: 100.0`,
      },
    },
    {
      id: "the-this-keyword",
      title: "The `this` Keyword",
      content: `\`this\` is a special keyword that refers to **the current object** — the specific instance whose method is running right now.

You'll use \`this\` in three main situations:

### 1. Distinguishing parameters from instance variables
When a parameter has the same name as an instance variable (which is common!):
\`\`\`java
public Dog(String name) {
    this.name = name;  // this.name = instance variable, name = parameter
}
\`\`\`

Without \`this\`, Java would think you're assigning the parameter to itself! (This is a classic bug — see the quiz.)

### 2. Calling another constructor
You can use \`this()\` to call a different constructor in the same class:
\`\`\`java
public Dog() {
    this("Unknown", 0);  // calls Dog(String, int)
}
\`\`\`

This MUST be the **first line** of the constructor.

### 3. Passing the current object to a method
Sometimes you need to give another method a reference to "me":
\`\`\`java
someOtherMethod(this);  // "here, take this object"
\`\`\`

**Bottom line:** When you see \`this\`, think "me" or "the current object." If you're in \`dog1.bark()\`, then \`this\` is \`dog1\`. If you're in \`dog2.bark()\`, then \`this\` is \`dog2\`.`,
      codeExample: {
        code: `public class Circle {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;  // this.radius = field, radius = parameter
    }

    public Circle() {
        this(1.0);  // Calls the constructor above with default radius
    }

    public double getArea() {
        return Math.PI * this.radius * this.radius;
        // "this." is optional here, but makes it clear
    }

    public boolean isBiggerThan(Circle other) {
        return this.getArea() > other.getArea();
        // "this" vs "other" — comparing two circles!
    }
}

// In main:
Circle c1 = new Circle(5.0);
Circle c2 = new Circle();   // radius = 1.0
System.out.println("c1 area: " + c1.getArea());
System.out.println("c1 bigger? " + c1.isBiggerThan(c2));`,
        language: "java",
        output: `c1 area: 78.53981633974483
c1 bigger? true`,
      },
      miniQuiz: {
        question:
          "What happens if you write `name = name;` instead of `this.name = name;` in a constructor?",
        options: [
          "It works the same way",
          "It assigns the parameter to itself, and the instance variable stays at its default value",
          "It causes a compilation error",
          "It sets both to null",
        ],
        correct: 1,
        explanation:
          "Without `this`, Java uses the closest variable with that name — the parameter. So `name = name` assigns the parameter to itself (does nothing useful), and the instance variable `name` stays null (its default). Always use `this.name = name;` when the names match!",
      },
    },
    {
      id: "static-methods-and-variables",
      title: "static Methods & Variables",
      content: `Everything we've talked about so far belongs to **instances** (individual objects). But sometimes you want something to belong to the **class itself**.

### Static Variables — Shared Across All Objects
A \`static\` variable exists once for the entire class, not once per object:

\`\`\`java
public class Student {
    private String name;
    private static int totalStudents = 0;  // Shared!

    public Student(String name) {
        this.name = name;
        totalStudents++;  // Every new student increments this
    }
}
\`\`\`

Create 100 students? There's still only ONE \`totalStudents\` variable, and it equals 100.

### Static Methods — No Object Needed
A \`static\` method belongs to the class and can be called without creating an object:

\`\`\`java
Math.sqrt(25);         // Math is the class, no object needed
Math.max(3, 7);        // Same — static methods on the Math class
\`\`\`

**Key rule:** Static methods CANNOT access instance variables or call instance methods (because there's no specific object to reference). They can only use:
- Their own parameters
- Static variables
- Other static methods
- Local variables

| | Instance | Static |
|---|---------|--------|
| Belongs to | An object | The class |
| Access | Needs an object: \`obj.method()\` | Uses class name: \`Class.method()\` |
| Can use instance vars? | ✅ Yes | ❌ No |
| Can use static vars? | ✅ Yes | ✅ Yes |`,
      codeExample: {
        code: `public class MathHelper {
    // Static method — belongs to the class, not an object
    public static int square(int n) {
        return n * n;
    }

    public static boolean isEven(int n) {
        return n % 2 == 0;
    }
}

// In main — no object needed!
System.out.println(MathHelper.square(5));
System.out.println(MathHelper.isEven(7));
System.out.println(MathHelper.isEven(10));`,
        language: "java",
        output: `25
false
true`,
      },
    },
    {
      id: "tostring-and-method-overloading",
      title: "toString() and Method Overloading",
      content: `### The \`toString()\` Method
Every class should have a \`toString()\` method. It returns a String representation of the object, and Java calls it automatically in several situations:

- \`System.out.println(myObj)\` → calls \`myObj.toString()\`
- \`"Result: " + myObj\` → calls \`myObj.toString()\`

Without \`toString()\`, printing an object gives you something ugly like \`Dog@1a2b3c\` (the memory address). With it, you get something useful!

\`\`\`java
public String toString() {
    return name + " (age " + age + ")";
}
\`\`\`

### Method Overloading
**Method overloading** means having multiple methods with the **same name** but **different parameters**:

\`\`\`java
public void greet() {
    System.out.println("Hello!");
}

public void greet(String name) {
    System.out.println("Hello, " + name + "!");
}

public void greet(String name, int times) {
    for (int i = 0; i < times; i++) {
        System.out.println("Hello, " + name + "!");
    }
}
\`\`\`

Java picks the right one based on what arguments you pass. This is NOT the same as overriding (which involves inheritance). Overloading is about **convenience** — offering multiple ways to call the same basic action.

**Rules for overloading:**
- Same method name ✅
- Different parameter list (different types, count, or order) ✅
- Return type alone doesn't count — you can't overload by just changing the return type ❌`,
      codeExample: {
        code: `public class Message {
    private String sender;

    public Message(String sender) {
        this.sender = sender;
    }

    // Overloaded send methods — same name, different params
    public String send(String text) {
        return sender + ": " + text;
    }

    public String send(String text, boolean urgent) {
        if (urgent) {
            return "🚨 URGENT — " + sender + ": " + text;
        }
        return send(text);  // Calls the other version!
    }

    public String toString() {
        return "Message from " + sender;
    }
}

// In main:
Message m = new Message("Alice");
System.out.println(m.send("Hey!"));
System.out.println(m.send("Server down!", true));
System.out.println(m);  // Calls toString() automatically`,
        language: "java",
        output: `Alice: Hey!
🚨 URGENT — Alice: Server down!
Message from Alice`,
      },
      miniQuiz: {
        question:
          "Which of the following pairs of methods are a valid example of method overloading?",
        options: [
          "public int add(int a, int b) and public double add(int a, int b)",
          "public int add(int a, int b) and public int add(int a, int b, int c)",
          "public int add(int a, int b) and public int subtract(int a, int b)",
          "public int add(int a, int b) and private int add(int a, int b)",
        ],
        correct: 1,
        explanation:
          "Overloaded methods must have the same name but different parameter lists. Option B has the same name (`add`) with different parameters (2 ints vs 3 ints). Option A only changes the return type, which isn't enough. Option C has different names. Option D only changes the access modifier.",
      },
    },
  ],
};
