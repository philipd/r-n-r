const Chance = require("chance");
const { doXTimes, benchmark } = require("./benchmark");

const chance = new Chance();

class linkedList {
  constructor(value) {
    this.head = new linkedListItem(value);
  }

  prepend(value) {
    this.head = new linkedListItem(value, this.head);
  }

  append(value) {
    this.tail.next = new linkedListItem(value);
  }

  get tail() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  valueAtPosition(position) {
    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    return current.value;
  }

  itemAtPosition(position) {
    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    return current;
  }

  insertAt = (position, value) => {
    // We need to change the reference stored at the PREVIOUS point in the list
    let predecessor = this.itemAtPosition(position - 1);
    predecessor.next = new linkedListItem(value, predecessor.next);
  };

  printAll = () => {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  };
}

class linkedListItem {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

myList = new linkedList(0);

const tasks = {
  prepend: () => {
    let myList = new linkedList(0);
    for (let i = 0; i < Math.pow(10, 5); i++) {
      myList.prepend(chance.integer({ min: 0, max: 99 }));
    }
  },
  append: () => {
    let myList = new linkedList(0);
    for (let i = 0; i < Math.pow(10, 4); i++) {
      myList.append(chance.integer({ min: 0, max: 99 }));
    }
  },
  push: () => {
    let myArray = [];
    for (let i = 0; i < Math.pow(10, 5); i++) {
      myArray.push(chance.integer({ min: 0, max: 99 }));
    }
  },
};

for(let task in tasks) {
  benchmark(tasks[task]);
}

// benchmark(doXTimes(myList.append(chance.integer({ min: 0, max: 99 }), 1)));

// const myList = new linkedList(13);

// myList.printAll();
// console.log('========');
// myList.prepend(2);
// myList.prepend(38);
// myList.prepend(27);
// myList.prepend(91);
// myList.printAll();
// console.log(myList.valueAtPosition(1));
// console.log(myList.itemAtPosition(0));
// console.log('========');
// myList.printAll();
// console.log('========');
// myList.append(99);
// myList.printAll();
// console.log('========');
// myList.insertAt(3, 77);
// myList.printAll();
