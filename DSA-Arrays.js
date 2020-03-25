const memory = require('./memory');

/* 
size = the size of the memory block
length = the size of the data allocation
i.e. my memory block size is 128mb
but my data only takes up 32mb.
size = 128, length = 32
*/

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    // if data is greater than capacity, resize (length + 1) * multiplier/ratio
    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    // set the value at ptr (start of memory block) + length = end of array
    this.set(this.ptr + this.length, value);
    // Add +1 to length to account for new data
    this.length++;
  }

  _resize(size) {
    // assign current ptr to oldPtr
    const oldPtr = this.ptr;
    // allocate memory according to size parameter
    this.ptr = memory.allocate(size);
    // if this.ptr is null, meaning size goes beyond the amount of memory, error
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }

    // copy to the new memory block allocation (this.ptr) from the old memory block (oldPtr)
    // size of length which is the entirety of the data
    memory.copy(this.ptr, oldPtr, this.length);
    // free up oldPtr
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    // if index is negative or goes beyond the length of the data, throw error
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    // get the value from (memory start [this.ptr] + index)
    return memory.get(this.ptr + index);
  }

  pop() {
    // if the memory block is 0, throw error
    if (this.length === 0) {
      throw new Error('Index error')
    }

    // otherwise, get the value at the end of the array
    // reduce the length of the array
    // return value
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    // if index is negative or goes beyond the length of the data, throw error
    if (index < 0 || index >= this.length) {
      throw new Error('Index error')
    }

    // if data is greater than capacity, resize (length + 1) * multiplier/ratio
    if (this.length >= this.capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    // otherwise, copy all data one position over then insert data at index
    // lastly, increment length to account for added data
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    // check if index is negative or goes beyond length of data
    // don't need to check if data is greater than capacity because of removal
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    // copy backwards to fill in removed data, then decrement length
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;

  }
}

function main() {
  Array.SIZE_RATIO = 3;

  // Create an instance of the Array class
  let arr = new Array();

  // Add an item to the array
  arr.push(3);

  console.log(arr);
}

main();
