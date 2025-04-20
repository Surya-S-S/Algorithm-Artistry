import { LinkedList } from "./LinkedList";

export class Queue {
  constructor() {
    this.ll = new LinkedList("Queue");
  }

  push = (data) => this.ll.addBack(data);

  front = () => this.ll.getFront();

  pop = () => this.ll.removeFront();

  isEmpty = () => this.ll.isEmpty();

  serialize = () => this.ll.serialize();

  size = () => this.ll.size;
}
