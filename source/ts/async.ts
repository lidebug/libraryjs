//Superior Promise
class Async {
  value:any;
  onload:Events;
  constructor() {
    this.onload = new Events();
  }
  then(res:any) {
    this.onload.push(res);
    if (is(this.value)) {
      this.set(this.value);
      this.value = null;
    }
  }
  set(value:any) {
    if (this.onload.events.length > 0) this.onload.call(value);
    else this.value = value;
  }
}