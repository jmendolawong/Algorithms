class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //root node
    if (this.key === null) {
      this.key = key;
      this.value = value;
    }

    //left side
    else if (key < this.key) {
      if (this.left) {
        this.left.insert(key, value);
      }
      else {
        this.left = new BinarySearchTree(key, value, this);
      }
    }

    //right side
    else if (key > this.key) {
      if (this.right) {
        this.right.insert(key, value);
      } else {
        this.right = new BinarySearchTree(key, value, this);
      }
    }
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
}

const tree = new BinarySearchTree();
tree.insert(3);
tree.insert(1);
tree.insert(4);
tree.insert(6);
tree.insert(9);
tree.insert(2);
tree.insert(5);
tree.insert(7);

const treeStr = new BinarySearchTree();
treeStr.insert('E');
treeStr.insert('A');
treeStr.insert('S');
treeStr.insert('Y');
treeStr.insert('Q');
treeStr.insert('U');
treeStr.insert('E');
treeStr.insert('S');
treeStr.insert('T');
treeStr.insert('I');
treeStr.insert('O');
treeStr.insert('N');

const test = new BinarySearchTree();
test.insert(4);
test.insert(3);


function height(tree, i = 1, sum = 0) {
  //if tree is empty, return 0
  if (tree.key === null) {
    return 0;
  }


  if (!tree.left && !tree.right) {
    if (sum < i) {
      sum = i;
    }
  }

  while (tree.left || tree.right) {
    if (tree.left) {
      i++;
      height(tree.left, i, sum)
    }
    if (tree.right) {
      i++;
      height(tree.right, i, sum)
    }
  }

  return console.log(sum);
}

console.log(height(test));


/*
What does the program do
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}
This program recursively goes through the tree and sums the entire tree.
Best case is O(1) given an empty tree
Average and worse case are O(n) as it needs to go through the entire tree.
*/