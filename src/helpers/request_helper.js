const RequestHelper = function (url) {
  this.url = url
}

RequestHelper.prototype.get = function (onComplete) {
  return fetch(this.url)
    .then((res) => res.json());
};

module.exports = RequestHelper;
