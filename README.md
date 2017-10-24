# Library js
### v5.2.0 ( last update: 24 oct 2017 )

Set of javascript classes & functions, which can be used in work process. Typescript versions included.

### Install
npm
```javascript
npm i libraryjs --save
```

Node.js
```javascript
var { Arc, Events, ... } = require("libraryjs");
```

Typescript
```javascript
import { Arc, Events, ... } from "libraryjs";
```

Browser
```javascript
<script src="/node_modules/libraryjs/dist/lib.source.js"></script>
```

### Arc
Superior array
```javascript
var arc = new Arc();
var dogid = arc.push(  "dog"  );
arc.add( "garfield",   "cat"  );
arc.add( "ara",        "bird" );
arc.push(              "fish" );
console.log(arc.stringify());

arc.remove(dogid);
arc.remove("garfield");
arc.change("ara", "parrot");
console.log(arc.stringify());
```
Looping
```javascript
var arc = new Arc();

arc.add("string name 1", "string 1" );
arc.add("string name 2", "string 2" );
arc.push(                "string 3" );
arc.push(                "string 4" );

for(let i in arc.names) {
  console.log(arc.names[i] + ", " + arc.values[i]);
  if (arc.values[i] === "string 3") break;
}
```
forEach
```javascript
var arc = new Arc();

arc.add("string name 1", "string 1" );
arc.add("string name 2", "string 2" );
arc.push(                "string 3" );
arc.push(                "string 4" );

arc.forEach(( name, value ) => {
  console.log(name + ", " + value);
  if (value === "string 3") return "break"; //break loop
});
```
search()
```javascript
var arc = new Arc();

arc.add("string name 1", "string 1" );
arc.add("string name 2", "string 2" );
arc.add("string name 3", "string 3" );

var name = arc.search("string 2"); // name = "string name 2"
```
import from array and object
```javascript
var array = [1,2,3,4,5,6];
var arc1 = new Arc();
arc1.importArray(array);

var object = {
  name: "mike",
  age: 35
};
var arc2 = new Arc();
arc2.importObject(object);

console.log(arc1.stringify());
console.log(arc2.stringify());
```
copy() & share()
```javascript
var arc1 = new Arc();

name1 = arc1.push("bob1");
name2 = arc1.push("bob2");
name3 = arc1.push("bob3");
name4 = arc1.push("oleg");
name5 = arc1.push("mike");

var arc2 = new Arc();
arc1.share(arc2, [ name2, name3 ]); // arc1 -> arc2
console.log(arc2.stringify());

var arc3 = new Arc();
arc3.copy(arc1); // arc3 <- arc1
console.log(arc3.stringify());
```
Two way binding
```javascript
var arc = new Arc();
arc.add("man1", "Mike");
arc.add("man2", "Sam");

arc.values[ arc.keys["man2"] ] = "Bob";
//But you can't do like that: arc.value("man2") = "Bob";
```
How to output Arc
```javascript
console.log( arc.toString() ); // without recursion
console.log( arc.stringify() ); // with recursion
```
Sort
```javascript
var arc = new Arc();
for(let i=0; i<20; i++) {
  arc.add( "name"+i, rand(1, 200) );
}

console.log(arc.stringify());
arc.sort((a, b) => {
  //you are able to use a.name & a.value
  if (a.value < b.value) return -1;
  else if (a.value > b.value) return 1;
  else return 0;
});
console.log(arc.stringify());
```
Other methods
```javascript
arc.rename(name1, name2); // Rename element
arc.reverse(); // Reverse Arc
arc.shuffle(); // Shuffle Arc
arc.object(); // Return object form
arc.array(); // Return Array form
arc.concat(arc1, arc2, arc3, ...); // Concat Arcs
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
is(false); //true
is("hello"); //true
```

Check types
```javascript
isFunction(function() {}); //true
isArray([ 1, 2, 3 ]); //true
isObject({ age: 99 }); //true
isNumber(122); //true
isString("deal with it"); //true
isBoolean(false); //true
```

### not()
Not exist?
```javascript
not(undefined); //true
//not(var) = !is(var)
```

### or()
It chooses first existing object
```javascript
var c = or(null, null, undefined, 72, 12, null, "hi"); //c = 72
```

