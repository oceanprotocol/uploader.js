import t from 'axios'
import a from 'form-data'
import { sha256 as e, toUtf8Bytes as s, ethers as r } from 'ethers'
import i from 'validator'
const o = async (t, a, i) => {
  const o = e(s(a + i.toString()))
  return await t.signMessage(r.getBytes(o))
}
class n {
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
  async upload(e, s) {
    try {
      const r = Date.now(),
        i = await o(this.signer, e, r),
        n = new a()
      return (
        s.forEach((t, a) => {
          n.append(`file${a}`, t)
        }),
        await t.post(`${this.baseURL}/upload`, n, {
          params: { quoteId: e, nonce: r, signature: i },
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      )
    } catch (t) {
      return t
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
      s = await o(this.signer, a, e)
    return (
      await t.post(`${this.baseURL}/getLink`, null, {
        params: { quoteId: a, nonce: e, signature: s }
      })
    ).data
  }
  async registerMicroservice(a) {
    await t.post(`${this.baseURL}/register`, a)
  }
}
export { n as DBSClient, o as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
