import CryptoJS from 'crypto-js';

export default (data) => {
  const bytes = CryptoJS.AES.decrypt(data.toString(), 'suck');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
