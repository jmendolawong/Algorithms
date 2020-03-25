class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, null)
  }

  insertLast(item) {
    // need to find the node whose .next points to null, then insert
    if (this.head === null) {
      this.insertFirst(item)
    }

    let currNode = this.head;
    while (currNode.next !== null) {
      currNode = currNode.next;
    }
    currNode.next = new _Node(item, null)
  }

  remove(item) {
    //if the list is empty, return null
    if (!this.head) {
      return null;
    }

    //if the item is first on the list, assign this.head to next Node
    if (this.head.value === item) {
      this.head = this.head.next;
      return;
    }

    //else, shuffle through the list until you find the item

    let currNode = this.head;
    let previousNode = this.head;
    //iterate through the list with while loop
    //two possible exits: end of list or item found
    while ((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode;
      currNode = currNode.next;
    }

    //if end of list, log 'item not found', return
    if (currNode === null) {
      console.log(`Item not found`)
      return;
    }

    //item found so assign node prior to item (previousNode) to point to node after (currNode.next)
    previousNode.next = currNode.next;
  }



  find(item) {
    //if list is empty, return null
    if (!this.head)
      return null;

    // iterate through the list
    // exits if end of list or found item
    let currNode = this.head;
    while (currNode !== null && currNode.value !== item) {
      currNode = currNode.next
    }

    //end of list, log and return
    if (!currNode) {
      console.log('Item not found')
      return null;
    }
    // or item is found
    return currNode;
  }

  insertAfter(item, newItem) {
    //find item
    let currNode = this.find(item)

    // point item to newItem and newItem to point to next node
    currNode.next = new _Node(newItem, currNode.next)
  }

  insertBefore(item, newItem) {
    //find item but can't use this.find as we need the position before the item
    if (!this.head)
      return null;

    //if item is first in list, insertFirst(newItem)
    if (this.head.value === item) {
      this.insertFirst(newItem)
    }

    // iterate through the list
    // exits if end of list or currNode.next.value === item
    let currNode = this.head;
    while (currNode !== null && currNode.next.value !== item) {
      currNode = currNode.next
    }

    //end of list, log and return
    if (!currNode) {
      console.log('Item not found')
      return null;
    }
    // or item is found, so insert before
    currNode.next = new _Node(newItem, currNode.next);
  }

  insertAt(newItem, index) {
    let currNode = this.head;
    let i = 1;

    //if index is first insertFirst(newItem)
    if (index === 0)
      this.insertFirst(newItem)

    // otherwise iterate through to find position
    while (i < index) {
      currNode = currNode.next;
      i++;
    }

    //default case of index = 1, else insert before index n
    currNode.next = new _Node(newItem, currNode.next)
  }
}

function main() {
  const SLL = new LinkedList();
  SLL.insertFirst('Apollo');
  SLL.insertFirst('Boomer');
  SLL.insertFirst('Helo');
  SLL.insertFirst('Husker');
  SLL.insertFirst('Starbuck');

  SLL.insertFirst('Tauhida');
  SLL.remove('Husker');
  SLL.insertBefore('Boomer', 'Athena');
  SLL.insertAfter('Helo', 'Hotdog');
  SLL.insertAt('Kat', 3);
  SLL.remove('Tauhida');
}

function display(list) {
  let currNode = list.head;
  let str = "";
  while (currNode !== null) {
    str += currNode.value + " ";
    currNode = currNode.next
  }
  console.log(str)
}

function size(list) {
  let currNode = list.head;
  let size = 0;
  while (currNode !== null) {
    size++;
    currNode = currNode.next
  }
  return size;
}

function isEmpty(list) {
  if (!list.head) {
    return true;
  } return false;
}

function findPrevious(item, list) {
  if (!list.head) {
    return;
  }

  let current = list.head;
  while (current.next.value !== item && current.next !== null) {
    current = current.next;
  }

  if (!current.next) {
    return;
  }
  return current;


}

function findLast(list) {
  let currNode = list.head;
  if (currNode === null)
    return null;

  while (currNode.next !== null) {
    currNode = currNode.next
  }
  return (currNode)
}

/*
WhatDoesThisProgramDo
It runs through each item in the list to remove any duplicates
The best case scenario is O(nlogn), where there are no duplicates 
and each subsequent run through of the list becomes smaller
Average and worst case is O(n^k) if there are any number of duplicates in the list
*/

function reverse(list) {
  if(!list.head){
    return;
  }
  let current, reverse = list.head;
  let nextNode = current.next;
  if(current === list.head){
    current.next = null;
    reverse = null;
  }
  while(!current){
    current.next = reverse;
    reverse = current;
    current = nextNode;
    nextNode = nextNode.next;
  }
}

function third(list) {
  if(!list.head || !list.head.next || !list.head.next.next){
    return;
  }
  let current = list.head;
  while(current.next.next.next !== null){
    current = current.next;
  }
  return current.value;
}

function middleList(list) {
  if(list.head === null){
    return;
  }

  let fast = list.head;
  let slow = fast;
  while(slow.next !== null && fast.next !== null){
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow.value;
}