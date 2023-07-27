import t from 'axios'
import { sha256 as e, toUtf8Bytes as a, ethers as r } from 'ethers'
import s from 'validator'
import i from 'fs'
import o from 'form-data'
function n() {
  return (
    (n = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e]
            for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
          }
          return t
        }),
    n.apply(this, arguments)
  )
}
const d = async (t, s, i) => {
  const o = e(a(s + i.toString()))
  return await t.signMessage(r.getBytes(o))
}
class c {
  constructor(t, e) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      this.validateBaseURL(t),
      (this.baseURL = t),
      (this.signer = e)
  }
  validateBaseURL(t) {
    if (!t || 'string' != typeof t || '' === t.trim())
      throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
    if (!s.isURL(t, { require_tld: !1 }))
      throw new Error('Invalid baseURL format provided.')
  }
  getFileSizes(t) {
    return t.map((t) => ({ length: i.statSync(t).size }))
  }
  async getStorageInfo() {
    return (await t.get(`${this.baseURL}/`)).data
  }
  async getQuote(e) {
    if (!e.filePath && !e.fileInfo)
      throw new Error('Either filePath or fileInfo must be provided.')
    const a = e.fileInfo || this.getFileSizes(e.filePath),
      r = {
        type: e.type,
        files: a,
        duration: e.duration,
        payment: e.payment,
        userAddress: e.userAddress
      }
    return (await t.post(`${this.baseURL}/getQuote`, r)).data
  }
  async upload(e, a) {
    try {
      const r = Math.round(Date.now() / 1e3),
        s = await d(this.signer, e, r),
        c = new o()
      a.forEach((t, e) => {
        c.append(`file${e + 1}`, i.createReadStream(t))
      })
      const u = `${this.baseURL}/upload?quoteId=${e}&nonce=${r}&signature=${s}`
      return (await t.post(u, c, { headers: n({}, c.getHeaders()) })).data
    } catch (t) {
      throw (console.error('Error:', t), t)
    }
  }
  async getStatus(e) {
    return (await t.post(`${this.baseURL}/getStatus`, { quoteId: e })).data
  }
  async getLink(e) {
    const a = Date.now(),
      r = await d(this.signer, e, a)
    return (
      await t.post(`${this.baseURL}/getLink`, null, {
        params: { quoteId: e, nonce: a, signature: r }
      })
    ).data
  }
  async registerMicroservice(e) {
    await t.post(`${this.baseURL}/register`, e)
  }
}
export { c as DBSClient, d as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
