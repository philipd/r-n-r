const Chance = require("chance");
const { doXTimes, benchmark } = require("./benchmark");
const LinkedList = require("./linkedList");

const chance = new Chance();

myList = new LinkedList(0);

const tasks = {
  prepend: () => {
    let myList = new LinkedList(0);
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myList.prepend(chance.integer({ min: 0, max: 99 }));
    }
  },
  append: () => {
    let myList = new LinkedList(0);
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myList.append(chance.integer({ min: 0, max: 99 }));
    }
  },
  push: () => {
    let myArray = [];
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myArray.push(chance.integer({ min: 0, max: 99 }));
    }
  },
};

const randInt = () => {
  return chance.integer({ min: 0, max: 999999999999 });
};

const populateList = () => {
  let myList = new LinkedList(chance.name());

  doXTimes(() => { myList.prepend(chance.name()) }, Math.pow(10, 6))();
  return myList;
}

const lotsOfListInsertions = (myList) => {
  const insertionPoint = myList.itemAtPosition(Math.pow(10,5));
  for(let i=0; i<Math.pow(10,3); i++){
    myList.insert(insertionPoint, chance.name());
  }
}

const populateArray = () => {
  let myArray = [];

  doXTimes(() => { myArray.push(chance.name()) }, Math.pow(10, 6))();
  return myArray;
}

const lotsOfArrayInsertions = (myArray) => {
  doXTimes(() => {
    myArray.splice(Math.pow(10, 5), 0, chance.name());
  }, Math.pow(10,3)
  )();
}

const testList = benchmark(populateList);
benchmark(() => testList.find(4565123), 'failed find');
benchmark(() => testList.find(testList.valueAtPosition(10000)), 'successful find');
benchmark(() => lotsOfListInsertions(testList), 'lots of list insertions');
const testArray = benchmark(populateArray);
console.log('length', testArray.length);
benchmark(() => lotsOfArrayInsertions(testArray), 'lots of array insertions');
console.log('length', testArray.length);



// benchmark(doXTimes(myList.append(chance.integer({ min: 0, max: 99 }), 1)));

// const myList = new linkedList(13);
