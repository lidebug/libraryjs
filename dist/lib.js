"use strict";
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
exports.Arc = Arc;
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
exports.Events = Events;
//Is object exist?
function is(obj) {
    if (obj !== null && obj !== undefined) {
        if (typeof (obj) == 'string' || typeof (obj) == 'object' || typeof (obj) == 'number' || typeof (obj) == 'boolean' || typeof (obj) == 'function')
            return true;
        else if (isNaN(obj))
            return false;
        else
            return true;
    }
    else
        return false;
}
exports.is = is;
//Not exist?
function not(obj) {
    return !is(obj);
}
exports.not = not;
//Choose first existing object
function or(array) {
    var k;
    for (k in array) {
        if (is(array[k])) {
            return array[k];
        }
    }
    return null;
}
exports.or = or;
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
exports.rand = rand;
//Print random string
function randtext(len) {
    var trace = "";
    for (var i = 0; i < len; i++) {
        trace += getrandalf();
    }
    ;
    return trace;
}
exports.randtext = randtext;
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
exports.round = round;
//It's just timer...
var Timer = (function () {
    function Timer() {
        this.triggers = {};
        this.triggers.isStarted = false;
        this.triggers.time = 0;
        this.triggers.checkpoint = 0;
        this.start();
    }
    //start, restart
    Timer.prototype.start = function () {
        this.pause();
        this.triggers.time = 0;
        this.triggers.checkpoint = 0;
        this.go();
    };
    //pause
    Timer.prototype.pause = function () {
        if (!this.triggers.isStarted)
            return;
        clearInterval(this.intervalId);
        this.triggers.isStarted = false;
    };
    //continue
    Timer.prototype.go = function () {
        var f = this;
        if (this.triggers.isStarted)
            return;
        this.intervalId = setInterval(function () {
            f.triggers.time++;
        }, 10);
        this.triggers.isStarted = true;
    };
    //show counted time
    Timer.prototype.s = function () {
        return this.triggers.time / 100;
    };
    //show counted time + left time since last checkpoint 
    Timer.prototype.i = function () {
        var v = {};
        v.sec = this.s();
        v.delay = round(v.sec - this.triggers.checkpoint, 4);
        this.triggers.checkpoint = v.sec; //after v.delay, couse v.delay uses last $checkpoint
        v.replay = v.sec + "sec (+" + v.delay + ")";
        return v.replay;
    };
    return Timer;
}());
exports.Timer = Timer;
