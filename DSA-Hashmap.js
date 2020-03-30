const HashMap = require('./HashMap');

function main() {
  

  const lotr = new HashMap();

  lotr.MAX_LOAD_RATIO = .5;
  lotr.SIZE_RATIO = 3;

  lotr.set("Hobbit", "Bilbo");
  lotr.set("Hobbit", "Frodo");
  lotr.set("Wizard", "Gandolf");
  lotr.set("Human", "Aragorn");
  lotr.set("Elf", "Legolas");
  lotr.set("Maiar", "The Necromancer");
  lotr.set("Maiar", "Sauron");
  lotr.set("RingBearer", "Gollum");
  lotr.set("LadyOfLight", "Galadriel");
  lotr.set("HalfElven", "Arwen");
  lotr.set("Ent", "Treebeard");
  console.log(lotr)

  console.log(lotr.get("Maiar"));
  console.log(lotr.get("Hobbit"))
}

main();

/* 
-The items of Maiar and Hobbit are Sauron and Frodo, respectively.
Why? Because the keys are already stored in the table and the values are updated
with the latest set.
-The capacity is 24. The initial capacity is 8 and once the Maiar was added, 
the table resizes by the LOAD_RATIO (3x), i.e. 24
*/

/*
2. What does this do
map1 hashes 'Hello World.' and sets it to 10. It then hashes the string again (same slot) and overwrites it to 20
map2 does the opposite, first hashes and sets to 20, then hashes same string and overwrites to 10.
The output would be 
20
10
*/

const WhatDoesThisDo = function(){
  let str1 = 'Hello World.';
  let str2 = 'Hello World.';
  let map1 = new HashMap();
  map1.set(str1,10);
  map1.set(str2,20);
  let map2 = new HashMap();
  let str3 = str1;
  let str4 = str2;
  map2.set(str3,20);
  map2.set(str4,10);

  console.log(map1.get(str1));
  console.log(map2.get(str3));
}
WhatDoesThisDo();
