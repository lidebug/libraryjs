//Is object exist?
function is(obj:any) {
  if (obj === null || obj === undefined) return false;
  if (isNaN(obj) && typeof(obj) === "number") return false;
  else return true;
}

//Not exist?
function not(obj:any) {
  return !is(obj);
}

//Choose first existing object
function or(list:Array<any>) {
  for(let value of list) {
    if (is(value)) return value;
  }
  return null;
}