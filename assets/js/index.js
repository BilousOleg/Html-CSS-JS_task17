'use strict';

try {
  // Рядки для перевірки
  const str1 = '()(([]))'; // true
  const str2 = '{][)'; // false
  const str3 = '[{(<]})>'; // false
  const str4 = '[{(<>)}]'; // true

  // Словник пар дужок
  const bracketsMap = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
    ['<', '>'],
  ]);

  // Перевірка роботи функції
  console.log(checkSequence(str1, bracketsMap)); // true
  console.log(checkSequence(str2, bracketsMap)); // false
  console.log(checkSequence(str3, bracketsMap)); // false
  console.log(checkSequence(str4, bracketsMap)); // true
} catch (error) {
  console.log(error);
}
