import t from 'axios'
import e from 'form-data'
import { sha256 as r, toUtf8Bytes as a, ethers as s } from 'ethers'
import i from 'validator'
import o from 'fs'
function n() {
  return (
    (n = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e]
            for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a])
          }
          return t
        }),
    n.apply(this, arguments)
  )
}
const d = async (t, e, i) => {
  const o = r(a(e + i.toString()))
  return await t.signMessage(s.getBytes(o))
}
class p {
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
  getFileSizes(t) {
    return t.map((t) => ({ length: o.statSync(t).size }))
  }
  async getStorageInfo() {
    return (await t.get(`${this.baseURL}/`)).data
  }
  async getQuote(e, r, a, s, i, o) {
    if (!i && !o) throw new Error('Either filePath or fileInfo must be provided.')
    const n = {
      type: e,
      files: o || this.getFileSizes(i),
      duration: r,
      payment: a,
      userAddress: s
    }
    return (await t.post(`${this.baseURL}/getQuote`, n)).data
  }
  async upload(r, a) {
    try {
      const s = Date.now(),
        i = await d(this.signer, r, s),
        o = new e()
      return (
        a.forEach((t, e) => {
          o.append(`file${e}`, t, { filename: `file${e}.bin` })
        }),
        await t.post(`${this.baseURL}/upload`, o, {
          params: { quoteId: r, nonce: s, signature: i },
          headers: n({}, o.getHeaders(), { 'Content-Type': 'multipart/form-data' })
        })
      )
    } catch (t) {
      throw (console.error('Error:', t), t)
    }
  }
  async getStatus(e) {
    return (await t.post(`${this.baseURL}/getStatus`, { quoteId: e })).data
  }
  async getLink(e) {
    const r = Date.now(),
      a = await d(this.signer, e, r)
    return (
      await t.post(`${this.baseURL}/getLink`, null, {
        params: { quoteId: e, nonce: r, signature: a }
      })
    ).data
  }
  async registerMicroservice(e) {
    await t.post(`${this.baseURL}/register`, e)
  }
}
export { p as DBSClient, d as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
