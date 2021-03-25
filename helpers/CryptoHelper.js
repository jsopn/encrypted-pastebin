import CryptoJS from 'crypto-js'
import JsonFormatter from './JsonFormatter'

export default {
  encryptMessage: (text, key) => {
    const encrypted = CryptoJS.AES.encrypt(text, key, {
      format: JsonFormatter
    })

    return encrypted
  },
  decryptMessage: (data, key) => {
    const decrypted = CryptoJS.AES.decrypt(JSON.stringify(data), key, {
      format: JsonFormatter
    }).toString(CryptoJS.enc.Utf8)

    return decrypted
  }
}
