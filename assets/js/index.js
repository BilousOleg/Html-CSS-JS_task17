// Приклад використання linkedList

const list1 = new LinkedList(1, 2, 3);
list1.printList();
list1.append(4);
list1.printList();
list1.deleteItem(2);
list1.printList();
list1.addNthElement(2, 1);
list1.printList();

// Приклад використання DoublyLinkedList

const list2 = new DoublyLinkedList(1, 2, 3);
list2.printList();

// Демонстрація роботи ітератора

const [elem1, elem2] = list2; // Деструктуроване присвоєння
console.log(elem1, elem2);

console.log(...list2); // Розширення через spread оператор

// Перебір через for..of
for (const element of list2) {
  console.log(element);
}
