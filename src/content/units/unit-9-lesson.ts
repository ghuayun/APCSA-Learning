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

export const unit9Lesson: { title: string; sections: LessonSection[] } = {
  title: "Inheritance",
  sections: [
    {
      id: "why-inheritance",
      title: "Why Inheritance? (Don't Repeat Yourself)",
      content: `Imagine you're building a game with Warriors, Mages, and Archers. Each character has a name, health points, and can attack. Would you really want to write the **same** name and health code three separate times? That sounds painful. 😩

This is where the **DRY principle** comes in — **Don't Repeat Yourself.** If multiple classes share the same fields and methods, you shouldn't copy-paste code everywhere. Instead, you put the shared stuff in one **parent class** and let the others **inherit** it.

**Inheritance** lets you create a new class based on an existing class. The new class automatically gets all the fields and methods of the existing one — and can add its own special features on top.

Think of it like phone models:
| Concept | Real-World Example |
|---|---|
| **Superclass** (parent) | Phone — has a screen, can make calls |
| **Subclass** (child) | iPhone — everything a Phone has, PLUS Face ID |
| **Another subclass** | Android — everything a Phone has, PLUS custom widgets |

The iPhone doesn't need to reinvent "making calls" — it **inherits** that from Phone. It only needs to define what makes it *different*.

In Java, we use the \`extends\` keyword to set up this relationship. The subclass **extends** the superclass, meaning it gets everything the parent has and can add more.

**Key takeaway:** Inheritance = code reuse + organized hierarchy. Write once, inherit everywhere. 🚀`,
      miniQuiz: {
        question:
          "Why is inheritance useful in Java?",
        options: [
          "It makes your code run faster",
          "It lets you reuse code from a parent class instead of copying it",
          "It prevents you from creating objects",
          "It replaces the need for methods",
        ],
        correct: 1,
        explanation:
          "Inheritance is all about code reuse! Instead of copying the same fields and methods into multiple classes, you put them in a parent class and let subclasses inherit them. It doesn't affect speed, doesn't prevent object creation, and definitely doesn't replace methods.",
      },
    },
    {
      id: "extends-keyword",
      title: "extends — Creating Subclasses",
      content: `To create a subclass in Java, you use the \`extends\` keyword. It literally means "this class is a more specific version of that class."

\`\`\`
class Dog extends Animal { ... }
\`\`\`

This single word does a LOT of heavy lifting:

✅ **What gets inherited:**
- All **public** and **protected** fields
- All **public** and **protected** methods
- The parent's **public/protected** inner classes

❌ **What does NOT get inherited:**
- **Constructors** — you must write your own (but you can call the parent's with \`super()\`)
- **Private** fields and methods — they exist in the object, but the subclass can't access them directly

Here's the key mental model: when you create a \`Dog\` object, it's like building a layered cake. 🎂 The bottom layer is \`Object\` (every class extends Object). The middle layer is \`Animal\`. The top layer is \`Dog\`. The Dog object contains ALL the layers — it has everything an Animal has, plus its own Dog-specific stuff.

**Important:** Java only supports **single inheritance** — a class can only extend ONE other class. You can't do \`class Dog extends Animal, Pet\`. (Interfaces are a different story, but that's Unit 10!)

**Vocabulary check:**
- **Superclass** = parent class = base class (the one being extended)
- **Subclass** = child class = derived class (the one doing the extending)`,
      codeExample: {
        code: `class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public String speak() {
        return "...";
    }
}

class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);       // call Animal's constructor
        this.breed = breed; // Dog-specific field
    }

    @Override
    public String speak() {
        return "Woof! I'm " + name + " the " + breed;
    }
}

// In main:
Dog d = new Dog("Buddy", "Golden Retriever");
System.out.println(d.speak());`,
        language: "java",
        output: `Woof! I'm Buddy the Golden Retriever`,
      },
    },
    {
      id: "super-keyword",
      title: "super() — Calling the Parent",
      content: `When you create a subclass, you need a way to initialize the parent's fields. That's where \`super()\` comes in — it calls the **superclass constructor**.

**Rule #1:** If you call \`super()\`, it **MUST be the first line** in your constructor. No exceptions. Java is strict about this.

\`\`\`
public Dog(String name, String breed) {
    super(name);        // ✅ FIRST line — calls Animal(String name)
    this.breed = breed;
}
\`\`\`

**Rule #2:** If you don't write \`super()\` at all, Java **automatically** inserts \`super()\` (no arguments) for you. But this only works if the parent has a no-argument constructor. If the parent requires arguments, you'll get a compilation error.

**Rule #3:** You can also use \`super\` to call parent **methods** (not just constructors):

\`\`\`
@Override
public String describe() {
    return super.describe() + " with extra info";
}
\`\`\`

This is super useful (pun intended 😄) when you want to **build on** the parent's behavior instead of completely replacing it.

Think of it like texting your parent to ask them to do their part, then you add your part on top. The parent sets up the basics, the child adds the extras.

**Constructor chaining** is what happens when constructors call up the chain: \`C() → B() → A() → Object()\`. They **execute** from the top down: Object first, then A, then B, then C.`,
      codeExample: {
        code: `class Vehicle {
    protected String make;
    protected int year;

    public Vehicle(String make, int year) {
        this.make = make;
        this.year = year;
        System.out.println("Vehicle constructor: " + make);
    }
}

class Car extends Vehicle {
    private int doors;

    public Car(String make, int year, int doors) {
        super(make, year);  // MUST be first line
        this.doors = doors;
        System.out.println("Car constructor: " + doors + " doors");
    }
}

// In main:
Car c = new Car("Toyota", 2024, 4);`,
        language: "java",
        output: `Vehicle constructor: Toyota
Car constructor: 4 doors`,
      },
      miniQuiz: {
        question:
          "What happens if a subclass constructor doesn't include a super() call?",
        options: [
          "The code won't compile no matter what",
          "Java automatically inserts super() with no arguments",
          "The superclass fields are left uninitialized",
          "The subclass becomes an independent class",
        ],
        correct: 1,
        explanation:
          "If you don't write super() yourself, Java automatically inserts super() (no-arg version) as the first line. This works fine IF the parent has a no-arg constructor. If the parent only has constructors that require arguments, then you'll get a compilation error because the auto-inserted super() won't match any constructor.",
      },
    },
    {
      id: "method-overriding",
      title: "Method Overriding",
      content: `**Method overriding** is when a subclass provides its own version of a method that already exists in the superclass. Same name, same parameters, same return type — but different behavior.

\`\`\`
class Animal {
    public String speak() { return "..."; }
}
class Dog extends Animal {
    @Override
    public String speak() { return "Woof!"; }  // overrides Animal's speak()
}
\`\`\`

**The \`@Override\` annotation** is your safety net. It tells the compiler: "Hey, I intend to override a parent method." If you accidentally misspell the method name or get the parameters wrong, the compiler will catch the mistake instead of silently creating a brand new method. Always use it!

**Overriding vs. Overloading — don't mix them up!**

| | Overriding | Overloading |
|---|---|---|
| **Where** | Subclass replaces parent method | Same class (or subclass) adds same-name method |
| **Parameters** | Must be **the same** | Must be **different** |
| **Which runs?** | Decided at **runtime** (polymorphism) | Decided at **compile time** |
| **Annotation** | \`@Override\` | None needed |

A super common method to override is \`toString()\`. Every class inherits \`toString()\` from Object, but the default version prints something ugly like \`Dog@1a2b3c\`. Override it to print something useful!

**Pro tip:** When you override a method, the subclass version must be at least as accessible as the parent's. If the parent method is \`public\`, the override must also be \`public\` — you can't make it \`private\`.`,
      codeExample: {
        code: `class Student {
    private String name;
    private double gpa;

    public Student(String name, double gpa) {
        this.name = name;
        this.gpa = gpa;
    }

    @Override
    public String toString() {
        return name + " (GPA: " + gpa + ")";
    }
}

// In main:
Student s = new Student("Alex", 3.8);
System.out.println(s);  // automatically calls toString()`,
        language: "java",
        output: `Alex (GPA: 3.8)`,
      },
    },
    {
      id: "polymorphism",
      title: "Polymorphism — The Magic of Java",
      content: `**Polymorphism** is a fancy word that means "many forms." In Java, it means a single variable can behave differently depending on what type of object it actually holds.

Here's the magic line:

\`\`\`
Animal a = new Dog("Buddy");
\`\`\`

The variable \`a\` is declared as type \`Animal\` (that's the **compile-time type**), but the actual object is a \`Dog\` (that's the **runtime type**). When you call \`a.speak()\`, Java doesn't look at the variable type — it looks at the **actual object** and calls Dog's version of \`speak()\`.

**Why is this powerful?** Because you can write code that works with the general type and it automatically does the right thing for each specific type:

\`\`\`
Animal[] pets = { new Dog("Buddy"), new Cat("Whiskers") };
for (Animal a : pets) {
    System.out.println(a.speak());  // calls the RIGHT speak() for each!
}
\`\`\`

This is like a universal remote that works with any TV brand. You press "power" and it figures out the right signal for YOUR specific TV. Same button, different behavior depending on the actual device. 📺

**Compile-time type vs. runtime type:**

| | Compile-time type | Runtime type |
|---|---|---|
| **What is it?** | The declared variable type (left side) | The actual object type (after \`new\`) |
| **Who uses it?** | The **compiler** — checks what methods you can call | The **JVM** — decides which version of the method runs |
| **Example** | \`Animal\` in \`Animal a = new Dog()\` | \`Dog\` in \`Animal a = new Dog()\` |

**Important restriction:** You can only call methods that exist in the **compile-time type**. If Dog has a \`fetch()\` method but Animal doesn't, you can't call \`a.fetch()\` even though the object is actually a Dog. The compiler only sees \`Animal\`.`,
      codeExample: {
        code: `class Shape {
    public double area() { return 0; }
}

class Circle extends Shape {
    private double radius;
    public Circle(double r) { this.radius = r; }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

class Square extends Shape {
    private double side;
    public Square(double s) { this.side = s; }

    @Override
    public double area() {
        return side * side;
    }
}

// In main:
Shape[] shapes = { new Circle(5), new Square(4) };
for (Shape s : shapes) {
    System.out.println("Area: " + s.area());
}`,
        language: "java",
        output: `Area: 78.53981633974483
Area: 16.0`,
      },
      miniQuiz: {
        question:
          "Given: `Animal a = new Cat();` — which version of speak() runs when you call `a.speak()`?",
        options: [
          "Animal's speak(), because the variable is type Animal",
          "Cat's speak(), because the actual object is a Cat",
          "Both versions run in order",
          "It depends on which class was written first",
        ],
        correct: 1,
        explanation:
          "Polymorphism! Java uses the RUNTIME type (Cat) to decide which method to call, not the compile-time type (Animal). So Cat's speak() runs. This is called dynamic method dispatch — the JVM figures out the right method at runtime based on the actual object.",
      },
    },
    {
      id: "object-class",
      title: "The Object Class",
      content: `Every single class in Java — whether you wrote it or someone else did — extends the \`Object\` class. Even if you don't write \`extends Object\`, Java adds it automatically. It's the ultimate ancestor, the great-great-great-grandparent of every class. 👴

\`\`\`
class Dog { }                  // secretly: class Dog extends Object { }
class Labrador extends Dog { } // chain: Object → Dog → Labrador
\`\`\`

**Object gives you these methods for free:**

| Method | What it does | Should you override it? |
|---|---|---|
| \`toString()\` | Returns a String representation of the object | **YES!** Default prints ugly stuff like \`Dog@3f91beef\` |
| \`equals(Object obj)\` | Checks if two objects are "equal" | Often yes — default only checks if they're the same reference |
| \`hashCode()\` | Returns a number for hash-based collections | Yes, if you override equals |

The most important one for AP CSA is **\`toString()\`**. When you pass an object to \`System.out.println()\`, Java automatically calls its \`toString()\` method. If you don't override it, you get that ugly class name + memory address.

**Before overriding toString():**
\`\`\`
System.out.println(new Dog("Buddy"));  // Dog@1a2b3c 😬
\`\`\`

**After overriding toString():**
\`\`\`
System.out.println(new Dog("Buddy"));  // Buddy the Dog 😍
\`\`\`

Always override \`toString()\` in your classes — your future self (and your teacher) will thank you.`,
      codeExample: {
        code: `class Player {
    private String username;
    private int level;

    public Player(String username, int level) {
        this.username = username;
        this.level = level;
    }

    @Override
    public String toString() {
        return username + " (Level " + level + ")";
    }

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof Player) {
            Player other = (Player) obj;
            return this.username.equals(other.username);
        }
        return false;
    }
}

// In main:
Player p1 = new Player("xXSlayerXx", 42);
Player p2 = new Player("xXSlayerXx", 50);
System.out.println(p1);
System.out.println(p1.equals(p2));`,
        language: "java",
        output: `xXSlayerXx (Level 42)
true`,
      },
    },
    {
      id: "abstract-classes",
      title: "Abstract Classes",
      content: `Sometimes you want a superclass that defines *what* subclasses should do, but it doesn't make sense for the superclass itself to do it. That's an **abstract class**.

Think about it: what does a generic "Shape" look like? What's the area of a "Shape"? Those questions don't have answers — only *specific* shapes like circles and rectangles have areas. So Shape should be **abstract** — it defines the blueprint but leaves the details to its subclasses.

\`\`\`
abstract class Shape {
    abstract double area();    // no body! subclasses MUST implement this
    
    public void printArea() {  // concrete method — totally fine in abstract classes
        System.out.println("Area: " + area());
    }
}
\`\`\`

**Key rules for abstract classes:**

1. **Can't instantiate them.** \`new Shape()\` → ❌ Compilation error. You can't create an object of an abstract class.
2. **Can have abstract methods** — methods with no body, just a signature. Subclasses MUST override these.
3. **Can ALSO have regular methods** — abstract classes aren't forced to be 100% abstract. They can have constructors, fields, and concrete methods too.
4. **A non-abstract subclass must implement ALL abstract methods.** If it doesn't, it must also be declared abstract.

\`\`\`
class Circle extends Shape {
    private double radius;
    public Circle(double r) { this.radius = r; }

    @Override
    double area() { return Math.PI * radius * radius; }  // ✅ implemented!
}
\`\`\`

**When to use abstract classes:** When you have a "concept" that shouldn't exist on its own (Shape, Animal, Vehicle) but you want to guarantee all subclasses have certain methods.`,
      miniQuiz: {
        question: "Which of the following is TRUE about abstract classes?",
        options: [
          "Abstract classes can only contain abstract methods",
          "You can create objects of an abstract class using new",
          "A non-abstract subclass must implement all inherited abstract methods",
          "Abstract classes cannot have constructors",
        ],
        correct: 2,
        explanation:
          "A non-abstract subclass MUST implement every abstract method it inherits — otherwise, the compiler will throw an error. Abstract classes CAN have concrete methods, constructors, and fields. You just can't create an instance of the abstract class itself.",
      },
    },
    {
      id: "is-a-vs-has-a",
      title: "Is-A vs Has-A Relationships",
      content: `One of the most important design decisions in OOP is knowing **when to use inheritance** and **when NOT to**. The test is simple:

**Is-A relationship → use inheritance (\`extends\`)**
- A Dog **is-a** Animal ✅ → \`class Dog extends Animal\`
- A Car **is-a** Vehicle ✅ → \`class Car extends Vehicle\`
- A Manager **is-a** Employee ✅ → \`class Manager extends Employee\`

**Has-A relationship → use composition (fields)**
- A Car **has-a** Engine ✅ → \`private Engine engine;\`
- A Student **has-a** Backpack ✅ → \`private Backpack bag;\`
- A House **has-a** Door ✅ → \`private Door frontDoor;\`

**The classic mistake:** "A Car has wheels, and a Bicycle has wheels... let me make them both extend a Wheel class!" ❌ A Car is NOT a Wheel. A Car **has** Wheels. Use a field instead.

\`\`\`
// ❌ WRONG — a Car is NOT a Wheel
class Car extends Wheel { }

// ✅ RIGHT — a Car HAS Wheels
class Car {
    private Wheel[] wheels = new Wheel[4];
}
\`\`\`

**Quick decision guide:**

| Ask yourself... | If yes → | Example |
|---|---|---|
| "Is X a type of Y?" | Use \`extends\` | Dog is a type of Animal |
| "Does X contain/use Y?" | Use a field | Car contains an Engine |
| "Could X be swapped for Y?" | Probably \`extends\` | Circle can be used where Shape is expected |

**Pro tip for the AP exam:** When you see "is-a" in a question, think **inheritance**. When you see "has-a," think **instance variable / composition**. The College Board loves testing whether you know the difference!

Remember: inheritance is powerful, but don't overuse it. If the relationship doesn't pass the "is-a" test, use composition instead. Your code will be easier to understand and maintain. 💪`,
      miniQuiz: {
        question:
          "A School has many Students. Which relationship is this?",
        options: [
          "Is-A — School should extend Student",
          "Is-A — Student should extend School",
          "Has-A — School should have a Student[] field",
          "Has-A — Student should have a School[] field",
        ],
        correct: 2,
        explanation:
          "A School is NOT a Student, and a Student is NOT a School — so inheritance is wrong here. A School HAS Students (contains them), so it's a has-a relationship. The School class should have a Student[] field (or an ArrayList<Student>). This is composition, not inheritance.",
      },
    },
  ],
};
