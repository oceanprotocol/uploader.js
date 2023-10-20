import { sha256 as e, toUtf8Bytes as t, Contract as n } from 'ethers'
import r from 'axios'
import a from 'validator'
import o from 'fs'
import s from 'form-data'
function i() {
  return (
    (i = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    i.apply(this, arguments)
  )
}
var u = function (n, r, a) {
    try {
      var o = e(t(r + a.toString()))
      return Promise.resolve(n.signMessage(o))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  p = [
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
function d(e, t) {
  try {
    var n = e()
  } catch (e) {
    return t(e)
  }
  return n && n.then ? n.then(void 0, t) : n
}
var c = /*#__PURE__*/ (function () {
  function e(e, t, n) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.uploaderAddress = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = n),
      (this.uploaderAddress = t)
  }
  var t = e.prototype
  return (
    (t.validateBaseURL = function (e) {
      if (!e || 'string' != typeof e || '' === e.trim())
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!a.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (t.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: o.statSync(e).size }
      })
    }),
    (t.getStorageInfo = function () {
      try {
        return Promise.resolve(r.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getQuote = function (e) {
      try {
        if (!e.filePath && !e.fileInfo)
          throw new Error('Either filePath or fileInfo must be provided.')
        var t = e.fileInfo || this.getFileSizes(e.filePath)
        return Promise.resolve(
          r.post(this.baseURL + '/getQuote', {
            type: e.type,
            files: t,
            duration: e.duration,
            payment: e.payment,
            userAddress: e.userAddress
          })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.upload = function (e, t, a, c, l) {
      try {
        var y = this
        return Promise.resolve(
          d(
            function () {
              var d = Math.round(Date.now() / 1e3),
                m = new n(t, p, y.signer)
              return Promise.resolve(
                m.approve(
                  'filecoin' === l
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : y.uploaderAddress,
                  a
                )
              ).then(function (t) {
                return Promise.resolve(t.wait()).then(function () {
                  return Promise.resolve(u(y.signer, e, d)).then(function (t) {
                    var n = new s()
                    c.forEach(function (e, t) {
                      n.append('file' + (t + 1), o.createReadStream(e))
                    })
                    var a =
                      y.baseURL +
                      '/upload?quoteId=' +
                      e +
                      '&nonce=' +
                      d +
                      '&signature=' +
                      t
                    return (
                      console.log('uploadUrl', a),
                      Promise.resolve(r.post(a, n, { headers: i({}, n.getHeaders()) }))
                    )
                  })
                })
              })
            },
            function (e) {
              return console.error('Error:', e), e.data
            }
          )
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.uploadBrowser = function (e, t, a, o, i) {
      try {
        var c = this
        return Promise.resolve(
          d(
            function () {
              var d = Math.round(Date.now() / 1e3),
                l = new n(t, p, c.signer)
              console.log('quote fee: ' + a)
              var y =
                'filecoin' === i
                  ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                  : c.uploaderAddress
              return (
                console.log('Calling approval with address: ' + y + ' and amount: ' + a),
                Promise.resolve(l.approve(y, a)).then(function (t) {
                  return Promise.resolve(t.wait(6)).then(function (t) {
                    return (
                      console.log('transaction receipt', t),
                      Promise.resolve(l.balanceOf(c.signer.getAddress())).then(function (
                        t
                      ) {
                        if ((console.log('User balance of WMATIC: ' + t), t.lt(a)))
                          throw (
                            (console.log(
                              'User balance of ' +
                                t +
                                ' WMATIC is less than quote fee of ' +
                                a
                            ),
                            new Error('Insufficient WMATIC balance'))
                          )
                        return Promise.resolve(u(c.signer, e, d)).then(function (t) {
                          var n = new s()
                          return (
                            Array.from(o).forEach(function (e, t) {
                              n.append('file' + (t + 1), e, e.name)
                            }),
                            Promise.resolve(
                              r.post(
                                c.baseURL +
                                  '/upload?quoteId=' +
                                  e +
                                  '&nonce=' +
                                  d +
                                  '&signature=' +
                                  t,
                                n
                              )
                            )
                          )
                        })
                      })
                    )
                  })
                })
              )
            },
            function (e) {
              return console.error('Error:', e), e.data
            }
          )
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getStatus = function (e) {
      try {
        return Promise.resolve(
          r.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getLink = function (e) {
      try {
        var t = this,
          n = Math.round(Date.now() / 1e3)
        return Promise.resolve(u(t.signer, e, n)).then(function (a) {
          return Promise.resolve(
            r.get(t.baseURL + '/getLink', {
              params: { quoteId: e, nonce: n, signature: a }
            })
          ).then(function (e) {
            return e.data
          })
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.registerMicroservice = function (e) {
      try {
        return Promise.resolve(r.post(this.baseURL + '/register', e))
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getHistory = function (e, t, n) {
      void 0 === e && (e = 1), void 0 === t && (t = 25)
      try {
        var a = this
        return Promise.resolve(
          d(
            function () {
              return Promise.resolve(a.signer.getAddress()).then(function (o) {
                var s = Math.round(Date.now() / 1e3)
                return Promise.resolve(u(a.signer, '', s)).then(function (i) {
                  return Promise.resolve(
                    r.get(
                      a.baseURL +
                        '/getHistory?userAddress=' +
                        o +
                        '&nonce=' +
                        s +
                        '&signature=' +
                        i +
                        '&page=' +
                        e +
                        '&pageSize=' +
                        t +
                        '&storage=' +
                        n
                    )
                  ).then(function (e) {
                    if (200 !== e.status) throw new Error('Failed to retrieve history.')
                    return e.data
                  })
                })
              })
            },
            function (e) {
              throw (console.error('An error occurred while fetching history:', e), e)
            }
          )
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    e
  )
})()
export { c as UploaderClient, u as getSignedHash }
//# sourceMappingURL=lib.module.js.map
