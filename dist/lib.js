var e = require('ethers'),
  t = require('axios'),
  n = require('validator'),
  r = require('fs'),
  a = require('form-data')
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var s = /*#__PURE__*/ o(t),
  i = /*#__PURE__*/ o(n),
  u = /*#__PURE__*/ o(r),
  d = /*#__PURE__*/ o(a)
function p() {
  return (
    (p = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t]
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        }),
    p.apply(this, arguments)
  )
}
var l = function (t, n, r) {
    try {
      var a = e.sha256(e.toUtf8Bytes(n + r.toString()))
      return Promise.resolve(t.signMessage(a))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  c = [
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
function f(e, t) {
  try {
    var n = e()
  } catch (e) {
    return t(e)
  }
  return n && n.then ? n.then(void 0, t) : n
}
;(exports.UploaderClient = /*#__PURE__*/ (function () {
  function t(e, t, n) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.uploaderAddress = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = n),
      (this.uploaderAddress = t)
  }
  var n = t.prototype
  return (
    (n.validateBaseURL = function (e) {
      if (!e || 'string' != typeof e || '' === e.trim())
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!i.default.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (n.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: u.default.statSync(e).size }
      })
    }),
    (n.getStorageInfo = function () {
      try {
        return Promise.resolve(s.default.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (n.getQuote = function (e) {
      try {
        if (!e.filePath && !e.fileInfo)
          throw new Error('Either filePath or fileInfo must be provided.')
        var t = e.fileInfo || this.getFileSizes(e.filePath)
        return Promise.resolve(
          s.default.post(this.baseURL + '/getQuote', {
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
    (n.upload = function (t, n, r, a, o) {
      try {
        var i = this
        return Promise.resolve(
          f(
            function () {
              var f = Math.round(Date.now() / 1e3),
                y = new e.Contract(n, c, i.signer)
              return Promise.resolve(
                y.approve(
                  'filecoin' === o
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : i.uploaderAddress,
                  r
                )
              ).then(function (e) {
                return Promise.resolve(e.wait()).then(function () {
                  return Promise.resolve(l(i.signer, t, f)).then(function (e) {
                    var n = new d.default()
                    a.forEach(function (e, t) {
                      n.append('file' + (t + 1), u.default.createReadStream(e))
                    })
                    var r =
                      i.baseURL +
                      '/upload?quoteId=' +
                      t +
                      '&nonce=' +
                      f +
                      '&signature=' +
                      e
                    return (
                      console.log('uploadUrl', r),
                      Promise.resolve(
                        s.default.post(r, n, { headers: p({}, n.getHeaders()) })
                      )
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
    (n.uploadBrowser = function (t, n, r, a, o) {
      try {
        var i = this
        return Promise.resolve(
          f(
            function () {
              var u = Math.round(Date.now() / 1e3),
                p = new e.Contract(n, c, i.signer)
              console.log('quote fee: ' + r)
              var f =
                'filecoin' === o
                  ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                  : i.uploaderAddress
              return (
                console.log('Calling approval with address: ' + f + ' and amount: ' + r),
                Promise.resolve(p.approve(f, r)).then(function (e) {
                  return Promise.resolve(e.wait(6)).then(function (e) {
                    return (
                      console.log('transaction receipt', e),
                      Promise.resolve(p.balanceOf(i.signer.getAddress())).then(function (
                        e
                      ) {
                        if ((console.log('User balance of WMATIC: ' + e), e < r))
                          throw (
                            (console.log(
                              'User balance of ' +
                                e +
                                ' WMATIC is less than quote fee of ' +
                                r
                            ),
                            new Error('Insufficient WMATIC balance'))
                          )
                        return Promise.resolve(l(i.signer, t, u)).then(function (e) {
                          var n = new d.default()
                          return (
                            Array.from(a).forEach(function (e, t) {
                              n.append('file' + (t + 1), e, e.name)
                            }),
                            Promise.resolve(
                              s.default.post(
                                i.baseURL +
                                  '/upload?quoteId=' +
                                  t +
                                  '&nonce=' +
                                  u +
                                  '&signature=' +
                                  e,
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
    (n.getStatus = function (e) {
      try {
        return Promise.resolve(
          s.default.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (n.getLink = function (e) {
      try {
        var t = this,
          n = Math.round(Date.now() / 1e3)
        return Promise.resolve(l(t.signer, e, n)).then(function (r) {
          return Promise.resolve(
            s.default.get(t.baseURL + '/getLink', {
              params: { quoteId: e, nonce: n, signature: r }
            })
          ).then(function (e) {
            return e.data
          })
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (n.registerMicroservice = function (e) {
      try {
        return Promise.resolve(s.default.post(this.baseURL + '/register', e))
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (n.getHistory = function (e, t, n) {
      void 0 === e && (e = 1), void 0 === t && (t = 25)
      try {
        var r = this
        return Promise.resolve(
          f(
            function () {
              return Promise.resolve(r.signer.getAddress()).then(function (a) {
                var o = Math.round(Date.now() / 1e3)
                return Promise.resolve(l(r.signer, '', o)).then(function (i) {
                  return Promise.resolve(
                    s.default.get(
                      r.baseURL +
                        '/getHistory?userAddress=' +
                        a +
                        '&nonce=' +
                        o +
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
    t
  )
})()),
  (exports.getSignedHash = l)
//# sourceMappingURL=lib.js.map
