//More short round function
function round(n,e) {
  var p;
  p = Math.pow(10,e);
  return Math.round(n*p)/p;
}