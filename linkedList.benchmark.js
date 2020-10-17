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
  const insertionPoint = myList.itemAtPosition(10000);
  for(let i=0; i<Math.pow(10,6); i++){
    myList.insert(insertionPoint, chance.name());
  }
}

const lotsOfArrayInsertions = () => {
}

const testList = benchmark(populateList);
benchmark(() => testList.find(4565123));
benchmark(() => testList.find(testList.valueAtPosition(10000)));
benchmark(() => lotsOfListInsertions(testList));



// benchmark(doXTimes(myList.append(chance.integer({ min: 0, max: 99 }), 1)));

// const myList = new linkedList(13);
