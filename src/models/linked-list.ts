export interface Node {
  value: number;
  next: Node;
  previous: Node;
}

export class LinkedList {
  public head: Node = null;
  public tail: Node = null;
  public length = 0;

  constructor() {

  }

  public push(value) {
    const head = this.head;
    if (head) {
      const next = { value: value, previous: this.tail, next: undefined };
      this.tail.next = next;
      this.tail = next;
    } else {
      this.head = { value: value, previous: undefined, next: undefined };
      this.tail = this.head;
    }
    this.length++;
  }
  public popFirst() {
    if (this.length === 0) {
      return undefined;
    }
    this.head = this.head.next;
    if (this.head) {
      this.head.previous = undefined;
    } else {
      this.tail = undefined;
    }
    this.length--;
    return this.head;
  }
}
