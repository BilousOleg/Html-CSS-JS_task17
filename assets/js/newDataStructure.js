class NewDataStructureIterator {
  constructor(structure) {
    this.structure = structure;
    this.index = 1;
  }
  next() {
    if (this.index < this.structure.length + 1) {
      return {
        value: this.structure[`*${this.index++}*`],
        done: false,
      };
    }
    return {
      value: undefined,
      done: true,
    };
  }
}

class NewDataStructure {
  constructor() {
    this.length = 0;
    Object.defineProperty(this, '_length', {
      enumerable: false,
    }); // За допомогою дескриптора властивості зробив length неперечислюваною (наприклад, для for..in)
    for (const element of arguments) {
      this.push(element);
    }
  }
  set length(value) {
    checkType(value, 'number');
    checkNumberRange(value, 0);
    this._length = value;
  }
  get length() {
    return this._length;
  }
  // Метод push() для додавання значення до структури
  push(item) {
    this[`*${++this.length}*`] = item;
    return this.length;
  }
  [Symbol.iterator]() {
    return new NewDataStructureIterator(this);
  }
}
