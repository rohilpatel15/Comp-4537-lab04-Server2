module.exports = class Dictionary {
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