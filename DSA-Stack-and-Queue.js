class _Node {
  constructor(data, next) {
    this.data = data;
    this.next = next;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  // Add
  push(data) {
    // if empty stack, push data as the first item on the stack
    if (this.top === null) {
      this.top = new _Node(data, null);
      return this.top;
    }
    /* otherwise, 
    create a new node,
    have the pointer point to the top
    */
    const node = new _Node(data, this.top);
    this.top = node;
  }


  // Remove
  pop() {
    // if empty stack, return
    if (this.top === null)
      return;

    // otherwise, this.top = this.top.next
    // might need a temp variable 
    // return popped item value
    const node = this.top;
    this.top = node.next;
    return node.data;
  }
}

// Look at the top of the stack without removing it
function peek(stack) {
  return stack.top.data;
}

//Check if the stack is empty or not
function isEmpty(stack) {
  if (!stack.top)
    return true;
  return false;
}

// what is the first item in your stack?
function display(stack) {
  if (!stack.top)
    return;

  let currNode = stack.top;
  let length = 1;
  let str = "";

  while (currNode.next !== null) {
    currNode = currNode.next;
    length++;
  }

  /*
  for(let i=0; i<length; i++){
    str += stack. 
  }
  */

  return currNode;
}

function is_palindrome(s) {
  s = s.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");

  // declare mid and define. 
  // declare 'i' in the global scope of the function
  // declare new stack

  let i;
  const mid = Math.floor(s.length / 2);
  const tempStack = new Stack();

  // 
  for (i = 0; i < mid; i++) {
    tempStack.push(s[i]);
  }

  if (s.length % 2 === 1)
    i++;

  while (i < s.length) {
    let char = tempStack.pop();
    if (char !== s[i])
      return false;
    i++;
  }

  return true;
}



/*
console.log(is_palindrome("dad"));
console.log(is_palindrome("A man, a plan, a canal: Panama"));
console.log(is_palindrome("1001"));
console.log(is_palindrome("Tauhida"));


const starTrek = new Stack();
starTrek.push('Kirk');
starTrek.push('Spock');
starTrek.push('McCoy');
starTrek.push('Scotty');
*/

function sortStack(stack) {

}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    const node = new _Node(data, null);

    // If the queue is empty (this.first === null)
    // then this.first points to the new node
    if (this.first === null) {
      this.first = node
    }

    // If the queue isn't empty,
    // then this.last.next (last item next pointer) to the new node
    if (this.last) {
      this.last.next = node;
    }
    // Either case (empty or not), this.last now points to the new node
    this.last = node;
  }

  dequeue() {
    // if list is empty, return
    if (this.first === null) {
      return;
    }

    // otherwise, dequeue it by pointing this.first to the next item
    const node = this.first;
    this.first = node.next;

    // if dequeued item is the last item in the list, set this.last to null
    if (node === this.last) {
      this.last = null;
    }

    // return value that was dequeued.
    return node.data;
  }
}

function peekQ(q) {
  console.log(q.first.data);
}

function isQEmpty(q) {
  if (q.first === null) {
    console.log('True')
  } else {
    console.log('False')
  }
}

function displayQ(q) {
  // if empty, return
  if (q.first === null) {
    return;
  }

  let node = q.first;
  let str = '';

  while (node !== q.last) {
    str += node.data + ', ';
    node = node.next;
  }
  str += node.data
  console.log(str);

}

const starTrekQ = new Queue();
const emptyQ = new Queue();
starTrekQ.enqueue('Kirk');
starTrekQ.enqueue('Spock');
starTrekQ.enqueue('Uhura');
starTrekQ.enqueue('Sula');
starTrekQ.enqueue('Checkov');

peekQ(starTrekQ);
isQEmpty(starTrekQ);
isQEmpty(emptyQ);
displayQ(starTrekQ);
starTrekQ.dequeue();
starTrekQ.dequeue();
displayQ(starTrekQ);
