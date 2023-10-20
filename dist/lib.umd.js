!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('ethers'),
        require('axios'),
        require('validator'),
        require('fs'),
        require('form-data')
      )
    : 'function' == typeof define && define.amd
    ? define(['exports', 'ethers', 'axios', 'validator', 'fs', 'form-data'], t)
    : t(((e || self).uploader = {}), e.ethers, e.axios, e.validator, e.fs, e.formData)
})(this, function (e, t, n, r, a, o) {
  function s(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var i = /*#__PURE__*/ s(n),
    u = /*#__PURE__*/ s(r),
    d = /*#__PURE__*/ s(a),
    p = /*#__PURE__*/ s(o)
  function l() {
    return (
      (l = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t]
              for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
          }),
      l.apply(this, arguments)
    )
  }
  var c = function (e, n, r) {
      try {
        var a = t.sha256(t.toUtf8Bytes(n + r.toString()))
        return Promise.resolve(e.signMessage(a))
      } catch (e) {
        return Promise.reject(e)
      }
    },
    f = [
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
  function y(e, t) {
    try {
      var n = e()
    } catch (e) {
      return t(e)
    }
    return n && n.then ? n.then(void 0, t) : n
  }
  ;(e.UploaderClient = /*#__PURE__*/ (function () {
    function e(e, t, n) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        (this.uploaderAddress = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = n),
        (this.uploaderAddress = t)
    }
    var n = e.prototype
    return (
      (n.validateBaseURL = function (e) {
        if (!e || 'string' != typeof e || '' === e.trim())
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!u.default.isURL(e, { require_tld: !1 }))
          throw new Error('Invalid baseURL format provided.')
      }),
      (n.getFileSizes = function (e) {
        return e.map(function (e) {
          return { length: d.default.statSync(e).size }
        })
      }),
      (n.getStorageInfo = function () {
        try {
          return Promise.resolve(i.default.get(this.baseURL + '/')).then(function (e) {
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
            i.default.post(this.baseURL + '/getQuote', {
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
      (n.upload = function (e, n, r, a, o) {
        try {
          var s = this
          return Promise.resolve(
            y(
              function () {
                var u = Math.round(Date.now() / 1e3),
                  y = new t.Contract(n, f, s.signer)
                return Promise.resolve(
                  y.approve(
                    'filecoin' === o
                      ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                      : s.uploaderAddress,
                    r
                  )
                ).then(function (t) {
                  return Promise.resolve(t.wait()).then(function () {
                    return Promise.resolve(c(s.signer, e, u)).then(function (t) {
                      var n = new p.default()
                      a.forEach(function (e, t) {
                        n.append('file' + (t + 1), d.default.createReadStream(e))
                      })
                      var r =
                        s.baseURL +
                        '/upload?quoteId=' +
                        e +
                        '&nonce=' +
                        u +
                        '&signature=' +
                        t
                      return (
                        console.log('uploadUrl', r),
                        Promise.resolve(
                          i.default.post(r, n, { headers: l({}, n.getHeaders()) })
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
      (n.uploadBrowser = function (e, n, r, a, o) {
        try {
          var s = this
          return Promise.resolve(
            y(
              function () {
                var u = Math.round(Date.now() / 1e3),
                  d = new t.Contract(n, f, s.signer)
                console.log('quote fee: ' + r)
                var l =
                  'filecoin' === o
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : s.uploaderAddress
                return (
                  console.log(
                    'Calling approval with address: ' + l + ' and amount: ' + r
                  ),
                  Promise.resolve(d.approve(l, r)).then(function (t) {
                    return Promise.resolve(t.wait(6)).then(function (t) {
                      return (
                        console.log('transaction receipt', t),
                        Promise.resolve(d.balanceOf(s.signer.getAddress())).then(
                          function (t) {
                            if ((console.log('User balance of WMATIC: ' + t), t.lt(r)))
                              throw (
                                (console.log(
                                  'User balance of ' +
                                    t +
                                    ' WMATIC is less than quote fee of ' +
                                    r
                                ),
                                new Error('Insufficient WMATIC balance'))
                              )
                            return Promise.resolve(c(s.signer, e, u)).then(function (t) {
                              var n = new p.default()
                              return (
                                Array.from(a).forEach(function (e, t) {
                                  n.append('file' + (t + 1), e, e.name)
                                }),
                                Promise.resolve(
                                  i.default.post(
                                    s.baseURL +
                                      '/upload?quoteId=' +
                                      e +
                                      '&nonce=' +
                                      u +
                                      '&signature=' +
                                      t,
                                    n
                                  )
                                )
                              )
                            })
                          }
                        )
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
            i.default.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
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
          return Promise.resolve(c(t.signer, e, n)).then(function (r) {
            return Promise.resolve(
              i.default.get(t.baseURL + '/getLink', {
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
          return Promise.resolve(i.default.post(this.baseURL + '/register', e))
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getHistory = function (e, t, n) {
        void 0 === e && (e = 1), void 0 === t && (t = 25)
        try {
          var r = this
          return Promise.resolve(
            y(
              function () {
                return Promise.resolve(r.signer.getAddress()).then(function (a) {
                  var o = Math.round(Date.now() / 1e3)
                  return Promise.resolve(c(r.signer, '', o)).then(function (s) {
                    return Promise.resolve(
                      i.default.get(
                        r.baseURL +
                          '/getHistory?userAddress=' +
                          a +
                          '&nonce=' +
                          o +
                          '&signature=' +
                          s +
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
  })()),
    (e.getSignedHash = c)
})
//# sourceMappingURL=lib.umd.js.map
