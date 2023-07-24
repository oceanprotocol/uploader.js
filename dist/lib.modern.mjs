import t from 'axios'
import e from 'form-data'
import { sha256 as a, toUtf8Bytes as r, ethers as s } from 'ethers'
import i from 'validator'
function o() {
  return (
    (o = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e]
            for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
          }
          return t
        }),
    o.apply(this, arguments)
  )
}
const n = async (t, e, i) => {
  const o = a(r(e + i.toString()))
  return await t.signMessage(s.getBytes(o))
}
class d {
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
    if (!i.isURL(t, { require_tld: !1 }))
      throw new Error('Invalid baseURL format provided.')
  }
  async getStorageInfo() {
    return (await t.get(`${this.baseURL}/`)).data
  }
  async getQuote(e) {
    return (await t.post(`${this.baseURL}/getQuote`, e)).data
  }
  async upload(a, r) {
    try {
      const s = Date.now(),
        i = await n(this.signer, a, s),
        d = new e()
      return (
        r.forEach((t, e) => {
          d.append(`file${e}`, t, { filename: `file${e}.bin` })
        }),
        await t.post(`${this.baseURL}/upload`, d, {
          params: { quoteId: a, nonce: s, signature: i },
          headers: o({}, d.getHeaders(), { 'Content-Type': 'multipart/form-data' })
        })
      )
    } catch (t) {
      throw (console.error('Error:', t), t)
    }
  }
  async getQuoteAndUpload(t) {
    const e = await this.getQuote(t)
    return await this.upload(e.quoteId, t.files)
  }
  async getStatus(e) {
    return (await t.post(`${this.baseURL}/getStatus`, { quoteId: e })).data
  }
  async getLink(e) {
    const a = Date.now(),
      r = await n(this.signer, e, a)
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
export { d as DBSClient, n as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
