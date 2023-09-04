import { sha256 as t, toUtf8Bytes as e, Contract as r, MaxInt256 as a } from 'ethers'
import s from 'axios'
import i from 'validator'
import n from 'fs'
import o from 'form-data'
function d() {
  return (
    (d = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var r = arguments[e]
            for (var a in r) Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a])
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
  u = async (r, a, s) => {
    const i = t(e(a + s.toString()))
    return await r.signMessage(i)
  }
class h {
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
    if (!i.isURL(t, { require_tld: !1 }))
      throw new Error('Invalid baseURL format provided.')
  }
  getFileSizes(t) {
    return t.map((t) => ({ length: n.statSync(t).size }))
  }
  async getStorageInfo() {
    return (await s.get(`${this.baseURL}/`)).data
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
    return (await s.post(`${this.baseURL}/getQuote`, r)).data
  }
  async upload(t, e, i) {
    try {
      const h = Math.round(Date.now() / 1e3),
        g = new r(e, c, this.signer)
      await (await g.approve(this.dbsAddress, a)).wait()
      const p = await u(this.signer, t, h),
        l = new o()
      i.forEach((t, e) => {
        l.append(`file${e + 1}`, n.createReadStream(t))
      })
      const w = `${this.baseURL}/upload?quoteId=${t}&nonce=${h}&signature=${p}`
      return (
        console.log('uploadUrl', w),
        await s.post(w, l, { headers: d({}, l.getHeaders()) })
      )
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async uploadBrowser(t, e, i) {
    try {
      const n = Math.round(Date.now() / 1e3),
        d = new r(e, c, this.signer)
      await d.approve(this.dbsAddress, a)
      const h = await u(this.signer, t, n),
        g = new o()
      Array.from(i).forEach((t, e) => {
        g.append(`file${e + 1}`, t, t.name)
      })
      const p = `${this.baseURL}/upload?quoteId=${t}&nonce=${n}&signature=${h}`
      return await s.post(p, g)
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async getStatus(t) {
    return (await s.get(`${this.baseURL}/getStatus`, { params: { quoteId: t } })).data
  }
  async getLink(t) {
    const e = Math.round(Date.now() / 1e3),
      r = await u(this.signer, t, e)
    return (
      await s.get(`${this.baseURL}/getLink`, {
        params: { quoteId: t, nonce: e, signature: r }
      })
    ).data
  }
  async registerMicroservice(t) {
    return await s.post(`${this.baseURL}/register`, t)
  }
  async getHistory(t = 1, e = 25) {
    try {
      const r = await this.signer.getAddress(),
        a = Math.round(Date.now() / 1e3),
        i = await u(this.signer, '', a),
        n = `${this.baseURL}/getHistory?userAddress=${r}&nonce=${a}&signature=${i}&page=${t}&pageSize=${e}`,
        o = await s.get(n)
      if (200 !== o.status) throw new Error('Failed to retrieve history.')
      return o.data
    } catch (t) {
      throw (console.error('An error occurred while fetching history:', t), t)
    }
  }
}
export { h as DBSClient, u as getSignedHash, c as minErc20Abi }
//# sourceMappingURL=lib.modern.mjs.map
