var localStorageSpace = function () {
  var allStrings = '';
  for (var key in window.localStorage) {
    if (window.localStorage.hasOwnProperty(key)) {
      allStrings += window.localStorage[key];
    }
  }
  return allStrings
    ? 3 + (allStrings.length * 16) / (8 * 1024) + ' KB'
    : 'Empty (0 KB)';
};

var storageIsFull = function () {
  var size = localStorageSpace(); // old size

  // try to add data
  try {
    window.localStorage.setItem('test-size', '1');
  } catch (er) {}

  // check if data added
  var isFull = size === localStorageSpace();
  window.localStorage.removeItem('test-size');

  return isFull;
};

export default storageIsFull;
