// Вузол
class LinkedListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
  get data() {
    return this._data;
  }
  set data(value) {
    // Перевірка даних
    this._data = value;
  }
}

class linkedListIterator {
  constructor(list) {
    this.list = list; // Передача списку до ітератора
    this.currentNode = null;
  }
  next() {
    // Визначаемо поточний вузол через тернарний оператор (null визначаеться як false)
    this.currentNode = this.currentNode
      ? this.currentNode.next
      : this.list.head;
    return {
      value: this.currentNode?.data,
      done: this.currentNode === null,
    };
  }
}

class LinkedList {
  constructor(...items) {
    // Object.defineProperty
    this.head = null;
    for (const item of items) {
      this.append(item);
    }
  }
  // Додати елемент в кінець списку
  append(data) {
    const newNode = new LinkedListNode(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    return this;
  }
  deleteItem(data) {
    if (!this.head) return; // Список порожній
    if (this.head.data === data) {
      // Якщо видаляється перший елемент
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    // Цикл перебору:  Якщо наступний вузол існує і його дані дорівнюють аргументу
    // Початок з голови
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    // Якщо співпадіння знайдено (current.next !== null)
    if (current.next) {
      current.next = current.next.next;
    }
  }
  addNthElement(data, position) {
    const newNode = new LinkedListNode(data);

    if (position === 0) {
      // Додати на початок (назначити головою й посунути попередню)
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    let index = 0;
    // Якщо current (спочатку - голова) існує - перебираємо
    // список по посиланням next, збільшуючи індекс з кожним переходом
    while (current && index < position - 1) {
      current = current.next;
      index++;
    }
    // Якщо співпадіння знайдено - додаємо елемент вказаної позиції
    if (current) {
      newNode.next = current.next;
      current.next = newNode;
    }
  }
  // Вивести список
  printList() {
    let current = this.head;
    const result = [];
    while (current) {
      // Створюємо масив, в який додаємо елементи списку
      result.push(current.data);
      current = current.next;
    }
    // Збираємо масив в строку, відокремлюючи елементи стрілкою
    console.log(result.join(' -> '));
  }

  // Додав ітератор
  [Symbol.iterator]() {
    return new linkedListIterator(this);
  }
}
