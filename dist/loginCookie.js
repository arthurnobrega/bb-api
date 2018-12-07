"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoginCookie = function () {
  function LoginCookie() {
    (0, _classCallCheck3.default)(this, LoginCookie);
  }

  (0, _createClass3.default)(LoginCookie, null, [{
    key: "setGlobal",
    value: function setGlobal(cookie) {
      global.loginCookie = cookie;
    }
  }, {
    key: "getGlobal",
    value: function getGlobal() {
      return global.loginCookie;
    }
  }]);
  return LoginCookie;
}();

exports.default = LoginCookie;
//# sourceMappingURL=loginCookie.js.map