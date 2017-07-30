//Superior array
class Arc {
  public names:Array<any>;
  public values:Array<any>;
  public length:number;

  private id:number;

  constructor() {
    var f = this;

    f.names = [];
    f.values = [];
    f.id = 0;
  }

  //Add new element with name
  add(name:string, value:any) {
    var f = this;
    if (f.names.indexOf(name) !== -1) {
      f.change(name, value);
      return;
    }
    f.names.push(name);
    f.values.push(value);
  }

  //Add new unnamed element
  push(value:any) {
    var f = this;
    var id:string = "arcUnicId" + f.id;
    f.id++;
    f.add(id, value);
    return id;
  }

  //Get value by name
  value(name:string) {
    var f = this;
    const i = f.names.indexOf(name);
    if (i === -1) return undefined;
    return this.values[i];
  }

  //Change value by name
  change(name:string, value:any) {
    var f = this;
    const i = f.names.indexOf(name);
    if (i === -1) return;
    this.values[i] = value;
  }

  //Remote element by name
  remove(name:string) {
    var f = this;
    const i = f.names.indexOf(name);
    if (i === -1) return;
    f.names.splice(i,1);
    f.values.splice(i,1);
  }

  //Get name by value. Only first occurrence. 
  search(value:any) {
    var f = this;
    const i = f.values.indexOf(value);
    if (i === -1) return undefined;
    return f.names[i];
  }

  //Function for
  forEach(callback:Function) {
    var f = this;
    for(let i in f.names) {
      let breakPoint = callback(f.names[i], f.values[i]);
      if (breakPoint === "break") break;
    }
  }

  //Get object form. Could be used with 'for'
  object() {
    var f = this;
    var object:any = {};
    for(let i in this.names) {
      object[f.names[i]] = f.values[i];
    }
    return object;
  }

  //Get key of element by name
  key(name:string) {
    var f = this;
    const i = f.names.indexOf(name);
    if (i === -1) return undefined;
    return i;
  }

  //Get string form of all elements
  toString() {
    var f = this;
    var trace:string = "";
    for(let i in this.names) {
      trace += `[${f.names[i]}] ${f.values[i]}\n`;
    };
    return trace;
  }

}