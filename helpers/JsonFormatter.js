import CryptoJS from 'crypto-js'

export default {
  stringify: (cipherParams) => {
    const jsonObj = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }

    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString()
    }

    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString()
    }

    return JSON.stringify(jsonObj)
  },
  parse: (jsonStr) => {
    const jsonObj = JSON.parse(jsonStr)
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
    })

    if (jsonObj.iv) {
      cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
    }

    if (jsonObj.s) {
      cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
    }

    return cipherParams
  }
}
