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