//Easy way to call lots of functions
class Events {
  events:Arc;
  constructor() {
    var f = this;
    f.events = new Arc();
  }

  add(id:string, event:Function) {
    var f = this;
    f.events.add(id, event);
  }

  push(event:Function) {
    var f = this;
    return f.events.push(event);
  }

  remove(id:string) {
    var f = this;
    if (not(id)) return;
    f.events.remove(id);
  }

  pick(id:string, param?:any) {
    var f = this;
    f.events.value(id)(param);
  }

  idpick(id:string, param?:any) {
    var f = this;
    f.events.value(id)(id, param);
  }

  run(param?:any) {
    var f = this;
    for(let id in f.events.array) {
      f.pick(id, param);
    }
  }

  idrun(param?:any) {
    var f = this;
    for(let id in f.events.array) {
      f.idpick(id, param);
    }
  }
}
