export class ListLoop<T> {
  constructor(public list: T[] = [], public count: number = 1, public index: number = 0) {
    this.list = list;
    this.count = count;
    this.index = index;
  }
  get total() {
    return this.list ? this.list.length : 0;
  }
  lastRound() {
    return (this.index = (this.index - this.count + this.list.length) % this.list.length);
  }
  nextRound() {
    return (this.index = (this.index + this.count + this.list.length) % this.list.length);
  }
  get currentRoundList() {
    let list = [];
    if (this.count > this.list.length) {
      list = this.list;
    } else {
      list = this.list.slice(this.index, this.index + this.count);
      if (list.length < this.count) {
        list = list.concat(this.list.slice(0, this.count - list.length));
      }
    }
    return list;
  }
}
