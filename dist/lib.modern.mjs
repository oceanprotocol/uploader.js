import t from 'axios'
import a from 'form-data'
import { sha256 as e, toUtf8Bytes as s, ethers as i } from 'ethers'
const r = async (t, a, r) => {
  const o = e(s(a + r.toString()))
  return await t.signMessage(i.getBytes(o))
}
class o {
  constructor(t, a) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.baseURL = t),
      (this.signer = a)
  }
  async getStorageInfo() {
    return (await t.get(`${this.baseURL}/`)).data
  }
  async getQuote(a) {
    return (await t.post(`${this.baseURL}/getQuote`, a)).data
  }
  async upload(e, s) {
    try {
      const i = Date.now(),
        o = await r(this.signer, e, i),
        n = new a()
      return (
        s.forEach((t, a) => {
          n.append(`file${a}`, t)
        }),
        await t.post(`${this.baseURL}/upload`, n, {
          params: { quoteId: e, nonce: i, signature: o },
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
      s = await r(this.signer, a, e)
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
export { o as DBSClient, r as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
