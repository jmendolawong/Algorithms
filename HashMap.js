class HashMap {
  constructor(initCapacity = 8) {
    this.length = 0;
    this._capacity = initCapacity;
    this._hashTable = [];
    this._deleted = 0;
  }

  get(key) {
    // find the index of the slot with the key
    const index = this._findSlot(key)

    // if the item is undefined, return error
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error')
    }

    // otherwise get the item from the index and return value
    return this._hashTable[index].value
  }

  set(key, value) {
    // first make sure adding doesn't push past the max_load_ratio
    // if it does, multiply capacity by size_ratio
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > this.MAX_LOAD_RATIO) {
      this._resize(this._capacity * this.SIZE_RATIO)
    }

    //find slot that houses either the key or an empty slot
    const index = this._findSlot(key);

    // if it's an empty slot, length++
    if (!this._hashTable[index]) {
      this.length++
    }

    // otherwise, update key/value pair
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
  }

  delete(key) {
    // find index of key, then item at that index
    const index = this._findSlot(key);
    const item = this._hashTable[index];

    // if item is undefined, throw error;
    if (item === undefined) {
      throw new Error('Key error');
    }

    // change deleted key, update delete count and length
    item.DELETED = true;
    this._deleted++;
    this._length--;
  }

  _findSlot(key) {
    // run the key through the hash function
    const hash = HashMap._hashString(key);
    // find the start index through modulating by capacity
    // meaning, item could be at index or open addressed somewhere elsed
    const start = hash % this._capacity;

    //loop through the rest of the array starting at 'start'
    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index]

      // if the slot is empty or the slot.key matches key param && slot.deleted = false, return index
      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  }

  _resize(size) {
    // store hashTable into a variable
    const oldMap = this._hashTable;

    // change capacity according to the new size param
    this.capacity = size;

    //reset the length and deleted (this gets cleaned out with the resize)
    this.length = 0;
    this._deleted = 0;
    this._hashTable = []

    // for each slot in the old map, loop through
    // if it's not empty or deleted, set it in the newly reset _hashTable
    // this creates efficiency as it removes unused/deleted spots 
    for (const slot of oldMap) {
      if(slot !== undefined && !slot.DELETED){
        this.set(slot.key, slot.value);
      }
    }

  }

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure hash is unsigned - meaning non-negtive number. 
    return hash >>> 0;
  }
}

module.exports = HashMap;