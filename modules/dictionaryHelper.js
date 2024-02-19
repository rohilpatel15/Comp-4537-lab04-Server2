// Import the dictionary class and the messages class
const Dictionary = require('./dictionary');
const messages = require('../lang/en/user/messages');

// This class defines helper functions for each word
module.exports = class DictionaryHelper {
  constructor() {
    this.dictionary = {};
    this.msg = new messages();
  }

  addWord(key, data) {
    if (key in this.dictionary) {
      return this.msg.wordAlreadyExists();
    }
    this.dictionary[key] = new Dictionary(key, data);
    return this.msg.wordAdded(Object.keys(this.dictionary).length, 
    key + ' : ' + this.dictionary[key].getDefinition());
  }

  getWord(key) {
    if (!this.dictionary[key]) {
      return this.msg.wordNotFound();
    }
    return JSON.stringify({ 'definition':this.dictionary[key].getDefinition()});
  }

  getDictionary() {
    return this.dictionary;
  }

};