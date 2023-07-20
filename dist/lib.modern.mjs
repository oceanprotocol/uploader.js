import t from 'axios'
import a from 'form-data'
import { sha256 as e, toUtf8Bytes as r, ethers as s } from 'ethers'
import i from 'validator'
function o() {
  return (
    (o = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var a = 1; a < arguments.length; a++) {
            var e = arguments[a]
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
          }
          return t
        }),
    o.apply(this, arguments)
  )
}
const n = async (t, a, i) => {
  const o = e(r(a + i.toString()))
  return await t.signMessage(s.getBytes(o))
}
class d {
  constructor(t, a) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      this.validateBaseURL(t),
      (this.baseURL = t),
      (this.signer = a)
  }
  validateBaseURL(t) {
    if (!t || 'string' != typeof t || '' === t.trim())
      throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
    if (!i.isURL(t)) throw new Error('Invalid baseURL format provided.')
  }
  async getStorageInfo() {
    return (await t.get(`${this.baseURL}/`)).data
  }
  async getQuote(a) {
    return (await t.post(`${this.baseURL}/getQuote`, a)).data
  }
  async upload(e, r) {
    try {
      const s = Date.now(),
        i = await n(this.signer, e, s),
        d = new a()
      return (
        r.forEach((t, a) => {
          d.append(`file${a}`, t, { filename: `file${a}.bin` })
        }),
        await t.post(`${this.baseURL}/upload`, d, {
          params: { quoteId: e, nonce: s, signature: i },
          headers: o({}, d.getHeaders(), { 'Content-Type': 'multipart/form-data' })
        })
      )
    } catch (t) {
      throw (console.error('Error:', t), t)
    }
  }
  async getQuoteAndUpload(t) {
    const a = await this.getQuote(t)
    return await this.upload(a.quoteId, t.files)
  }
  async getStatus(a) {
    return (await t.post(`${this.baseURL}/getStatus`, { quoteId: a })).data
  }
  async getLink(a) {
    const e = Date.now(),
      r = await n(this.signer, a, e)
    return (
      await t.post(`${this.baseURL}/getLink`, null, {
        params: { quoteId: a, nonce: e, signature: r }
      })
    ).data
  }
  async registerMicroservice(a) {
    await t.post(`${this.baseURL}/register`, a)
  }
}
export { d as DBSClient, n as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
