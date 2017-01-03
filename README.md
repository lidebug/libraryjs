# Library js v1.0.3

Set of javascript classes & function, which can be used in work process
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

### Timer
It's just timer...
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
is(NaN); //true
is(0); //true
is(""); //true
is([]); //true
is("hello"); //true
```

### not()
Not exist?
```javascript
not(undefined); //true
```

### or()
It chooses first existing object

### rand()
More simple random function
```javascript
var r = rand(1, 10);
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