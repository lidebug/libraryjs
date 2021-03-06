//Superior array
class Arc {
  public names:Array<any>;
  public values:Array<any>;
  public length:number = 0;
  public keys:any;

  private id:number;

  constructor() {
    this.names = [];
    this.values = [];
    this.id = 0;
    this.keys = {};
  }

  //Add new element with name
  add(name:string, value:any) {
    if (is(this.keys[name])) {
      this.change(name, value);
      return;
    }
    this.names.push(name);
    this.values.push(value);
    this.length = this.names.length;
    this.keys[name] = this.length - 1; 
  }

  //Get value by name
  value(name:string) {
    return this.values[ this.keys[name] ];
  }

  //Add new unnamed element
  push(value:any) {
    var id:string = "arcUnicId" + this.id++;
    this.add(id, value);
    return id;
  }

  //Change value by name
  change(name:string, value:any) {
    if (not(this.keys[name])) return;
    this.values[ this.keys[name] ] = value;
  }

  //Remote element by name
  remove(name:string) {
    if (not(this.keys[name])) return;
    this.names.splice( this.keys[name], 1 );
    this.values.splice( this.keys[name], 1 );
    this.length = this.names.length;

    delete this.keys[name];
  }

  //Get name by value. Only first occurrence. 
  search(value:any) {
    const i = this.values.indexOf(value);
    if (i === -1) return undefined;
    return this.names[i];
  }

  //Functional for
  forEach(callback:Function) {
    for(let i in this.names) {
      let breakPoint = callback(this.names[i], this.values[i]);
      if (breakPoint === "break") break;
    }
  }

  //Copy Arc
  copy(arc:Arc) {
    this.values = arc.values.slice();
    this.names = arc.names.slice();
    this.length = arc.length;
    this.id = Math.max(this.id, arc.id);
    this.updateKeys();
  }

  //Share values
  share(arc:Arc, names:Array<any>) {
    for(let name of names) {
      arc.add( name, this.values[ this.keys[name] ] );
    }
    arc.id = Math.max(arc.id, this.id);
  }

  //Get string form of all elements
  toString() {
    var trace:string = "";
    for(let i in this.names) {
      trace += `[${this.names[i]}] ${this.values[i]}\n`;
    };
    return trace;
  }

  //Recursive output
  stringify(tab:string="") {
    var trace:string = "";
    for(let i in this.names) {
      trace += `${tab}[${this.names[i]}] `;
      if ( isObject(this.values[i]) ) {
        var classname = this.values[i].constructor.name;
        if (classname === "Arc") trace += "\n" + this.values[i].stringify(tab + "__ ");
        else trace += JSON.stringify(this.values[i]) + "\n";
      }
      else if ( isArray(this.values[i]) ) {
        trace += JSON.stringify(this.values[i]) + "\n";
      }
      else if ( isString(this.values[i]) ) {
        trace += `"${this.values[i]}"\n`;
      }
      else {
        trace += this.values[i] + "\n";
      }
    };
    return trace;
  }

  //Change name of element
  rename(name:string, newname:string) {
    this.add(newname, this.value(name));
    this.remove(name);
  }

  //Reverse Arc
  reverse() {
    this.values.reverse();
    this.names.reverse();
  }

  //Get object form
  object() {
    var object:any = {};
    for(let i in this.names) {
      object[this.names[i]] = this.values[i];
    }
    return object;
  }

  //Import from object form
  importObject(object:any) {
    for(let name in object) {
      this.add(name, object[name]);
    }
  }

  //Get complex array form
  array() {
    var complex = [];
    for(let i in this.names) {
      complex.push({
        name: this.names[i],
        value: this.values[i]
      });
    }
    return complex;
  }

  //Import from array form
  importArray(array:Array<any>) {
    for(let v of array) {
      this.push(v);
    }
  }

  private updateKeys() {
    var keys:any = {};
    for(let i in this.names) {
      keys[this.names[i]] = i;
    }
    this.keys = keys;
  }

  //Sort Arc
  sort(handler:any) {
    var array = this.array();
    array.sort(handler);
    for(let i in array) {
      this.names[i] = array[i].name;
      this.values[i] = array[i].value;
    }
    this.updateKeys();
  }

  //Shuffle Arc
  shuffle() {
    var array = this.array();
    for (let i = array.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
    for(let i in array) {
      this.names[i] = array[i].name;
      this.values[i] = array[i].value;
    }
    this.updateKeys();
  }

  //Concat Arcs
  concat(...arcs:Array<Arc>) {
    for(let arc of arcs) {
      this.names = this.names.concat(arc.names);
      this.values = this.values.concat(arc.values);
      this.id = Math.max(this.id, arc.id);
    }
    this.length = this.names.length;
    this.updateKeys();
  }

}