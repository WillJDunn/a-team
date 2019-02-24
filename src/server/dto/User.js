class User {
  constructor(username, password, email, isVerified, registeredAt) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.isVerified = isVerified === 1;
    this.registeredAt = registeredAt;
  }

  static fromDB(dbUser) {
    return new User(
      dbUser.user_name,
      dbUser.password,
      dbUser.email,
      dbUser.email_verified,
      dbUser.registered_at);
  }

  // https://hackernoon.com/https-medium-com-amanhimself-converting-a-buffer-to-json-and-utf8-strings-in-nodejs-2150b1e3de57
  /**
   * Convert a Buffer object returned by MySQL varbinary value to a utf-8 string
   *
   * @returns {string} utf-8 string
   */
  getClearTextPassword() {
    return this.password.toString('utf-8')
  };
}

module.exports = User;
