import t from 'axios'
class a {
  constructor(t) {
    ;(this.baseURL = void 0), (this.baseURL = t)
  }
  async getStorageInfo() {
    return (await t.get(`${this.baseURL}/`)).data
  }
  async getQuote(a) {
    return (await t.post(`${this.baseURL}/getQuote`, a)).data
  }
  async upload(a, e, s, r) {
    const o = new FormData()
    r.forEach((t, a) => {
      o.append(`file${a}`, new Blob([new ArrayBuffer(t.length)]))
    }),
      await t.post(`${this.baseURL}/upload`, o, {
        params: { quoteId: a, nonce: e, signature: s },
        headers: { 'Content-Type': 'multipart/form-data' }
      })
  }
  async getStatus(a) {
    return (await t.post(`${this.baseURL}/getStatus`, { quoteId: a })).data
  }
  async getLink(a, e, s) {
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
export { a as default }
//# sourceMappingURL=lib.modern.mjs.map