### Events
Easy way to run lots of functions
```javascript
var events = new Events();
events.push(() => { console.log("fun 1"); });
events.push(() => { console.log("fun 2"); });
events.push(() => { console.log("fun 3"); });

// ...

events.run();
```
Run with id
```javascript
var events = new Events();

//Example of function, which could unsubscribe itself
var callback = (id) => {
  console.log(id);
  events.remove(id);
};

events.push(callback);
events.push(callback);
events.push(callback);

// ...

events.idrun();
```

Custom launch
```javascript
var events = new Events();
var fun1 = events.push(() => { console.log("fun 1"); });
var fun2 = events.push(() => { console.log("fun 2"); });
var fun3 = events.push(() => { console.log("fun 3"); });

events.pick(fun2);
```

### Async
Superior Promise. You can "resolve" async in any place in your code. And as much times as needed.
```javascript
var msg = new Async();

setTimeout(() => {
  msg.set("Good news!");
}, 2000);

msg.then((res) => { console.log(res) });

setTimeout(() => {
  msg.set("Hello!");
}, 1000);
```
When you need use it just once
```javascript
var msg = new Async({ disposable: true }); //disposable default is false

msg.then((res) => { console.log(res) });

setTimeout(() => {
  msg.set("It works!");
}, 100);
setTimeout(() => {
  msg.set("useless..."); //The code will not be run
}, 200);
```

### Errors
Errors manager
```javascript
var errors = new Errors();

errors.addError("Error message 1");
errors.addError("Error message 2");
errors.addError("Error message 3");

if (errors.exists) {
  console.log(errors.getErrors());
}
```

With error code
```javascript
var errors = new Errors();
errors.addError("There is no pizza...", "pizzaError");
errors.addError("Error message");

// ...

if (errors.checkError("pizzaError")) {
  console.log(errors.getErrors());
}
```

When you need to post by http without methods.
```javascript
var errors = new Errors();
errors.addError("Error message 1");
errors.addError("Error message 2");

send(errors);

function send(errors) {
  // Here could be real POST request
  receive(errors.exportErrors());
}
function receive(res) {
  var errors = new Errors();
  errors.importErrors(res);

  console.log(errors.getErrors());
}
```

### Timer
It's just a timer.
```javascript
var timer = new Timer();
timer.start();

// ...

console.log(timer.ms()); //counted time in milliseconds
console.log(timer.s()); //counted time in seconds
console.log(timer.i()); //counted time in seconds + left time since last checkpoint 
timer.stop();
```
Example
```javascript
var timer = new Timer();
timer.start();
console.log("start: " + timer.i());

setTimeout(() => {
  console.log("checkpoint 1: " + timer.i());
}, 200);
setTimeout(() => {
  console.log("checkpoint 2: " + timer.i());
  timer.stop(); // stop counting after that
}, 400);
setTimeout(() => {
  console.log("checkpoint 3: " + timer.i());
}, 600);
```
How to restart
```javascript
var timer = new Timer();
timer.start();

// ...

timer.restart();
```

### Loading
When you have to wait a lot of callbacks
```javascript
var loading = new Loading(() => {
  console.log("everything is done!");
});

loading.add();
setTimeout(() => {
  loading.done();
}, 3000);

loading.add();
setTimeout(() => {
  loading.done();
}, 2000);

loading.start();
```

### Interval and Timeout
Superior setInterval and setTimeout
```javascript
var interval = new Interval(100, () => {
  console.log("delay 100");
});

var timeout = new Timeout(1000, () => {
  interval.stop();
});
```

### check()
Easy way to check that any parameters aren't set.
Example:
```javascript
somefunction({ bg: "green" });

function somefunction(attr) {
  if (!check([ [attr, "background"] ])) {
    console.log("Error. Some parameters aren't set.");
    return;
  }
  
  console.log("Oh right!");
}
```

And more complicated example:
```javascript
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

function somefunction(person, name, product) {
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
  console.log("Oh right!");
}
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

### randstr() & randstr64()
It prints random string
```javascript
var str = randstr(15); // str = nn3wsq20p7azwsd
var str = randstr64(15); // str = Ttip2sl_JCW4uo9
```

### randtext()
It prints random text
```javascript
var text = randtext(5); // text = fywet
```

### shuffle()
It makes a array randomized
```javascript
var array = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
shuffle(array);
console.log(array); // [ 8, 3, 4, 2, 1, 5, 9, 6, 7 ]
```

### Cookie
Functions for working with cookie
```javascript
setCookie("volume", 85);
var cookie = getCookie("volume"); // cookie = 85
delCookie("volume");
```