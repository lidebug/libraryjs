//Superior array
class Arc {
  array:any;
  length:number;
  id:number;
  constructor() {
    this.array = {};
    this.length = 0;
    this.id = 0;
  }

  add(name:string, value:any) {
    if (not(this.array[name])) this.length++;
    this.array[name] = value;
  }

  push(value:any) {
    var id:string = "arcUnicId" + this.id;
    this.id++;
    this.add(id, value);
    return id;
  }

  value(name:string) {
    return this.array[name];
  }

  remove(name:string) {
    if (is(this.array[name])) this.length--;
    this.array[name] = null;
    delete this.array[name];
  }

  search(value:any) {
    var valueLocal:any;
    for(let i in this.array) {
      valueLocal = this.value(i);
      if (valueLocal == value) return i;
    };
  }

  forEach(callback:Function) {
    for(let name in this.array) {
      callback(name, this.array[name]);
    }
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
class Async {
  value:any;
  onload:Events;
  constructor(private param:any = {}) {
    if (not(this.param.disposable)) this.param.disposable = false;
    this.onload = new Events();
  }
  then(res:Function) {
    this.onload.push(res);
    if (is(this.value)) res(this.value);
  }
  set(value:any) {
    this.value = value;
    this.onload.call(value);
    if (this.param.disposable) this.onload = new Events();
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
//Functions for working with cookie

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "; expires=" + date.toUTCString();
  }
  else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function setCookie(name, value) {
  createCookie(name, value, 365);
}

function delCookie(name) {
  createCookie(name,"",-1);
}
//Easy way to call lots of functions
class Events {
  events:Arc;
  constructor() {
    this.events = new Arc();
  }

  add(name:string, event:Function) {
    this.events.add(name, event);
  }

  push(event:Function) {
    return this.events.push(event);
  }

  remove(name:string) {
    if (not(name)) return;
    this.events.remove(name);
  }

  call(param?:any) {
    for(let id in this.events.array) {
      this.events.value(id)(param);
    }
  }

  idcall(param?:any) {
    for(let id in this.events.array) {
      this.events.value(id)(id, param);
    }
  }
}

//Is object exist?
function is(obj:any) {
  if (obj === null || obj === undefined) return false;
  if (isNumber(obj) && isNaN(obj)) return false;
  else return true;
}

//Not exist?
function not(obj:any) {
  return !is(obj);
}

//Choose first existing object
function or(...list:Array<any>) {
  for(let value of list) {
    if (is(value)) return value;
  }
  return null;
}

//Check type
function isObject( objectToCheck ) {
  return Object.prototype.toString.call( objectToCheck ) === "[object Object]";
}
function isNumber( numberToCheck ) {
  return Object.prototype.toString.call( numberToCheck ) === "[object Number]";
}
function isString( stringToCheck ) {
  return Object.prototype.toString.call( stringToCheck ) === "[object String]";
}
function isArray( arrayToCheck ) {
  return Object.prototype.toString.call( arrayToCheck ) === "[object Array]";
}
function isFunction( functionToCheck ) {
  return Object.prototype.toString.call( functionToCheck ) === "[object Function]";
}
//When you have to wait a lot of callbacks
class Loading {
  param:any = {};
  vars:any = {};
  constructor(callback) {
    var f = this;
    f.param.callback = callback;

    f.vars.loadings = 0;
    f.vars.loaded = 0;
    f.vars.isStarted = false;
  }
  add() {
    var f = this;
    f.vars.loadings++;
  }
  done() {
    var f = this;
    f.vars.loaded++;
    f.check();
  }
  start() {
    var f = this;
    f.vars.isStarted = true;
    f.check();
  }
  check() {
    var f = this;
    if (!f.vars.isStarted) return;
    if (f.vars.loaded >= f.vars.loadings) f.param.callback();
  }
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
function randstr(length:number):string {
  var trace:string = "";
  for(let i=0; i<length; i++) {
    trace += rand(0,35).toString(36);
  }
  return trace;
}
function randcolor() {
  var hex = "";
  for(let i=0; i<6; i++) {
    hex += rand(0,15).toString(16);
  }
  return "#"+hex;
}

//Extra random string
class Dict {
  constructor(dict:string) {
    var alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" ];
    var numerals = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    var sumerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    var dict16 = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    var extra = [ "-", "_"];
    var dict36 = alphabet.concat(sumerals);
    var Alphabet = [];
    for (let letter of alphabet) Alphabet.push(letter.toUpperCase());
    var dict64 = dict36.concat(extra).concat(Alphabet);

    if (dict === "a") return alphabet;
    else if (dict === "n") return numerals;
    else if (dict === "s") return sumerals;
    else if (dict === "16") return dict16;
    else if (dict === "36") return dict36;
    else if (dict === "64") return dict64;
    else dict36;
  }
}

function randtext(length:number):string {
  var trace:string = "";
  var dict = new Dict("a");
  for(let i=0; i<length; i++) {
    trace += randomValue(dict);
  }
  return trace;
}
function randstr64(length:number):string {
  var trace:string = "";
  var dict = new Dict("64");
  for(let i=0; i<length; i++) {
    trace += randomValue(dict);
  }
  return trace;
}
function randomValue(array:any) {
  return array[ rand(0, array.length - 1) ];
}
//Superior round function
function round(n:number, e:number):number {
  var p:number;
  p = Math.pow(10,e);
  return Math.round(n*p)/p;
}
//Array shuffle
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
//Superior setInterval and setTimeout
class Interval {
  protected param:any = {};
  protected vars:any = {};
  stoped:boolean = true;
  constructor (duration?:number, callback?:Function) {
    var f = this;
    f.create(duration, callback);
  }
  create(duratiom?:number, callback?:Function) {
    var f = this;
    f.set({
      duration: duratiom,
      callback: callback
    });
    f.start();
  }
  protected interval() {
    var f = this;
    if (f.stoped) return;
    f.vars.timeoutID = setTimeout(() => {
      if (f.stoped) return;
      f.param.callback();
      if (f.stoped) return;
      f.interval();
    }, f.param.duration);
  }
  set(param) {
    var f = this;
    if (is(param.duration)) f.param.duration = param.duration;
    if (is(param.callback)) f.param.callback = param.callback;
    if (is(param.after)) f.param.aftercallback = param.aftercallback;
  }
  call() {
    var f = this;
    if (f.stoped) return;
    f.param.callback();
    return f;
  }
  start() {
    var f = this;
    if (not(f.param.duration) || not(f.param.duration)) return;
    f.stoped = false;
    f.interval();
  }
  after(aftercallback:Function) {
    var f = this;
    f.set({ after: aftercallback });
  }
  stop() {
    var f = this;
    if (f.stoped) return;
    clearTimeout(f.vars.timeoutID);
    f.stoped = true;
    if (is(f.param.aftercallback)) f.param.aftercallback();
  }
  remove() { this.stop(); }
}
class Timeout extends Interval {
  protected interval() {
    var f = this;
    if (f.stoped) return;
    f.vars.timeoutID = setTimeout(() => {
      if (f.stoped) return;
      f.param.callback();
    }, f.param.duration);
  }
}
//It's just a timer...
class Timer {
  triggers:any = {};
  intervalId:any;
  subscribeEvents:Events;
  constructor() {
    this.triggers.isStarted = false;
    this.start();
  }

  //start, restart
  start() {
    this.pause();

    this.triggers.counted = 0;
    this.triggers.checkpoint = 0;
    this.triggers.pausevalue = 0;
    this.subscribeEvents = new Events();

    this.go();
  }

  //pause
  pause() {
    if (!this.triggers.isStarted) return;
    
    this.triggers.pausevalue = this.ms();
    clearInterval(this.intervalId);
    this.triggers.counted = this.triggers.time;
    
    this.triggers.isStarted = false;
  }

  //continue
  go() {
    var f = this;
    if (this.triggers.isStarted) return;
    
    this.triggers.startpoint = Date.now();
    this.intervalId = setInterval(function() {
      f.subscribeEvents.call(f.ms());
    }, 13);
    
    this.triggers.isStarted = true;
  }

  //show counted time
  ms() {
    if (!this.triggers.isStarted) return this.triggers.pausevalue;
    this.triggers.time = Date.now() - this.triggers.startpoint + this.triggers.counted;
    return this.triggers.time;
  }
  s() {
    return round(this.ms()/1000, 3);
  }

  //show counted time + left time since last checkpoint 
  i() {
    var v:any = {};
    
    v.sec = this.s();
    v.delay = round(v.sec - this.triggers.checkpoint, 3); //v.delay uses new $time
    this.triggers.checkpoint = v.sec; //after v.delay, couse v.delay uses last $checkpoint
    
    v.replay = v.sec + " (+" + v.delay + ") sec";
    return v.replay;
  }

  //subscribe to timer
  subscribe(e:Function) {
    this.subscribeEvents.push(e);
  }
}
export { Arc, Timer, Events, Async, is, not, or, isObject, isNumber, isString, isArray, isFunction, check, rand, randtext, randstr, randstr64, randcolor, round, shuffle, Loading, Interval, Timeout, getCookie, setCookie, delCookie };