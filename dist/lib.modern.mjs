import { sha256 as t, toUtf8Bytes as e, Contract as r } from 'ethers'
import a from 'axios'
import s from 'validator'
import i from 'fs'
import n from 'form-data'
function o() {
  return (
    (o = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e]
            for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a])
          }
          return t
        }),
    o.apply(this, arguments)
  )
}
const d = [
    'function approve(address, uint256) external returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)'
  ],
  c = async (r, a, s) => {
    const i = t(e(a + s.toString()))
    return await r.signMessage(i)
  }
class u {
  constructor(t, e, r) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.dbsAddress = void 0),
      this.validateBaseURL(t),
      (this.baseURL = t),
      (this.signer = r),
      (this.dbsAddress = e)
  }
  validateBaseURL(t) {
    if (!t || 'string' != typeof t || '' === t.trim())
      throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
    if (!s.isURL(t, { require_tld: !1 }))
      throw new Error('Invalid baseURL format provided.')
  }
  getFileSizes(t) {
    return t.map((t) => ({ length: i.statSync(t).size }))
  }
  async getStorageInfo() {
    return (await a.get(`${this.baseURL}/`)).data
  }
  async getQuote(t) {
    if (!t.filePath && !t.fileInfo)
      throw new Error('Either filePath or fileInfo must be provided.')
    const e = t.fileInfo || this.getFileSizes(t.filePath),
      r = {
        type: t.type,
        files: e,
        duration: t.duration,
        payment: t.payment,
        userAddress: t.userAddress
      }
    return (await a.post(`${this.baseURL}/getQuote`, r)).data
  }
  async upload(t, e, s, u, h) {
    try {
      const f = Math.round(Date.now() / 1e3),
        g = new r(e, d, this.signer),
        p =
          'filecoin' === h
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.dbsAddress
      await (await g.approve(p, s)).wait()
      const l = await c(this.signer, t, f),
        w = new n()
      u.forEach((t, e) => {
        w.append(`file${e + 1}`, i.createReadStream(t))
      })
      const b = `${this.baseURL}/upload?quoteId=${t}&nonce=${f}&signature=${l}`
      return (
        console.log('uploadUrl', b),
        await a.post(b, w, { headers: o({}, w.getHeaders()) })
      )
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async uploadBrowser(t, e, s, i, o) {
    try {
      const u = Math.round(Date.now() / 1e3),
        h = new r(e, d, this.signer),
        f =
          'filecoin' === o
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.dbsAddress
      await h.approve(f, s)
      const g = await c(this.signer, t, u),
        p = new n()
      Array.from(i).forEach((t, e) => {
        p.append(`file${e + 1}`, t, t.name)
      })
      const l = `${this.baseURL}/upload?quoteId=${t}&nonce=${u}&signature=${g}`
      return await a.post(l, p)
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async getStatus(t) {
    return (await a.get(`${this.baseURL}/getStatus`, { params: { quoteId: t } })).data
  }
  async getLink(t) {
    const e = Math.round(Date.now() / 1e3),
      r = await c(this.signer, t, e)
    return (
      await a.get(`${this.baseURL}/getLink`, {
        params: { quoteId: t, nonce: e, signature: r }
      })
    ).data
  }
  async registerMicroservice(t) {
    return await a.post(`${this.baseURL}/register`, t)
  }
  async getHistory(t = 1, e = 25, r) {
    try {
      const s = await this.signer.getAddress(),
        i = Math.round(Date.now() / 1e3),
        n = await c(this.signer, '', i),
        o = `${this.baseURL}/getHistory?userAddress=${s}&nonce=${i}&signature=${n}&page=${t}&pageSize=${e}&storage=${r}`,
        d = await a.get(o)
      if (200 !== d.status) throw new Error('Failed to retrieve history.')
      return d.data
    } catch (t) {
      throw (console.error('An error occurred while fetching history:', t), t)
    }
  }
}
export { u as DBSClient, c as getSignedHash, d as minErc20Abi }
//# sourceMappingURL=lib.modern.mjs.map
