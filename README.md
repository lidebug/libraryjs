# Library js

Set of javascript classes & functions, which can be used in work process
Plus typescript converter and concatenation.

### Arc
Superior array
```javascript
var list = new Arc();
var dogid = list.push("dog");
list.add("garfield", "cat");
list.push("fish");
console.log(list.toString());

list.del(dogid);
list.del("garfield");
console.log(list.toString());
```

### Events
Easy way to call lots of functions
```javascript
var events = new Events();
events.push(function() { console.log("fun 1"); });
events.push(function() { console.log("fun 2"); });
events.push(function() { console.log("fun 3"); });

// ...

events.call();
```

### Async
Superior Promise
```javascript
var msg = new Async();

setTimeout(function() {
  msg.set("Good news!");
}, 2000);

msg.then(function(res) { console.log(res) });

setTimeout(function() {
  msg.set("Hello!");
}, 1000);
```
When you need use it just once
```javascript
var msg = new Async({ disposable: true }); //disposable default is false

msg.then(function(res) { console.log(res) });

setTimeout(function() {
  msg.set("It work!");
}, 100);
setTimeout(function() {
  msg.set("useless..."); //The code will not be run
}, 200);
```

### Timer
It's just a timer...
```javascript
var timer = new Timer();
timer.start();

// ...

console.log(timer.ms()); //counted time in milliseconds
console.log(timer.s()); //counted time in seconds
console.log(timer.i()); //counted time in seconds + left time since last checkpoint 
timer.pause();
```
You can also subscribe to time counting
```javascript
var timer = new Timer();
timer.start();
timer.subscribe(ms => {
  console.log(ms);
  console.log(timer.i());
});

setTimeout(() => { timer.pause(); }, 1000);
```

### Loading
When you have to wait a lot of callbacks
```javascript
var loading = new Loading(() => {
  //when all loading.done() will be done, this code run.
  //( the code runs only after loading.start() )
  console.log("everything is done!");
});

loading.add(); // +1 waiting
setTimeout(function() {

  // ...
  
  loading.done(); // the waiting is done
}, 1000);
//( amount of loading.add() equel amount of loading.done() )

loading.add();
setTimeout(function() {
  // ...
  loading.done();
}, 2000);

loading.add();
setTimeout(function() {
  // ...
  loading.done();
}, 3000);

loading.start(); //after all loading.add() we can use loading.start()
```

### Interval and Timeout
Default setInterval has problems when it works with some frameworks. (example: angular2)
So it's superior setInterval and setTimeout
```javascript
var interval = new Interval(100, () => {
  console.log("delay 100");
});

var timeout = new Timeout(1000, () => {
  interval.stop();
});
```

### is()
Is object exist?
```javascript
is(null); //false
is(undefined); //false
is(NaN); //false
is(0); //true
is(""); //true
is([]); //true
is({}); //true
is("hello"); //true
```

Check types
```javascript
isFunction(function() {}); //true
isArray([ 1, 2, 3 ]); //true
isObject({ age: 99 }); //true
isNumber(122); //true
isString("deal with it"); //true
```

### not()
Not exist?
```javascript
not(undefined); //true
```

### or()
It chooses first existing object
```javascript
var c = or(null, null, undefined, 72, 12, null, "hi"); //c = 72
```

### check()
Easy way to check that any parameters aren't set.
```javascript
function somefunction(person, name, product, itsNotNecessary) {
  if (!check([
    [person, "age"],
    [name],
    [product, "body", "name"],
    [product, "body", "charge"],
    [product, "body", "type"]
  ])) {
    console.log("Error. Some parameters aren't set.");
    return;
  }
  //"itsNotNecessary" is optional variable
  console.log("Oh right!");
}

somefunction(
  {
    age: 35,
    something: "random text" //optional variable
  },
  "Arnold",
  {
    body: {
      name: "pizza",
      charge: "5$",
      type: "margherita",
      itsNotNecessaryToo: "i don't care" //optional variable
    }
  }
);
```

### rand()
More simple random function
```javascript
var r = rand(1, 10); //r = 7
var r = rand(1, 10); //r = 1
var r = rand(1, 10); //r = 6
var r = rand(1, 10); //r = 10
```

### round()
Superior round function
```javascript
var r = round(3.14159265, 2); // r = 3.14
var r = round(3.14159265, 0); // r = 3
```

### randtext()
It prints random string
```javascript
var str = randtext(3); // str = fyw
var str = randtext(3); // str = hoi
var str = randtext(3); // str = qqj
```

### shuffle()
It makes a array randomized
```javascript
var array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
shuffle(array);
console.log(array); // [ 8, 3, 4, 2, 1, 5, 9, 6, 7 ]
```