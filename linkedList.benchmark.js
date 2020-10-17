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

for(let task in tasks) {
  benchmark(tasks[task]);
}

// benchmark(doXTimes(myList.append(chance.integer({ min: 0, max: 99 }), 1)));

// const myList = new linkedList(13);