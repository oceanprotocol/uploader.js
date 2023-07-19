import t from 'axios'
import a from 'form-data'
import { sha256 as e, toUtf8Bytes as s, ethers as i } from 'ethers'
const r = async (t, a, r) => {
  const n = e(s(a + r.toString()))
  return await t.signMessage(i.getBytes(n))
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
    const i = Date.now(),
      n = await r(this.signer, e, i),
      o = new a()
    return (
      s.forEach((t, a) => {
        o.append(`file${a}`, new Blob([new ArrayBuffer(t.length)]))
      }),
      await t.post(`${this.baseURL}/upload`, o, {
        params: { quoteId: e, nonce: i, signature: n },
        headers: { 'Content-Type': 'multipart/form-data' }
      })
    )
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
export { n as DBSClient, r as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
