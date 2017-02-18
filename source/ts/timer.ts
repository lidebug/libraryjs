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