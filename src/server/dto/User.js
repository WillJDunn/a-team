class User {
  constructor(userId, username, password, email, isVerified, registeredAt) {
    this.id = userId;
    this.username = username;
    this.password = password;
    this.email = email;
    this.isVerified = isVerified === 1;
    this.registeredAt = registeredAt;
  }

  static fromDB(dbUser) {
    return new User(
      dbUser.user_id,
      dbUser.user_name,
      dbUser.password,
      dbUser.email,
      dbUser.email_verified,
      dbUser.registered_at);
  }
}

module.exports = User;
