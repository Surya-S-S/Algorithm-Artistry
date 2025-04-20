export class List {
  constructor(type) {
    this.arr = [];
    this.type = type;
  }

  addBack = (data) => this.arr.push(data);

  serialize = () => JSON.stringify(this.arr);

  length = () => this.arr.length;

  select = (index) => (this.arr[index].style = "yellow" + this.type);

  unselect = (index) => (this.arr[index].style = "grey" + this.type);

  swap = (x, y) => {
    let tmp = this.arr[x];
    this.arr[x] = this.arr[y];
    this.arr[y] = tmp;
  };

  swapped = (index) => (this.arr[index].style = "red" + this.type);

  sorted = (index) => (this.arr[index].style = "blue" + this.type);

  pivot = (index) => (this.arr[index].style = "green" + this.type);

  selectLeft = (index) => (this.arr[index].style = "yellow" + this.type);

  selectRight = (index) => (this.arr[index].style = "green" + this.type);

  mark = (index) => (this.arr[index].style = "red" + this.type);

  matched = (index) => (this.arr[index].style = "blue" + this.type);

  unmatched = (index) => (this.arr[index].style = "red" + this.type);
}
