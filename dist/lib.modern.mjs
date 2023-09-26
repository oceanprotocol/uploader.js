import { sha256 as e, toUtf8Bytes as t, Contract as r } from 'ethers'
import a from 'axios'
import s from 'validator'
import i from 'fs'
import o from 'form-data'
function n() {
  return (
    (n = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a])
          }
          return e
        }),
    n.apply(this, arguments)
  )
}
const d = [
    'function approve(address, uint256) external returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)'
  ],
  c = async (r, a, s) => {
    const i = e(t(a + s.toString()))
    return await r.signMessage(i)
  }
class u {
  constructor(e, t, r) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.uploaderAddress = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = r),
      (this.uploaderAddress = t)
  }
  validateBaseURL(e) {
    if (!e || 'string' != typeof e || '' === e.trim())
      throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
    if (!s.isURL(e, { require_tld: !1 }))
      throw new Error('Invalid baseURL format provided.')
  }
  getFileSizes(e) {
    return e.map((e) => ({ length: i.statSync(e).size }))
  }
  async getStorageInfo() {
    return (await a.get(`${this.baseURL}/`)).data
  }
  async getQuote(e) {
    if (!e.filePath && !e.fileInfo)
      throw new Error('Either filePath or fileInfo must be provided.')
    const t = e.fileInfo || this.getFileSizes(e.filePath),
      r = {
        type: e.type,
        files: t,
        duration: e.duration,
        payment: e.payment,
        userAddress: e.userAddress
      }
    return (await a.post(`${this.baseURL}/getQuote`, r)).data
  }
  async upload(e, t, s, u, h) {
    try {
      const p = Math.round(Date.now() / 1e3),
        f = new r(t, d, this.signer),
        g =
          'filecoin' === h
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.uploaderAddress
      await (await f.approve(g, s)).wait()
      const l = await c(this.signer, e, p),
        w = new o()
      u.forEach((e, t) => {
        w.append(`file${t + 1}`, i.createReadStream(e))
      })
      const y = `${this.baseURL}/upload?quoteId=${e}&nonce=${p}&signature=${l}`
      return (
        console.log('uploadUrl', y),
        await a.post(y, w, { headers: n({}, w.getHeaders()) })
      )
    } catch (e) {
      return console.error('Error:', e), e.data
    }
  }
  async uploadBrowser(e, t, s, i, n) {
    try {
      const u = Math.round(Date.now() / 1e3),
        h = new r(t, d, this.signer),
        p =
          'filecoin' === n
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.uploaderAddress
      await h.approve(p, s)
      const f = await c(this.signer, e, u),
        g = new o()
      Array.from(i).forEach((e, t) => {
        g.append(`file${t + 1}`, e, e.name)
      })
      const l = `${this.baseURL}/upload?quoteId=${e}&nonce=${u}&signature=${f}`
      return await a.post(l, g)
    } catch (e) {
      return console.error('Error:', e), e.data
    }
  }
  async getStatus(e) {
    return (await a.get(`${this.baseURL}/getStatus`, { params: { quoteId: e } })).data
  }
  async getLink(e) {
    const t = Math.round(Date.now() / 1e3),
      r = await c(this.signer, e, t)
    return (
      await a.get(`${this.baseURL}/getLink`, {
        params: { quoteId: e, nonce: t, signature: r }
      })
    ).data
  }
  async registerMicroservice(e) {
    return await a.post(`${this.baseURL}/register`, e)
  }
  async getHistory(e = 1, t = 25, r) {
    try {
      const s = await this.signer.getAddress(),
        i = Math.round(Date.now() / 1e3),
        o = await c(this.signer, '', i),
        n = `${this.baseURL}/getHistory?userAddress=${s}&nonce=${i}&signature=${o}&page=${e}&pageSize=${t}&storage=${r}`,
        d = await a.get(n)
      if (200 !== d.status) throw new Error('Failed to retrieve history.')
      return d.data
    } catch (e) {
      throw (console.error('An error occurred while fetching history:', e), e)
    }
  }
}
export { u as UploaderClient, c as getSignedHash, d as minErc20Abi }
//# sourceMappingURL=lib.modern.mjs.map
