import { LinkedList, Node } from "../linked-lists/linked-list.mjs";

class HashMap {
  constructor() {
    this.hashArray = new Array();
    this.smallerArray = new Array();

    this.add16Indices();

    this.loadFactor = 0.75;
  }
  add16Indices() {
    for (let i = 0; i < 16; i++) {
      this.hashArray.push(new LinkedList());
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.hashArray.length;
    }

    return hashCode;
  }
  set(key, valueHash) {
    let newKeyPair = { [key]: valueHash };
    let newKeyIndex = this.hash(key);
    if (this.hashArray[newKeyIndex].head === null) {
      this.hashArray[newKeyIndex].append(newKeyPair);
    } else {
      let temp = this.hashArray[newKeyIndex].head;
      while (temp) {
        if (temp.value.hasOwnProperty(key)) {
          temp.value[key] = valueHash;
          return;
        } else {
          temp = temp.next;
        }
      }
      this.hashArray[newKeyIndex].append(newKeyPair);
    }
    this.checkLoadBalance();
  }
  get(key) {
    let hashElement = this.hashArray[this.hash(key)].head;
    while (hashElement) {
      if (hashElement.value[key]) {
        return hashElement.value[key];
      } else {
        hashElement = hashElement.next;
      }
    }
    return "Value doesn't exist";
  }

  has(key) {
    let temp = this.hashArray[this.hash(key)].head;
    while (temp) {
      if (temp.value.hasOwnProperty(key)) {
        return true;
      } else {
        temp = temp.next;
      }
    }
    return false;
  }
  remove(key) {
    let elementIndex = this.hash(key);
    let temp = this.hashArray[elementIndex].head;
    while (temp) {
      if (temp.value.hasOwnProperty(key)) {
        delete temp.value[key];
        return true;
      } else {
        temp = temp.next;
      }
    }
    return false;
  }
  length() {
    let length = 0;

    for (let i = 0; i < this.hashArray.length; i++) {
      if (this.hashArray[i].head === null) {
        continue;
      } else {
        let temp = this.hashArray[i].head;
        linkedLoop: while (temp) {
          if (Object.keys(temp.value).length === 0) {
            temp = temp.next;
            continue linkedLoop;
          }
          length++;
          temp = temp.next;
        }
      }
    }
    return length;
  }
  clear() {
    for (let i = 0; i < this.hashArray.length; i++) {
      if (this.hashArray[i].head === null) {
        continue;
      } else {
        this.hashArray[i].head = null;
      }
    }
  }
  keys() {
    let arrayOfKeys = [];
    for (let i = 0; i < this.hashArray.length; i++) {
      if (this.hashArray[i].head === null) {
        continue;
      } else {
        let temp = this.hashArray[i].head;
        linkedLoop: while (temp) {
          if (Object.keys(temp.value).length === 0) {
            temp = temp.next;
            continue linkedLoop;
          }
          arrayOfKeys.push(Object.keys(temp.value)[0]);
          temp = temp.next;
        }
      }
    }
    return arrayOfKeys;
  }
  values() {
    let arrayOfValues = [];
    for (let i = 0; i < this.hashArray.length; i++) {
      if (this.hashArray[i].head === null) {
        continue;
      } else {
        let temp = this.hashArray[i].head;
        linkedLoop: while (temp) {
          if (Object.keys(temp.value).length === 0) {
            temp = temp.next;
            continue linkedLoop;
          }
          arrayOfValues.push(Object.values(temp.value)[0]);
          temp = temp.next;
        }
      }
    }
    return arrayOfValues;
  }
  entries() {
    let arrayOfEntries = [];
    for (let i = 0; i < this.hashArray.length; i++) {
      if (this.hashArray[i].head === null) {
        continue;
      } else {
        let currentEntry = [];
        let temp = this.hashArray[i].head;
        linkedLoop: while (temp) {
          if (Object.keys(temp.value).length === 0) {
            temp = temp.next;
            continue linkedLoop;
          }
          currentEntry.push(
            Object.keys(temp.value)[0],
            Object.values(temp.value)[0]
          );
          arrayOfEntries.push(currentEntry);
          currentEntry = [];
          temp = temp.next;
        }
      }
    }
    return arrayOfEntries;
  }
  checkLoadBalance() {
    if (this.length() / this.hashArray.length > this.loadFactor) {
      this.smallerArray = structuredClone(this.hashArray);
      this.clear();
      this.add16Indices();
      for (let i = 0; i < this.smallerArray.length; i++) {
        if (this.smallerArray[i].head === null) {
          continue;
        } else {
          let temp = this.smallerArray[i].head;
          linkedLoop: while (temp) {
            if (Object.keys(temp.value).length === 0) {
              temp = temp.next;
              continue linkedLoop;
            }
            this.set(Object.keys(temp.value)[0], Object.values(temp.value)[0]);
            temp = temp.next;
          }
        }
      }
      this.smallerArray = [];
    }
  }
}

let newHash = new HashMap();
newHash.set("apple", "red");
newHash.set("banana", "yellow");
newHash.set("carrot", "orange");
newHash.set("dog", "brown");
newHash.set("elephant", "gray");
newHash.set("frog", "green");
newHash.set("grape", "purple");
newHash.set("hat", "black");
newHash.set("ice cream", "white");
newHash.set("jacket", "blue");
newHash.set("kite", "pink");
newHash.set("lion", "golden");
newHash.set("banana", "beige");
newHash.set("ice cream", "brown");
newHash.set("moon", "silver");
newHash.set("moon", "gray");
newHash.set("frog", "blue");
newHash.set("kite", "yellow");
console.log(newHash.clear());
console.log(newHash.length());
