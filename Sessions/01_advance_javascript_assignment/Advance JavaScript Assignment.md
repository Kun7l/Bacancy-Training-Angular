# Advance JavaScript Assignment

---

# Hoisting

1. **List down techniques with examples where hoisting does not work as expected in JS.**
    1. Let
        
        ```jsx
        function display(){
        	a = 10;
        	console.log(a);
        	let a;
        }
        ```
        
        In this case, the hoisting will not work normally as var, and will give reference error. Because let/const are hoisted but not initialized “undefined”  like var. because they are uninitialized they move to Temporal dead zone (TDZ). In TDZ we cannot access variables until they are declared.
        
    2. Function Expressions and Arrow functions
        
        ```jsx
        greetUser(); //Error
        var greetUser = function (){
        	console.log("hello");
        }
        
        //Arrow functions
        
        greet();
        var greet = ()=>{
        	console.log("hello");
        }
        ```
        
        Function expressions are not hoisted as function declarations. so they are not callable. so if you use var and call greet it will treat as an undefined variable not a callable function. In arrow function it works same as functional expression in case of hoisting.
        
    3. Class 
        
        ```jsx
        const car = new Vehicle(); 
        class Vehicle {}
        ```
        
        Similar to let/const , classes are hoisted but are uninitialized. Accessing them before the declaration gives a reference error.
        
2. **Guess the output**
    
    ```jsx
    "hello"
    // Error : because var is a function scoped, so variable b's visibility is only in function. out side that b is not visible so it will throw an error.
    ```
    

---

# Closures

1. Guess the output
    
    ```jsx
    [Function:multiply]
    NaN
    
    18
    8
    ```
    
    console.log(mutliply3) will return the function multiply and with the parent function value 3 inside. 
    
    console.log(multiply3()) will return NaN not a number because undefined is not a number so performing any calculations on it will return NaN.
    
    console.log(multiplyby3(6)) will return 18 as multiplyby3 has a parent function value x as 3 and parameter as 6 so 6*3 18. same for multiplyby4(2) will return 8.
    
2. Guess the output
    
    ```jsx
    10 "Hi Closure" 12
    ```
    
3. Guess the output
    
    ```jsx
    0
    2
    2
    4
    4
    6
    ```
    
    spread operator, object and array destructuring, call/apply/bind , prototype → index.js