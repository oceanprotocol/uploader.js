import { sha256 as t, toUtf8Bytes as e, Contract as a, MaxInt256 as r } from 'ethers'
import s from 'axios'
import n from 'validator'
import i from 'fs'
import o from 'form-data'
function d() {
  return (
    (d = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e]
            for (var r in a) Object.prototype.hasOwnProperty.call(a, r) && (t[r] = a[r])
          }
          return t
        }),
    d.apply(this, arguments)
  )
}
const c = [
    'function approve(address, uint256) external returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)'
  ],
  u = async (a, r, s) => {
    const n = t(e(r + s.toString()))
    return await a.signMessage(n)
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
    if (!n.isURL(t, { require_tld: !1 }))
      throw new Error('Invalid baseURL format provided.')
  }
  getFileSizes(t) {
    return t.map((t) => ({ length: i.statSync(t).size }))
  }
  async getStorageInfo() {
    return (await s.get(`${this.baseURL}/`)).data
  }
  async getQuote(t) {
    if (!t.filePath && !t.fileInfo)
      throw new Error('Either filePath or fileInfo must be provided.')
    const e = t.fileInfo || this.getFileSizes(t.filePath),
      a = {
        type: t.type,
        files: e,
        duration: t.duration,
        payment: t.payment,
        userAddress: t.userAddress
      }
    return (await s.post(`${this.baseURL}/getQuote`, a)).data
  }
  async upload(t, e, n) {
    try {
      const p = Math.round(Date.now() / 1e3),
        h = await this.signer.getAddress(),
        g = new a(e, c, this.signer)
      await (await g.approve(h, r)).wait()
      const f = await u(this.signer, t, p),
        w = new o()
      n.forEach((t, e) => {
        w.append(`file${e + 1}`, i.createReadStream(t))
      })
      const l = `${this.baseURL}/upload?quoteId=${t}&nonce=${p}&signature=${f}`
      return await s.post(l, w, { headers: d({}, w.getHeaders()) })
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async uploadBrowser(t, e, n) {
    try {
      const i = Math.round(Date.now() / 1e3),
        p = await this.signer.getAddress(),
        h = new a(e, c, this.signer)
      await (await h.approve(p, r)).wait()
      const g = await u(this.signer, t, i),
        f = new o()
      Array.from(n).forEach((t, e) => {
        f.append(`file${e + 1}`, t.stream, {
          knownLength: t.size,
          filename: t.name,
          contentType: t.type
        })
      })
      const w = `${this.baseURL}/upload?quoteId=${t}&nonce=${i}&signature=${g}`
      return await s.post(w, f, { headers: d({}, f.getHeaders()) })
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async getStatus(t) {
    return (await s.get(`${this.baseURL}/getStatus`, { params: { quoteId: t } })).data
  }
  async getLink(t) {
    const e = Math.round(Date.now() / 1e3),
      a = await u(this.signer, t, e)
    return (
      await s.get(`${this.baseURL}/getLink`, {
        params: { quoteId: t, nonce: e, signature: a }
      })
    ).data
  }
  async registerMicroservice(t) {
    return await s.post(`${this.baseURL}/register`, t)
  }
}
export { p as DBSClient, u as getSignedHash, c as minErc20Abi }
//# sourceMappingURL=lib.modern.mjs.map
