class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList {
  constructor(usedFor) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.usedFor = usedFor;
  }

  addBack(data) {
    let node = new Node(data);
    if (this.head == null) this.head = node;
    else {
      let curr = this.head;
      while (curr.next) curr = curr.next;
      curr.next = node;
    }
    this.tail = node;
    this.size += 1;
  }

  addFront(data) {
    let node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.size += 1;
  }

  isEmpty() {
    return this.head == null;
  }

  removeBack() {
    if (this.isEmpty()) return;
    let prev = this.head;
    let curr = prev.next;
    if (curr == null) {
      this.head = null;
      this.tail = null;
      return;
    }
    while (curr.next) {
      prev = curr;
      curr = curr.next;
    }
    prev.next = null;
    this.tail = prev;
    this.size -= 1;
  }

  removeFront() {
    if (this.isEmpty()) return;
    let curr = this.head;
    if (curr.next == null) {
      this.head = null;
      this.tail = null;
      return;
    }
    this.head = curr.next;
    this.size -= 1;
  }

  getBack() {
    if (this.isEmpty()) return;
    return this.tail.data;
  }

  getFront() {
    if (this.isEmpty()) return;
    return this.head.data;
  }

  serialize(head = this.head) {
    let curr = head;
    let list = [];
    while (curr) {
      list.push({ ...curr.data });
      curr = curr.next;
    }
    if (this.usedFor !== "Stack") list.push({ value: "NULL", id: "id-null" });
    return list;
  }

  deSerialize(list) {
    list.map((item) => this.addBack(item));
    return this.head;
  }

  selectNode = (node) => (node.data.style = "yellowNode");

  unselectNode = (node) => (node.data.style = "greyNode");

  traversedNode = (node) => (node.data.style = "blueNode");

  fastNode = (node) => (node.data.style = "greenNode");

  reverseLinkedList() {
    let list = [];
    let result = [];
    let curr = this.head;
    let prev = null;
    while (curr) {
      if (curr) this.selectNode(curr);
      list.push(this.serialize(curr));
      result.push(this.serialize(prev));
      let tmp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = tmp;
      if (prev) {
        this.selectNode(prev);
        if (prev.next) this.traversedNode(prev.next);
      }
    }
    if (prev) this.traversedNode(prev);
    list.push(this.serialize(curr));
    result.push(this.serialize(prev));
    return { list, result };
  }

  findMiddle() {
    let result = [];
    let slow = this.head;
    let fast = this.head;
    while (fast && fast.next) {
      this.selectNode(slow);
      this.fastNode(fast);
      result.push(this.serialize());
      this.unselectNode(slow);
      this.unselectNode(fast);
      slow = slow.next;
      fast = fast.next.next;
    }
    this.traversedNode(slow);
    this.fastNode(fast);
    result.push(this.serialize());
    this.unselectNode(slow);
    this.unselectNode(fast);
    return result;
  }
}
