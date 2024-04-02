export class Queue<T> {
  #list: T[];
  constructor() {
    this.#list = [];
  }

  inqueue(value: T) {
    this.#list.push(value);
  }

  isEmpty() {
    return this.#list.length === 0;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('큐가 비었습니다.');
    return this.#list.shift();
  }

  getValue() {
    return this.#list[0];
  }
}
