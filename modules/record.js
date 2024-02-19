module.exports = class Record {
    constructor(key, data) {
      this.key = key;
      this.data = data;
    }
  
    getKey() {
      return this.key;
    }
  
    getData() {
      return this.data;
    }
  };