//Superior array
var Arc = (function () {
    function Arc() {
        this.array = {};
        this.length = 0;
        this.id = 0;
    }
    Arc.prototype.add = function (name, value) {
        if (not(this.array[name]))
            this.length++;
        this.array[name] = value;
    };
    Arc.prototype.push = function (value) {
        var id = "arcUnicId" + this.id;
        this.id++;
        this.add(id, value);
        return id;
    };
    Arc.prototype.value = function (name) {
        return this.array[name];
    };
    Arc.prototype.del = function (name) {
        if (is(this.array[name]))
            this.length--;
        this.array[name] = null;
        delete this.array[name];
    };
    Arc.prototype.search = function (value) {
        var valueLocal;
        for (var i in this.array) {
            valueLocal = this.value(i);
            if (valueLocal == value)
                return i;
        }
        ;
    };
    Arc.prototype.toString = function () {
        var trace = "";
        for (var i in this.array) {
            trace += "[" + i + "] " + this.value(i) + "\n";
        }
        ;
        return trace;
    };
    return Arc;
}());
//Superior Promise
var Async = (function () {
    function Async() {
        this.onload = new Events();
    }
    Async.prototype.then = function (res) {
        this.onload.push(res);
        if (is(this.value))
            res(this.value);
    };
    Async.prototype.set = function (value) {
        this.value = value;
        this.onload.call(value);
    };
    return Async;
}());
//Easy way to check that any parameters aren't set.
function check(list) {
    if (not(list))
        return false;
    if (not(list.length))
        return false;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var items = list_1[_i];
        if (not(items))
            return false;
        if (not(items.length))
            return false;
        var parent = items[0];
        if (not(parent))
            return false;
        for (var i = 1; i < items.length; i++) {
            parent = parent[items[i]];
            if (not(parent))
                return false;
        }
    }
    return true;
}
//Easy way to call lots of functions
var Events = (function () {
    function Events() {
        this.events = new Arc();
    }
    Events.prototype.add = function (name, event) {
        this.events.add(name, event);
    };
    Events.prototype.push = function (event) {
        return this.events.push(event);
    };
    Events.prototype.del = function (name) {
        if (not(name))
            return;
        this.events.del(name);
    };
    Events.prototype.call = function (param) {
        var k;
        for (k in this.events.array) {
            this.events.value(k)(param);
        }
    };
    return Events;
}());
//Is object exist?
function is(obj) {
    if (obj === null || obj === undefined)
        return false;
    else
        return true;
}
//Not exist?
function not(obj) {
    return !is(obj);
}
//Choose first existing object
function or(list) {
    for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
        var value = list_2[_i];
        if (is(value))
            return value;
    }
    return null;
}
//More simple random function
function rand(a, b) {
    var c;
    var d;
    c = b - a;
    if (c < 0)
        return -1;
    d = Math.random() * c;
    d = Math.round(d);
    d += a;
    return d;
}
//Print random string
function randtext(len) {
    var trace = "";
    for (var i = 0; i < len; i++) {
        trace += getrandalf();
    }
    ;
    return trace;
}
function getrandalf() {
    var a = rand(0, 25);
    var alf = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return alf[a];
}
//Superior round function
function round(n, e) {
    var p;
    p = Math.pow(10, e);
    return Math.round(n * p) / p;
}
//It's just a timer...
var Timer = (function () {
    function Timer() {
        this.triggers = {};
        this.triggers.isStarted = false;
        this.start();
    }
    //start, restart
    Timer.prototype.start = function () {
        this.pause();
        this.triggers.counted = 0;
        this.triggers.checkpoint = 0;
        this.triggers.pausevalue = 0;
        this.subscribeEvents = new Events();
        this.go();
    };
    //pause
    Timer.prototype.pause = function () {
        if (!this.triggers.isStarted)
            return;
        this.triggers.pausevalue = this.ms();
        clearInterval(this.intervalId);
        this.triggers.counted = this.triggers.time;
        this.triggers.isStarted = false;
    };
    //continue
    Timer.prototype.go = function () {
        var f = this;
        if (this.triggers.isStarted)
            return;
        this.triggers.startpoint = Date.now();
        this.intervalId = setInterval(function () {
            f.subscribeEvents.call(f.ms());
        }, 13);
        this.triggers.isStarted = true;
    };
    //show counted time
    Timer.prototype.ms = function () {
        if (!this.triggers.isStarted)
            return this.triggers.pausevalue;
        this.triggers.time = Date.now() - this.triggers.startpoint + this.triggers.counted;
        return this.triggers.time;
    };
    Timer.prototype.s = function () {
        return round(this.ms() / 1000, 3);
    };
    //show counted time + left time since last checkpoint 
    Timer.prototype.i = function () {
        var v = {};
        v.sec = this.s();
        v.delay = round(v.sec - this.triggers.checkpoint, 3); //v.delay uses new $time
        this.triggers.checkpoint = v.sec; //after v.delay, couse v.delay uses last $checkpoint
        v.replay = v.sec + " (+" + v.delay + ") sec";
        return v.replay;
    };
    //subscribe to timer
    Timer.prototype.subscribe = function (e) {
        this.subscribeEvents.push(e);
    };
    return Timer;
}());
