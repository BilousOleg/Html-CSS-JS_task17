'use strict';
function checkType(value, type) {
  if (typeof value !== type) {
    throw new TypeError(`type of value must be ${type}`);
  }
}

function checkStringEmpty(value) {
  value = value.trim();
  if (value.length === 0) {
    throw new Error('string value must be non-empty');
  }
  return value;
}

function checkNumberRange(value, range) {
  if (!Number.isSafeInteger(value) || value < range) {
    throw new RangeError(
      `${value} must be a safe, no less than ${range} integer`
    );
  }
}
