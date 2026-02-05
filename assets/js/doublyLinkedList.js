class ListNode {
  constructor(data) {
    this.data = data;
    this.prev = null;
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

class DoublyLinkedList {
  // items - масив (array)
  constructor(...items) {
    this.length = 0;
    this.head = null;
    this.tail = null;
    for (const item of items) {
      this.push(item);
    }
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
    return ++this.length;
  }
  // Метод можна так само реалізувати, перебираючи з tail, або навіть одночасно (хоча складніше буде)
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
}
