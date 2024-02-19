module.exports = class messages{
    constructor() {
      this.msgList = {
        '404': 'Error: 404 Not Found',
        'word_not_found': 'Error: Word not found',
        'request_count': 'Request #%num%',
        'word_added': 'Word added. \nTotal words: %num%. \n%m%',
        'word_already_exists': 'Error: Word already exists'
      };
    }
    error() {
      return this.msgList['404'];
    }
    wordNotFound() {
      return this.msgList['word_not_found'];
    }
    requestCount(num) {
      return this.msgList['request_count'].replace('%num%', num);
    }
    wordAdded(num, m) {
      return this.msgList['word_added'].replace('%num%', num).replace('%m%', m);
    }
    wordAlreadyExists() {
      return this.msgList['word_already_exists'];
    }
  };