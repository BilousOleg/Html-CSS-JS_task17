class Stack {
  constructor(maxSize, ...items) {
    this.maxSize = maxSize;
    this._size = 0;
    for (const item of items) {
      this.push(item);
    }
  }
  set maxSize(value) {
    checkType(value, 'number');
    checkNumberRange(value, 1);
    this._maxSize = value;
  }
  get maxSize() {
    return this._maxSize;
  }
  get size() {
    return this._size;
  }
  get isEmpty() {
    return this._size === 0;
  }
  top() {
    return this[`_${this._size - 1}`];
  }
  push(item) {
    if (this._size >= this._maxSize) {
      throw new RangeError('stack overflow');
    }
    this[`_${this._size}`] = item;
    return ++this._size;
  }
  pop() {
    if (this.isEmpty) {
      return;
    }
    const lastItem = this[`_${this._size - 1}`];
    delete this[`_${this._size - 1}`];
    this._size--;
    return lastItem;
  }
}
