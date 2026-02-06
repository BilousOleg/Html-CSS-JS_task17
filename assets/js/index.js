'use strict';

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
