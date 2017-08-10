//It's just a timer...
class Timer {
  checkpoints:Array<any>;
  isStarted:boolean;
  last:number;
  constructor() {
    this.restart();
  }
  restart() {
    this.checkpoints = [];
    this.isStarted = false;
  }
  start() {
    if (this.isStarted) return;
    this.isStarted = true;
    this.checkpoints.push( Date.now() );
  }
  stop() {
    if (!this.isStarted) return;
    this.isStarted = false;
    this.checkpoints.push( Date.now() );
  }

  ms() {
    var now = Date.now();
    var pauseTime = false;
    var ms = 0;
    for(let key in this.checkpoints) {
      let i:number = parseInt(key);
      if (pauseTime) {
        ms += this.checkpoints[i] - this.checkpoints[ i-1 ];
      }
      pauseTime = !pauseTime;
    }
    if (pauseTime) {
      ms += now - this.checkpoints[ this.checkpoints.length-1 ];
    }
    return ms;
  }
  s() {
    var ms = this.ms();
    return round(ms/1000, 3);
  }
  delay(sec) {
    if (not(this.last)) return 0;
    return round(sec - this.last, 3);
  }
  i() {
    var sec = this.s();
    var delay:number, 
    
    delay = this.delay(sec);

    var info:string = sec + "";
    if (is(this.last)) info += " (+" + delay + ") sec";
    this.last = sec;
    
    return info;
  }
}