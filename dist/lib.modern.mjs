import { sha256 as t, toUtf8Bytes as e, Contract as a } from 'ethers'
import n from 'axios'
import s from 'validator'
import i from 'fs'
import o from 'form-data'
function r() {
  return (
    (r = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var a = arguments[e]
            for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n])
          }
          return t
        }),
    r.apply(this, arguments)
  )
}
const p = async (a, n, s) => {
  const i = t(e(n + s.toString()))
  return await a.signMessage(i)
}
var d = [
  {
    constant: !0,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: !1,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: !1,
    inputs: [
      { name: 'guy', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    payable: !1,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: !1,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: !1,
    inputs: [
      { name: 'src', type: 'address' },
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    payable: !1,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: !1,
    inputs: [{ name: 'wad', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    payable: !1,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: !1,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: !0,
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: !1,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: !0,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: !1,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: !1,
    inputs: [
      { name: 'dst', type: 'address' },
      { name: 'wad', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    payable: !1,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: !1,
    inputs: [],
    name: 'deposit',
    outputs: [],
    payable: !0,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: !0,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: !1,
    stateMutability: 'view',
    type: 'function'
  },
  { payable: !0, stateMutability: 'payable', type: 'fallback' },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: 'src', type: 'address' },
      { indexed: !0, name: 'guy', type: 'address' },
      { indexed: !1, name: 'wad', type: 'uint256' }
    ],
    name: 'Approval',
    type: 'event'
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: 'src', type: 'address' },
      { indexed: !0, name: 'dst', type: 'address' },
      { indexed: !1, name: 'wad', type: 'uint256' }
    ],
    name: 'Transfer',
    type: 'event'
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: 'dst', type: 'address' },
      { indexed: !1, name: 'wad', type: 'uint256' }
    ],
    name: 'Deposit',
    type: 'event'
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: 'src', type: 'address' },
      { indexed: !1, name: 'wad', type: 'uint256' }
    ],
    name: 'Withdrawal',
    type: 'event'
  }
]
class u {
  constructor(t, e, a) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.uploaderAddress = void 0),
      this.validateBaseURL(t),
      (this.baseURL = t),
      (this.signer = a),
      (this.uploaderAddress = e)
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
    return (await n.get(`${this.baseURL}/`)).data
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
    return (await n.post(`${this.baseURL}/getQuote`, a)).data
  }
  async upload(t, e, s, u, y) {
    try {
      const l = Math.round(Date.now() / 1e3),
        c = new a(e, d, this.signer),
        m =
          'filecoin' === y
            ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
            : this.uploaderAddress
      await (await c.approve(m, s)).wait()
      const f = await p(this.signer, t, l),
        w = new o()
      u.forEach((t, e) => {
        w.append(`file${e + 1}`, i.createReadStream(t))
      })
      const b = `${this.baseURL}/upload?quoteId=${t}&nonce=${l}&signature=${f}`
      return (
        console.log('uploadUrl', b),
        await n.post(b, w, { headers: r({}, w.getHeaders()) })
      )
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async uploadBrowser(t, e, s, i, r) {
    try {
      const u = Math.round(Date.now() / 1e3),
        y = new a(e, d, this.signer)
      console.log(`quote fee: ${s}`)
      const l =
        'filecoin' === r
          ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
          : this.uploaderAddress
      console.log(`Calling approval with address: ${l} and amount: ${s}`)
      const c = await y.approve(l, s),
        m = await c.wait(6)
      console.log('transaction receipt', m)
      const f = await y.balanceOf(this.signer.getAddress())
      if ((console.log(`User balance of WMATIC: ${f}`), f < s))
        throw (
          (console.log(`User balance of ${f} WMATIC is less than quote fee of ${s}`),
          new Error('Insufficient WMATIC balance'))
        )
      const w = await p(this.signer, t, u),
        b = new o()
      Array.from(i).forEach((t, e) => {
        b.append(`file${e + 1}`, t, t.name)
      })
      const h = `${this.baseURL}/upload?quoteId=${t}&nonce=${u}&signature=${w}`
      return await n.post(h, b)
    } catch (t) {
      return console.error('Error:', t), t.data
    }
  }
  async getStatus(t) {
    return (await n.get(`${this.baseURL}/getStatus`, { params: { quoteId: t } })).data
  }
  async getLink(t) {
    const e = Math.round(Date.now() / 1e3),
      a = await p(this.signer, t, e)
    return (
      await n.get(`${this.baseURL}/getLink`, {
        params: { quoteId: t, nonce: e, signature: a }
      })
    ).data
  }
  async registerMicroservice(t) {
    return await n.post(`${this.baseURL}/register`, t)
  }
  async getHistory(t = 1, e = 25, a) {
    try {
      const s = await this.signer.getAddress(),
        i = Math.round(Date.now() / 1e3),
        o = await p(this.signer, '', i),
        r = `${this.baseURL}/getHistory?userAddress=${s}&nonce=${i}&signature=${o}&page=${t}&pageSize=${e}&storage=${a}`,
        d = await n.get(r)
      if (200 !== d.status) throw new Error('Failed to retrieve history.')
      return d.data
    } catch (t) {
      throw (console.error('An error occurred while fetching history:', t), t)
    }
  }
}
export { u as UploaderClient, p as getSignedHash }
//# sourceMappingURL=lib.modern.mjs.map
