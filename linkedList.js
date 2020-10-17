class LinkedList {
  constructor(value) {
    this.head = new LinkedListItem(value);
  }

  prepend(value) {
    this.head = new LinkedListItem(value, this.head);
  }

  append(value) {
    this.tail.next = new LinkedListItem(value);
  }

  get length() {
    let current = this.head;
    let counter = 0;
    while (current.next) {
      current = current.next;
      counter++;
    }
    return counter;
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

  elementAtPosition(position) {
    let current = this.head;
    for (let i = 0; i < position; i++) {
      current = current.next;
    }
    return current;
  }

  find(value) {
    let current = this.head;
    while(current.next){
      if(current.value === value) {
        return current;
      }
      current = current.next;
    }
  }

  insert(predecessor, valueToInsert){
    const successor = predecessor.next;
    predecessor.next = new LinkedListItem(valueToInsert);
    predecessor.next.next = successor;
  }

  insertAt(position, value) {
    // We need to change the reference stored at the PREVIOUS point in the list
    let predecessor = this.elementAtPosition(position - 1);
    predecessor.next = new LinkedListItem(value, predecessor.next);
    return predecessor.next;
  };

  printAll() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  };
}

class LinkedListItem {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

module.exports = LinkedList;