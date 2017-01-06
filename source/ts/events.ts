//Easy way to call lots of functions
class Events {
  events:Arc<Function>;
  constructor() {
    this.events = new Arc();
  }

  add(name:string, event:Function) {
    this.events.add(name, event);
  }

  push(event:Function) {
    return this.events.push(event);
  }

  del(name:string) {
    if (not(name)) return;
    this.events.del(name);
  }

  call(param?:any) {
    var k;
    for(k in this.events.array) {
      this.events.value(k)(param);
    }
  }
}
