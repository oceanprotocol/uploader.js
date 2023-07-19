import t from 'axios'
import a from 'form-data'
import { sha256 as e, toUtf8Bytes as s, ethers as r } from 'ethers'
const i = async (t, a, i) => {
  const n = e(s(a + i.toString()))
  return await t.signMessage(r.getBytes(n))
}
class n {
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
      const r = Date.now(),
        n = await i(this.signer, e, r),
        o = new a()
      return (
        s.forEach((t, a) => {
          o.append(`file${a}`, new Blob([new ArrayBuffer(t.length)]))
        }),
        await t.post(`${this.baseURL}/upload`, o, {
          params: { quoteId: e, nonce: r, signature: n },
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
      s = await i(this.signer, a, e)
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
export { n as DBSClient, i as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
