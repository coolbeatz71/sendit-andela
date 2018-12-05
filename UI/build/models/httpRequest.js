'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpRequest = function () {
  function HttpRequest() {
    _classCallCheck(this, HttpRequest);
  }

  _createClass(HttpRequest, null, [{
    key: 'getWithHeader',

    /**
     * send a GET http request with Authorization header
     * @param  string url
     * @param  string headerValue
     * @return Promise
     */
    value: function getWithHeader(url, headerValue) {
      var _this = this;

      this.url = url;
      this.headerValue = headerValue;

      // return a promise
      return new Promise(function (resolve, reject) {
        var request = new Request(_this.url, {
          headers: new Headers({
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: 'Bearer ' + _this.headerValue
          })
        });

        fetch(request).then(function (response) {
          response.json();
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    /**
     * send a POST http request without Authorization header
     * @param  string url
     * @param  object data
     * @return Promise
     */

  }, {
    key: 'post',
    value: function post(url, data) {
      var _this2 = this;

      this.url = url;
      this.data = data;

      // return a promise
      return new Promise(function (resolve, reject) {
        var options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
          },
          body: JSON.stringify(data)
        };

        fetch(_this2.url, options).then(function (response) {
          response.json();
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    /**
     * send a POST http request Authorization header
     * @param  string url
     * @param  object data
     * @param  string headerValue
     * @return Promise
     */

  }, {
    key: 'postWithHeader',
    value: function postWithHeader(url, data, headerValue) {
      var _this3 = this;

      this.url = url;
      this.data = data;
      this.headerValue = headerValue;

      // return a promise
      return new Promise(function (resolve, reject) {
        var options = {
          method: 'post',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: 'Bearer ' + _this3.headerValue
          },
          body: JSON.stringify(data)
        };

        fetch(_this3.url, options).then(function (response) {
          response.json();
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }

    /**
     * send a PUT http request with Authorization header
     * @param  {[type]} url  [description]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */

  }, {
    key: 'putWithHeader',
    value: function putWithHeader(url, data, headerValue) {
      var _this4 = this;

      this.url = url;
      this.data = data;
      this.headerValue = headerValue;

      // return a promise
      return new Promise(function (resolve, reject) {
        var options = {
          method: 'put',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: 'Bearer ' + _this4.headerValue
          },
          body: JSON.stringify(data)
        };

        fetch(_this4.url, options).then(function (response) {
          response.json();
        }).then(function (response) {
          resolve(response);
        }).catch(function (error) {
          reject(error);
        });
      });
    }
  }]);

  return HttpRequest;
}();