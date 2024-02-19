module.exports = class messages{
    constructor() {
      this.msg = {
        '404': 'Error: 404 Not Found',
        'word_not_found': 'Error: Word not found',
        'request_count': 'Request #%num%',
        'record_added': 'Record added. \nTotal records: %num%. \n%m%',
        'word_already_exists': 'Error: Word already exists'
      };
    }
    error() {
      return this.msg['404'];
    }
    wordNotFound() {
      return this.msg['word_not_found'];
    }
    requestCount(num) {
      return this.msg['request_count'].replace('%num%', num);
    }
    recordAdded(num, m) {
      return this.msg['record_added'].replace('%num%', num).replace('%m%', m);
    }
    wordAlreadyExists() {
      return this.msg['word_already_exists'];
    }
  };