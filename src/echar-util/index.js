class VersionedArray extends Array {
    constructor() {
      super();
      this.history = [[]];
    }
    commit() {
        let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
        const [a, ...b] = [1, 2, 3];
      this.history.push(this.slice());
    }
    revert() {
        let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
      this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
  }
  export default VersionedArray