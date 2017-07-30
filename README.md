# Library js
### v4.0.0 ( last update: 30 jul 20177 )

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
var list = new Arc();
var dogid = list.push(  "dog"  );
list.add( "garfield",   "cat"  );
list.add( "ara",        "bird" );
list.push(              "fish" );
console.log(list.toString());

list.remove(dogid);
list.remove("garfield");
list.change("ara", "parrot");
console.log(list.toString());
```
Looping
```javascript
var list = new Arc();

list.add("string name 1", "string 1" );
list.add("string name 2", "string 2" );
list.push(                "string 3" );
list.push(                "string 4" );

for(let i in list.names) {
  console.log(list.names[i] + ", " + list.values[i]);
  if (list.values[i] === "string 3") break;
}
```
forEach
```javascript
var list = new Arc();

list.add("string name 1", "string 1" );
list.add("string name 2", "string 2" );
list.push(                "string 3" );
list.push(                "string 4" );

list.forEach(( name, value ) => {
  console.log(name + ", " + value);
  if (value === "string 3") return "break"; //break loop
});
```
search()
```javascript
var list = new Arc();

list.add("string name 1", "string 1" );
list.add("string name 2", "string 2" );
list.add("string name 3", "string 3" );

var name = list.search("string 2"); // name = "string name 2"
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
Superior Promise
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
  console.log("everything is done!");
});

loading.add();
setTimeout(function() {
  loading.done();
}, 3000);

loading.add();
setTimeout(function() {
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

### check()
Easy way to check that any parameters aren't set.
Example:
```javascript
function somefunction(attr) {
  if (!check([ [attr, "background"] ])) {
    console.log("Error. Some parameters aren't set.");
    return;
  }
  
  console.log("Oh right!");
}

somefunction({ bg: "green" });
```

And more complicated example:
```javascript
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