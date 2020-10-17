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
    while(current.next) {
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

  insertAt = (head, ordinalPosition, value) => {
    let current = head;
    for (let i = 0; i != ordinalPosition; i++) {
      current = current.next;
    }
  };

  printAll = () => {
    let current = this.head;
    while(current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

class linkedListItem {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

const myList = new linkedList(13);

// let current = head;
// let sum = 0;
// while(current != null) {
//   sum += current.value;
//   current = current.next;
// }

myList.printAll();
console.log('====');
myList.prepend(2);
myList.prepend(38);
myList.prepend(27);
myList.prepend(91);
myList.printAll();
console.log(myList.valueAtPosition(1));
console.log(myList.itemAtPosition(0));
console.log('========');
myList.printAll();
console.log('========');
myList.append(99);
myList.printAll();