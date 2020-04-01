function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
};

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
};

const mergeArr = [21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40]

mergeSort(mergeArr);

/*
1. Understanding merge sort
Given the following list of numbers 21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

What is the resulting list that will be sorted after 3 recursive calls to mergesort?
  [21, 1]
What is the resulting list that will be sorted after 16 recursive calls to mergesort?
  [16, 49, 39, 27, 43, 34, 46, 40]
What are the first 2 lists to be merged?
  [21] & [1]
Which two lists would be merged on the 7th merge?
  [1, 21, 26, 45] & [2, 9, 28, 29]
*/

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
};

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  const middle = partition(array, start, end);
  array = qSort(array, start, middle);
  array = qSort(array, middle + 1, end);
  return array;
}

// for using the first item as the pivot
function partition2(array, start, end) {
  const pivot = array[start];
  let j = start;
  for (let i = start + 1; i < end; i++) {
    if (array[i] <= pivot) {
      j++;
      swap(array, i, j);
    }
  }
  swap(array, start, j);
  return j;
}

function partition(array, start, end) {
  const pivot = array[end - 1]; //array[start]
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
};


str = '89 30 25 32 72 70 51 42 25 24 53 55 78 50 13 40 48 32 26 2 14 33 45 72 56 44 21 88 27 68 15 62 93 98 73 28 16 46 87 28 65 38 67 16 85 63 23 69 64 91 9 70 81 27 97 82 6 88 3 7 46 13 11 64 76 31 26 38 28 13 17 69 90 1 6 7 64 43 9 73 80 98 46 27 22 87 49 83 6 39 42 51 54 84 34 53 78 40 14 5';
const qArr = str.split` `.map(x => +x);

const testArray = [14, 17, 13, 15, 19, 10, 3, 16, 9, 12]

console.log(qSort(testArray));
console.log('test');

/*
2. Understanding quicksort
1) Suppose you are debugging a quicksort implementation that is supposed to sort an array in ascending order.
After the first partition step has been completed,
the contents of the array is in the following order: 3 9 1 14 17 24 22 20.

3 9 1 14 20 24 22 17
3 9 1 20 17 24 22 14

Which of the following statements is correct about the partition step? Explain your answer.

The pivot could have been 17, but could not have been 14
The pivot could have been either 14 or 17
Neither 14 nor 17 could have been the pivot
The pivot could have been 14, but could not have been 17
  **** The pivot could have been 14 or 17. The pivot attempts to swap any item less than the pivot in a spot,
  before the pivot, or in other words, the left half of the array,
  while tracking the position the pivot should be swapped to. At the end of partition, it swaps the pivot to
  its position and uses that position as the 'end' of the next partition sort
  Because 14 and 17 are it's sorted array order after the partition, that means it could have been the pivot

2) Given the following list of numbers 14, 17, 13, 15, 19, 10, 3, 16, 9, 12
show the resulting list after the second partitioning according to the quicksort algorithm.
  -When using the last item on the list as a pivot
    ***After first partition: 10, 3, 9, 12, 19, 14, 17, 16, 13, 15; middle = 3
    ***After second partition: [3, 9, 10, 12, 19, 10, 3, 16, 9, 15]

  -When using the first item on the list as a pivot
    //to use the first item as the pivot, need to adjust the code to:
      function partition(array, start, end) {
        const pivot = array[start];
        let j = start;
        for (let i = start + 1; i < end; i++) {
            if (array[i] <= pivot) {
              j++;
              swap(array, i, j);
            }
        }
        swap(array, start, j);
        return j;
      }

    ***After first partition: [12, 13, 10, 3, 9, 14, 15, 16, 19, 17]
    ***After second partition: [9, 10, 3, 12, 13, 14, 15, 16, 19, 17]
    ***After third partition: [3, 9, 10, 12, 13, 15, 16, 19, 17];
    ***

*/

/*
7. Sort in place
Write an algorithm to shuffle an array into a random order in place (i.e., without creating a new array).
*/

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * Math.floor(array.length))
    swap(array, i, j);
  }
  return array;
}

console.log(shuffle(testArray));

/*6. Bucket sort
Write an O(n) algorithm to sort an array of integers, 
where you know in advance what the lowest and highest values are. 

i.e. [12, 13, 10, 3, 9, 14, 15, 16, 19, 17]
low = 3
high = 19
*/

function bucketSort(array, low, high){
  /*
  O(n) algo, where you know low and high
  Could use the middle/difference as a pivot point.
  19-3 = 16/2 = 8+3 = 11 as pivot and then
  
  
  */
  
}