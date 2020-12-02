export default class LoginModel {
  constructor(data) {
    this.token = data.token;
    this.user = data.user;
    this.refreshToken = data.refreshToken;
    this.authTime = data.authTime;
    this.expirationTime = data.expirationTime;
  }

  token = '';

  user = {};

  refreshToken = '';

  authTime = null;

  expirationTime = null;
}
