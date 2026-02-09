// Клас конкретного елемента списку
// Складно було придумати, яку саме валідацію додати до елемента списку (ноди), тому просто додав перевірку на undefined
class ListNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
  set data(value) {
    if (value === undefined) {
      throw new TypeError('Node data cannot be undefined');
    }
    this._data = value;
  }
  get data() {
    return this._data;
  }
}

// Клас ітератора списку
class DoublyLinkedListIterator {
  constructor(list) {
    this.list = list;
    this.currentNode = null;
  }
  next() {
    // Визначаемо поточний вузол через тернарний оператор (null визначаеться як false)
    this.currentNode = this.currentNode
      ? this.currentNode.next
      : this.list.head;
    // Повертаємо об'єкт за протоколом symbol.iterator
    return {
      // Optional Chaining syntax (?.) - синтаксис безпечного доступу до вкладених властивостей об'єктів
      value: this.currentNode?.data,
      done: this.currentNode === null,
    };
  }
}

// Клас самого списку
class DoublyLinkedList {
  // items - масив (array)
  constructor(...items) {
    this.length = 0;
    Object.defineProperty(this, '_length', {
      enumerable: false,
    }); // За допомогою дескриптора властивості зробив length неперечислюваною (наприклад, для for..in)
    this.head = null;
    this.tail = null;
    for (const item of items) {
      this.push(item);
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
  // Спочатку треба обмінятись посиланнями, а потім - стати хвостом
  push(item) {
    const listNode = new ListNode(item);
    // Якщо список порожній (і елемент буде один)
    if (this.length === 0) {
      this.head = listNode;
      this.tail = listNode;
      // Якщо список не порожній (і елементів буде 2 і більше)
    } else {
      this.tail.next = listNode; // Посилання next у ПОТОЧНОГО хвоста змінюється на listNode (наступний елемент)
      listNode.prev = this.tail; // Посилання prev у НАСТУПНОГО елемента (listNode) змінюється на ПОТОЧНИЙ ХВІСТ (this.tail)
      this.tail = listNode; // ПОТОЧНИЙ хвіст змінюється на НАСТУПНИЙ елемент (listNode);
    }
    return ++this.length; // Повертаємо довжину після додавання елемента
  }
  // Метод шукає перший З ПОЧАТКУ елемент і видаляє його
  // Можна зробити аналог для видалення першого з кінця (tail)
  deleteItem(data) {
    let itemToDelete; // Змінна, яку буде повертати метод. Спеціально неініціалізована, щоб повертати undefined, якщо нічого не видаляється
    if (!this.head) return itemToDelete; // Список порожній (можна було б і повертати нічого - теж undefined)
    if (this.head.data === data) {
      itemToDelete = this.head.data;
      // Якщо видаляється єдиний елемент
      if (this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length--;
        return itemToDelete;
      }
      this.head = this.head.next;
      // Альтренатива того, коли видаляється єдиний елемент:
      // if (this.head) {
      //   this.head.prev = null;
      // } else {
      //   this.tail = null;
      // }
      // Якщо видаляється перший елемент
      this.head.prev = null;
      this.length--;
      return itemToDelete;
    } else if (this.tail.data === data) {
      itemToDelete = this.tail.data;
      // Якщо видаляється останній елемент
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.length--;
      return itemToDelete;
    }
    let current = this.head;
    // Цикл перебору: Якщо вузол існує і його дані дорівнюють аргументу
    while (current && current.data !== data) {
      current = current.next;
    }
    // Якщо співпадіння знайдено (current !== null)
    if (current) {
      itemToDelete = current.data;
      current.prev.next = current.next;
      current.next.prev = current.prev;
      current = current.next;
      this.length--;
      return itemToDelete;
    }
  }
  addNthElement(data, position) {
    checkType(position, 'number');
    checkNumberRange(position, 0);
    if (position > this.length) {
      // Додаткова обробка числа, більшого за довжину списка (якщо таке вказано - елемент додається в кінець)
      position = this.length;
    }
    const newNode = new ListNode(data);

    if (position === 0) {
      // Додати на початок (назначити головою й посунути попередню)
      newNode.next = this.head;
      if (this.head) {
        this.head.prev = newNode;
      } else {
        this.tail = newNode;
      }
      this.head = newNode;
      return ++this.length; // Повертаємо довжину після додавання елемента
    } else if (position === this.length) {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      return ++this.length; // Повертаємо довжину після додавання елемента
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
      newNode.prev = current;
      current.next.prev = newNode;
      current.next = newNode;
      return ++this.length; // Повертаємо довжину після додавання елемента
    }
  }
  // Метод для виведення списку в читабельному вигляді
  printList() {
    let current = this.head;
    const result = [];
    while (current) {
      // Створюємо масив, в який додаємо елементи списку
      result.push(current.data);
      current = current.next;
    }
    // Збираємо масив в строку, відокремлюючи елементи стрілкою
    console.log(result.join(' <-> '));
  }
  [Symbol.iterator]() {
    return new DoublyLinkedListIterator(this);
  }
  // Наскільки я розумію, тут можна додати ще один паттерн перебору, ще один ітератор (тобто новий клас), але який перебирає з tail
}
