const record = require('./record');
const messages = require('../lang/en/user/user_msg');
module.exports = class RecordManager {
  constructor() {
    this.dictionary = {};
    this.msg = new messages();
  }

  addRecord(key, data) {
    if (key in this.dictionary) {
      return this.msg.wordAlreadyExists();
    }
    this.dictionary[key] = new record(key, data);
    return this.msg.recordAdded(Object.keys(this.dictionary).length, key + ' : ' + this.dictionary[key].getData());
  }

  getRecord(key) {
    if (!this.dictionary[key]) {
      return this.msg.wordNotFound();
    }
    return JSON.stringify({ 'definition':this.dictionary[key].getData()});
  }

  getRecords() {
    return this.dictionary;
  }

};