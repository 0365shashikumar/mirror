	const crypto = require('crypto');

	function padTo2Digits(num) {
		return num.toString().padStart(2, '0');
	}
	
	function formatDate(date) {
		return [
		  date.getFullYear(),
		  padTo2Digits(date.getMonth() + 1),
		  padTo2Digits(date.getDate()),
		].join('-');
	  }
	
	function formatDateTime(date) {
		return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
	}
	
	function SsoEncryptData(data, key){
			
			const iv = crypto.randomBytes(16); // Initialization vector: a random 16-byte value
			const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

			let encrypted = cipher.update(data, 'utf8', 'hex');
			encrypted += cipher.final('hex');

			return {
			iv: iv.toString('hex'),
			encryptedData: encrypted
			};
				
			
			
		}
			
	function AesKey(){
			return Buffer.from('a2cde7fbb7a767c2e23068ac125eb5282dc48bf11ea47abe89e3fd2a2c383cd0', 'hex');
	}



	function eparmaanEncrypt(strToEncrypt, secret) {
		  const key = setKeySecret(secret);
		  const algorithm = 'aes-128-ecb';
		  const keyBuffer = Buffer.from(key, 'base64');
		  const cipher = crypto.createCipheriv(algorithm, keyBuffer, null);
		  cipher.setAutoPadding(true);
		  let encrypted = cipher.update(strToEncrypt, 'utf8', 'base64');
		  encrypted += cipher.final('base64');
		  return encrypted; 
	}

	function eparmaanDecrypt(strToEncrypt,secret){
		  const keys = setKeySecret(secret);
		  const key = Buffer.from(keys, 'base64');
		  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
		  decipher.setAutoPadding(false);
		  let decrypted = decipher.update(strToEncrypt, 'base64', 'utf8');
		  decrypted += decipher.final('utf8');
		  return JSON.parse(decrypted.replace(/[\x00-\x1F\x7F]/g, '').trim());

	}
	function setKeySecret(secret) {
		  const sha256 = crypto.createHash('sha256');
		  const hashedKey = sha256.update(secret, 'utf8').digest();
		  const truncatedKey = hashedKey.slice(0, 16); // Truncate to 128 bits (16 bytes)

		  return truncatedKey;
	}

module.exports = {
	formatDate,
	formatDateTime,
  SsoEncryptData,
  AesKey,
  eparmaanEncrypt,
  eparmaanDecrypt,
  setKeySecret
};