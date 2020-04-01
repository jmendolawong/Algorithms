
function binarySearch(array, value, start, end) {
  var start = start === undefined ? 0 : start;
  var end = end === undefined ? array.length : end;

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const item = array[index];

  console.log(start, end);
  if (item == value) {
    return index;
  }
  else if (item < value) {
    return binarySearch(array, value, index + 1, end);
  }
  else if (item > value) {
    return binarySearch(array, value, start, index - 1);
  }
};

const array1 = [3, 5, 6, 8, 11, 12, 14, 15, 17, 18];

//console.log(binarySearch(array1, 8));
// should output: 0, 10, test 12, 0, 4, test 6, 3, 4, test 8, return index 3
//console.log(binarySearch(array1, 16));
// should output 0, 10, (12), 6, 10, (17), 6, 7 (14), 7, 7 (15), return -1


/*******************************************************/

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }


  insert(key, value) {
    // if the tree is empty, then insert at that node 
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    /*
    If key is less than the node, look at the left pointer
    If the left pointer is null, meaning no child, insert a new node at the left pointer
    'this' refers to the parent of the left pointer is aptly in the parent param
    otherwise, if there is a left child, recursively call insert on this.left to act as the root node
    */
    else if (key < this.key) {
      if (this.left === null) {
        this.left = new BinarySearchTree(key, value, this)
      }
      else {
        this.left.insert(key, value);
      }
    }
    /*
    Similarly, if the key is greater than the node, look at the right pointer
    and do the same as the left side
    */
    else if (key > this.key) {
      if (this.right === null) {
        this.right = new BinarySearchTree(key, value, this)
      }
      else {
        this.right.insert(key, value)
      }
    }
  }

  find(key) {
    // base case, if you find the key, return the value
    if (this.key === key) {
      return this.value
    }

    /* 
    Left recursive case
    If this.key < key && this.left isn't null
    Call find on this.left
    */
    else if (key < this.key && this.left) {
      this.left.find(key);
    }

    //right recursive case, same as the left
    else if (key > this.key && this.right) {
      this.right.find(key)
    }

    //else throw error
    else {
      throw new Error('Key error')
    }
  }

  remove(key) {
    if (this.key === key) {

      // With 2 children nodes
      if (this.left && this.right) {
        //find the minimum value on the right branch, assign to successor
        //replace this.key and this.value with successor
        //start at successor and then remove(successor.key)
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key)
      }

      // with 1 child node
      else if (this.left) {
        this._replaceWith(this.left)
      } else if (this.right) {
        this._replaceWith(this.right)
      } else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key)
    }
    else if (key > this.key && this.right) {
      this.right.remove(key)
    }
    else {
      throw new Error(`Key error`)
    }
  }

  _replaceWith(node) {
    //if not a root node
    if (this.parent) {

      // determine if left or right
      // and have the parent point accordingly
      if (this === this.parent.left) {
        this.parent.left = node;
      }
      else if (this === this.parent.right) {
        this.parent.right = node;
      }
      // have the node point to the parent
      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      //if the node to remove is root, then copy replacement node to current node
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      //otherwise tree is empty
      else {
        this.key = null;
        this.value = null;
        this.right = null;
        this.left = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    this.left._findMin();
  }

  dfs(values = []) {
    if (this.left) {
      values = this.left.dfs(values);
    }
    values.push(this.value);

    if (this.right) {
      values = this.right.dfs(values);
    }
    return values;
  }

  bfs(tree, values = []) {
    const queue = new Queue(); // Assuming a Queue is implemented (refer to previous lesson on Queue)
    const node = tree.root;
    queue.enqueue(node);
    while (queue.length) {
      const node = queue.dequeue(); //remove from the queue
      values.push(node.value); // add that value from the queue to an array

      if (node.left) {
        queue.enqueue(node.left); //add left child to the queue
      }

      if (node.right) {
        queue.enqueue(node.right); // add right child to the queue
      }
    }

    return values;
  }
}

function inOrder(tree, values = []) {
  if (tree.left) {
    values = inOrder(tree.left, values);
  }
  values.push(tree.key);

  if (tree.right) {
    values = inOrder(tree.right, values);
  }
  return values;
}

function preOrder(tree, values = []) {
  //node first
  values.push(tree.key);

  //then left branch if exists
  if (tree.left) {
    values = preOrder(tree.left, values);
  }

  //then right branch if exists
  if (tree.right) {
    values = preOrder(tree.right, values);
  }

  return values;
}

function postOrder(tree, values = []) {
  //first left branch if exists
  if (tree.left) {
    values = postOrder(tree.left, values);
  }

  //then right branch if exists
  if (tree.right) {
    values = postOrder(tree.right, values);
  }

  values.push(tree.key);

  //lastly node
  return values;
}

const bst = new BinarySearchTree();

bst.insert(25);
bst.insert(15);
bst.insert(50);
bst.insert(10);
bst.insert(24);
bst.insert(35);
bst.insert(70);
bst.insert(4);
bst.insert(12);
bst.insert(18);
bst.insert(31);
bst.insert(44);
bst.insert(66);
bst.insert(90);
bst.insert(22);

console.log(inOrder(bst));
console.log(preOrder(bst));
console.log(postOrder(bst));


const sharePrice = [128, 97, 121, 123, 98, 97, 105, 150, 300];

function maxProfit(price) {
  let profit = 0;

  for (i = 0; i < price.length; i++) {
    //if there's no record of the next day's share price, return current profit
    if (!price[i + 1]) {
      return profit;
    }
    if (price[i + 1] - price[i] > profit) {
      profit = price[i + 1] - price[i]
    }
  }
}

console.log(maxProfit(sharePrice));

const findBook(dewey, title){

}