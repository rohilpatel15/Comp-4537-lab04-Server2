// This class defines the dictionary
module.exports = class Dictionary {
    constructor(words, def) {
      this.words = words;
      this.def = def;
    }
  
    getDefinition() {
      return this.def;
    }
  };