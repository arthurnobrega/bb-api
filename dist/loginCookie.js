"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var LoginCookie =
/*#__PURE__*/
function () {
  function LoginCookie() {
    (0, _classCallCheck2["default"])(this, LoginCookie);
  }

  (0, _createClass2["default"])(LoginCookie, null, [{
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

exports["default"] = LoginCookie;
//# sourceMappingURL=loginCookie.js.map