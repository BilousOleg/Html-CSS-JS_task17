try {
  const structure1 = new NewDataStructure(
    1,
    'string',
    false,
    Symbol('foo'),
    null
  );
  console.log(structure1);
  // Приклад застосування ітератора:
  const [firstValue, secondValue] = structure1; // Деструктуроване присвоєння
  console.log('Destructurised assignment:', firstValue, secondValue);

  console.log('Destructuring:', ...structure1);

  for (const element of structure1) {
    console.log('Value:', element);
  }
} catch (error) {
  console.log(error);
}
