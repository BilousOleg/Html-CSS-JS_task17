// Приклад використання DoublyLinkedList

try {
  const list2 = new DoublyLinkedList(1, 2, 3);
  list2.printList(); // 1 <-> 2 <-> 3
  list2.deleteItem(2);
  list2.printList(); // 1 <-> 3
  list2.addNthElement(4, 2);
  list2.addNthElement(5, 3);
  list2.printList(); // 1 <-> 3 <-> 4

  // Демонстрація роботи ітератора

  const [elem1, elem2] = list2; // Деструктуроване присвоєння
  console.log(elem1, elem2);

  console.log(...list2); // Розширення через spread оператор

  // Перебір через for..of
  for (const element of list2) {
    console.log(element);
  }
} catch (error) {
  console.log(error);
}
