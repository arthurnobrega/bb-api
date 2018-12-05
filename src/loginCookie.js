export default class LoginCookie {
  static setGlobal(cookie) {
    global.loginCookie = cookie;
  }

  static getGlobal() {
    return global.loginCookie;
  }
}
