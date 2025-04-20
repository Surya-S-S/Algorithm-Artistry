import { LinkedList } from "./LinkedList";

export class Stack {
  constructor() {
    this.ll = new LinkedList("Stack");
  }

  push = (data) => this.ll.addFront(data);

  top = () => this.ll.getFront();

  pop = () => this.ll.removeFront();

  isEmpty = () => this.ll.isEmpty();

  serialize = () => this.ll.serialize();
}
