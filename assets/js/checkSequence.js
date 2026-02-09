'use strict';

function checkSequence(bracketsString, bracketsMap) {
  checkType(bracketsString, 'string');
  bracketsString = checkStringEmpty(bracketsString);
  if (!bracketsMap instanceof Map) {
    throw new TypeError('bracketsMap must be a map object');
  }
  // Стек дужок, який буде наповнюватися та спустошуватися при необхідності (максимальний розмір стеку - довжина рядка)
  const bracketsStack = new Stack(bracketsString.length);
  // Сет закриваючих дужок для швидкого пошуку закриваючих дужок (.has в сеті)
  const closingBrackets = new Set(bracketsMap.values());
  // Цикл перебору дужок в наданому рядку і подальших операцій над ними і стеком
  for (const bracket of bracketsString) {
    // Якщо відкриваюча дужка
    if (bracketsMap.has(bracket)) {
      bracketsStack.push(bracket);
      // Додаємо в стек і продовжуемо перебір
      continue;
    }
    // Якщо закриваюча дужка
    if (closingBrackets.has(bracket)) {
      // Якщо закриваюча дужка перед відкриваючою
      if (bracketsStack.isEmpty) {
        // Якщо стек порожній (адже наповнється він тільки відкриваючими), одразу повертаємо false
        return false;
      }
      // Якщо дужки не співпадають (якщо значенню відповідної до відкриваючої останньої запушеної дужки,
      // тобто її закриваючому аналогу, не відповідає значення поточної дужки ( } !== ] ))
      if (bracketsMap.get(bracketsStack.top()) !== bracket) {
        // Повертаємо false при "спробі" закрити одну дужку іншою, яка їй не відповідає за типом
        return false;
      }
      // Видадяємо зі стеку останній елемент, адже співпадіння знайдено
      bracketsStack.pop();
    }
  }
  // Повертаємо значення того, чи порожній стек. Якщо так - значить усі дужки знайшли свої співпадіння (true), якщо ні, то false
  return bracketsStack.isEmpty;
}
