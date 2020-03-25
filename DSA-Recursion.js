/*
For each of these exercises, without using any code, you are expected to identify the following:

What is the input to the program?
What is the output of the program?
What is the input to each recursive call?
What is the output of each recursive call?

Start each problem by understanding the problem and coming up with some sample input and output. 
In some of the drills we have provided sample inputs and outputs for your convenience.
*/

/*
1.
Input: 3
Output:
3: Another sheep jumps over the fence
2: Another sheep jumps over the fence
1: Another sheep jumps over the fence
All sheep jumped over the fence
*/
const sheep = function (numOfSheep) {
  // base case
  if (numOfSheep === 0) {
    return console.log('All sheep jumped over the fence')
  }
  // general case
  console.log(`${numOfSheep}: Another sheep jumps over the fence`)
  sheep(numOfSheep - 1)
}

/*
two parameters, an integer as a base, and another integer as an exponent. 
The function returns the value of the base raised to the power of the exponent. Use only exponents greater than or equal to 0 (positive numbers)

powerCalculator(10,2) should return 100
powerCalculator(10,-2) should return exponent should be >= 0

*/

const powerCalculator = function (base, exp) {
  // base case
  if (exp < 0)
    return 'exponent should be  >= 0'
  if (exp === 0)
    return 1
  else if (exp === 1)
    return base

  // general case
  return base * powerCalculator(base, exp - 1)
}

const reverseString = function (str) {
  // base case
  if (str.length === 1)
    return str[0]

  // general case
  return str[str.length - 1] + reverseString(str.slice(0, str.length - 1))
}

const triangleNum = function (num) {
  // base case
  if (num === 1)
    return 1

  // general case
  return num + triangleNum(num - 1)
}

/*
Input: 02/20/2020
Output: ["02", "20", "2020"]
*/

const stringSplit = function (str) {

  // base case
  if (str.length === 1)
    return str[0]

  // general case


}

const factorial = function (num) {
  // base case
  if (num === 1) {
    return num;
  }

  // general case
  return num * factorial(num - 1);
}

factorial(5)

const fibonacci = function (numSeq, prev = 0, cur = 1, str = '') {
  //base case
  if (numSeq === 1) {
    console.log(str);
    return;
  }

  //general case
  str += prev + cur + ', ';
  numSeq--;
  fibonacci(numSeq, cur, prev + cur, str);
}

let mySmallMaze = [
  [' ', ' ', ' '],
  [' ', '*', ' '],
  [' ', ' ', 'e']
];

let maze = [
  [' ', ' ', ' ', '*', ' ', ' ', ' '],
  ['*', '*', ' ', '*', ' ', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', '*', '*', '*', '*', '*', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', 'e']
];

const wayOut = function (maze, x = 0, y = 0, path = '') {

  //base case
  //if you've landed on the position that holds 'e', you're at the exit
  if (maze[y][x] === 'e') {
    console.log(`You've found the path: ${path}!`)
    return;
  }

  /* 
  general case
  maybe case/switch or else run through each scenario in clockwise fashion
  */

  /*
  RIGHT
  move right along the x axis until a wall or end of row 
  */
  if (maze[y][x + 1] && maze[y][x+1] !== "*") {
    path += 'R'
    wayOut(maze, x + 1, y, path);
  } else {
    /*
    DOWN
    if right is blocked, then move down until wall or end of column
    */
    if (maze[y + 1][x] && maze[y+1][x] !== "*") {

      path += 'D'
      wayOut(maze, x, y + 1, path)
    }

  }
}

wayOut(maze)

