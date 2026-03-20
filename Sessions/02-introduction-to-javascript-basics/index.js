//#Task 1
var a = "global var";
let b = "global let";
const c = "global const";

function testScope() {
  var a = "function var";
  let b = "function let";
  const c = "function const";

  console.log("Inside function:", a, b, c);

  if (true) {
    var a = "block var"; // same function scope 
    let b = "block let"; // block scoped
    const c = "block const"; // block scoped

    console.log("Inside block:", a, b, c);
  }

  console.log("After block:", a, b, c);
}

testScope();

console.log("Global:", a, b, c);

//#Task 2
// VAR
var x = 10;
var x = 20; 
x = 30;   

// LET
let y = 10;
// let y = 20;  redeclare not allowed
y = 30;   // reassign allowed

// CONST
const z = 10;
// const z = 20;  redeclare not allowed
// z = 30;  reassign not allowed

console.log(x, y, z);

//#Task 3
function extractHashtags(str) {
  return str.match(/#\w+/g) || [];
}

console.log(extractHashtags("This are hashtags :  #javascript and #coding"));
// ["#javascript", "#coding"]


//#Task 4 
function shortenText(text, maxLength) {
  return text.length <= maxLength
    ? text
    : text.slice(0, maxLength);
}

console.log(shortenText("Hello world", 5)); 
// Hello...

//#Task 5
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

console.log(doubled); // [2,4,6,8,10]
console.log(evens);   // [2,4]

//#Task 6
function findLongestWord(words) {
  return words.reduce((longest, current) =>
    current.length > longest.length ? current : longest
  , "");
}

console.log(findLongestWord(["hi", "hello", "javascript"]));
// javascript

//#Task 7
function canVote(age) {
  if (age >= 18) {
    return "Yes";
  } else {
    return "No";
  }
}

//#Task 8 
function canVoteTernary(age) {
  return age >= 18 ? "Yes" : "No";
}

console.log(canVote(20), canVoteTernary(20));

//#Task 9-10 
// Are inside index.html