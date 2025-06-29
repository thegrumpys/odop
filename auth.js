const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePassword(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}

module.exports = {
  hashPassword,
  comparePassword
};
