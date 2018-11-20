'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);
  }

  _createClass(App, [{
    key: 'readDataFile',

    /**
     * read json file and return object
     *
     * @param  string path
     * @return object
     */
    value: function readDataFile(path) {
      this.rawData = _fs2.default.readFileSync(path, 'utf-8');
      this.data = JSON.parse(this.rawData);

      return this.data;
    }

    /**
     * write into a json file
     *
     * @param  string path
     * @param  object dataObject
     */

  }, {
    key: 'writeDataFile',
    value: function writeDataFile(path, dataObject) {
      this.data = JSON.stringify(dataObject, null, 4);
      _fs2.default.writeFileSync(path, this.data);
    }
  }]);

  return App;
}();

exports.default = App;