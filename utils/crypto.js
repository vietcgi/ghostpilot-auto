
const crypto = require('crypto');

const encrypt = (text, key) => {
  const cipher = crypto.createCipher('aes-256-ctr', key);
  return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};

const decrypt = (text, key) => {
  const decipher = crypto.createDecipher('aes-256-ctr', key);
  return decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
};

module.exports = { encrypt, decrypt };
