/*
1.a - O(1) constant time
1.b - O(n) linear time

2. isEven would be O(1) because it doesn't how big the number or really any number,  
   it'll still return within the same amount of time

3. areYouHere would be Polynomial time O(n^k) as it's a nested loop.
   An algorithm with two loops would be O(n^2), while three would be O(n^4)

4. doubleArrayValues would be linear. The running time is directly proportional to the size of the input

5. Linear. Even though the item could be in the early part of the array, 
   the time is still proportional to the size of the input array

6. This is either O(nlogn), which is just about linear or it's polynomial. It should be less than polynomial
   because the second nested loop reduces by 1 each time, so that should make it significantly faster the bigger the input

7. This algorithm adds 0 and 1 to the array, then it adds the last two numbers in the stack as the new data to push
   until it reaches the parameter, num. This is probably linear as run time is proportional to the higher input parameter

8. efficientSearch is logarithmic time as each time it iterates, it's halving the search area

9. findRandomElement is constant time O(1) as the size of the input has no affect in it's runtime.

10. isWhat determines if the number is prime. It is probably linear time as it iterates through until it reaches the nth number

11. 

Is Big O notation only for arrays? Does it matter for single variable inputs or will it always just be constant O

*/ 