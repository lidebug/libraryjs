//Is object exist?
function is(obj) {
  if (obj === null || obj === undefined) return false;
  if (isNaN(obj) && typeof(obj) === "number") return false;
  else return true;
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