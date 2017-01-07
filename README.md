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
  msg.set("Haha!");
}, 3000);

msg.then(function(res) { console.log(res) });
```

### Timer
It's just a timer...
```javascript
var timer = new Timer();
timer.start();

// ...

console.log(timer.i());
timer.pause();
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

### not()
Not exist?
```javascript
not(undefined); //true
```

### or()
It chooses first existing object
```javascript
var c = or([null, null, undefined, 72, 12, null, "hi"]); //c = 72
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