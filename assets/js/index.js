'use strict';
// Завдання 1

// Приклад використання DoublyLinkedList

try {
  const list1 = new DoublyLinkedList(1, 2, 3);
  list1.printList(); // 1 <-> 2 <-> 3
  list1.deleteItem(2);
  list1.printList(); // 1 <-> 3
  list1.addNthElement(4, 2);
  list1.addNthElement(5, 3);
  list1.printList(); // 1 <-> 3 <-> 4

  console.log(list1);

  // Демонстрація роботи ітератора

  const [elem1, elem2] = list1; // Деструктуроване присвоєння
  console.log(elem1, elem2);

  console.log(...list1); // Розширення через spread оператор

  // Перебір через for..of
  for (const element of list1) {
    console.log(element);
  }
} catch (error) {
  console.log(error);
}

// Завдання 2

try {
  const structure1 = new NewDataStructure(
    1,
    'string',
    false,
    Symbol('foo'),
    null,
  );
  console.log(structure1);
} catch (error) {
  console.log(error);
}
