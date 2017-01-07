//Print random string
function randtext(len:number):string {
  var trace:string = "";
  for(let i=0; i<len; i++) {
    trace += getrandalf();
  };
  return trace;
}

function getrandalf():string {
  var a:number = rand(0,25);
  
  var alf = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  
  return alf[a];
}