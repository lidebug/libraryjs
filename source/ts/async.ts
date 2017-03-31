//Superior Promise
class Async<T> {
  value:T;
  onload:Events;
  constructor(private param:any = {}) {
    if (not(this.param.disposable)) this.param.disposable = false;
    this.onload = new Events();
  }
  then(res:Function) {
    this.onload.push(res);
    if (is(this.value)) res(this.value);
  }
  set(value:T) {
    this.value = value;
    this.onload.call(value);
    if (this.param.disposable) this.onload = new Events();
  }
}