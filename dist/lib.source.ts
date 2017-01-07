//Superior array
class Arc<T> {
  array:any;
  length:number;
  id:number;
  constructor() {
    this.array = {};
    this.length = 0;
    this.id = 0;
  }

  add(name:string, value:T) {
    if (not(this.array[name])) this.length++;
    this.array[name] = value;
  }

  push(value:T) {
    var id:string = "arcUnicId" + this.id;
    this.id++;
    this.add(id, value);
    return id;
  }

  value(name:string) {
    return this.array[name];
  }

  del(name:string) {
    if (is(this.array[name])) this.length--;
    this.array[name] = null;
    delete this.array[name];
  }

  search(value:T) {
    var valueLocal:T;
    for(let i in this.array) {
      valueLocal = this.value(i);
      if (valueLocal == value) return i;
    };
  }

  toString() {
    var trace:string = "";
    for(let i in this.array) {
      trace += "["+i+"] " + this.value(i) + "\n";
    };
    return trace;
  }
}
//Superior Promise
class Async<T> {
  value:T;
  onload:Events;
  constructor() {
    this.onload = new Events();
  }
  then(res:Function) {
    this.onload.push(res);
    if (is(this.value)) res(this.value);
  }
  set(value:T) {
    this.value = value;
    this.onload.call(value);
  }
}
//Easy way to check that any parameters aren't set.
function check(list:Array<any>) {
  if (not(list)) return false;
  if (not(list.length)) return false;
  for(let items of list) {
    if(not(items)) return false;
    if(not(items.length)) return false;
    var parent = items[0];
    if (not(parent)) return false;
    for(let i = 1; i < items.length; i++) {
      parent = parent[items[i]];
      if (not(parent)) return false;
    }
  }
  return true;
}
//Easy way to call lots of functions
class Events {
  events:Arc<Function>;
  constructor() {
    this.events = new Arc();
  }

  add(name:string, event:Function) {
    this.events.add(name, event);
  }

  push(event:Function) {
    return this.events.push(event);
  }

  del(name:string) {
    if (not(name)) return;
    this.events.del(name);
  }

  call(param?:any) {
    var k;
    for(k in this.events.array) {
      this.events.value(k)(param);
    }
  }
}

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
//More simple random function
function rand(a:number, b:number):number {  
  var c:number;
  var d:number;

  c = b - a;
  if (c < 0) return -1;
  d = Math.random()*c;
  d = Math.round(d);
  d += a;
  return d;
}
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
//Superior round function
function round(n:number, e:number):number {
  var p:number;
  p = Math.pow(10,e);
  return Math.round(n*p)/p;
}
//It's just timer...
class Timer {
  triggers:any = {};
  intervalId:any;
  constructor() {
    this.triggers.isStarted = false;
    this.triggers.time = 0;
    this.triggers.checkpoint = 0;
    this.start();
  }

  //start, restart
  start() {
    this.pause();

    this.triggers.time = 0;
    this.triggers.checkpoint = 0;

    this.go();
  }

  //pause
  pause() {
    if (!this.triggers.isStarted) return;
    
    clearInterval(this.intervalId);
    
    this.triggers.isStarted = false;
  }

  //continue
  go() {
    var f = this;
    if (this.triggers.isStarted) return;
    
    this.intervalId = setInterval(function() {
      f.triggers.time++;
    }, 10);
    
    this.triggers.isStarted = true;
  }

  //show counted time
  s() {
    return this.triggers.time/100;
  }

  //show counted time + left time since last checkpoint 
  i() {
    var v:any = {};
    
    v.sec = this.s();
    v.delay = round(v.sec - this.triggers.checkpoint, 4);
    this.triggers.checkpoint = v.sec; //after v.delay, couse v.delay uses last $checkpoint
    
    v.replay = v.sec + "sec (+" + v.delay + ")";
    return v.replay;
  }
}