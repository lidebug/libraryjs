//Superior Promise
class Async {
  value:any;
  onload:Events;
  constructor() {
    this.onload = new Events();
  }
  then(res:any) {
    this.onload.push(res);
    if (is(this.value)) res(this.value);
  }
  set(value:any) {
    this.value = value;
    this.onload.call(value);
  }
}