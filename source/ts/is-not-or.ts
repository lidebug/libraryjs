//Is object exist?
function is(obj) {
  if (obj !== null && obj !== undefined) {
    if (typeof(obj)=='string' || typeof(obj)=='object' || typeof(obj)=='number' || typeof(obj)=='boolean' || typeof(obj)=='function') return true;
    else if (isNaN(obj)) return false;
    else return true;
  }
  else return false;
}

//Not exist?
function not(obj) {
  return !is(obj);
}

//Choose first existing object
function or(array) {
  var k;
  for(k in array) {
    if (is(array[k])) {
      return array[k];
    }
  }
  return null;
}