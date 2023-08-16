var e = require('ethers'),
  r = require('axios'),
  t = require('validator'),
  n = require('fs'),
  o = require('form-data')
function i(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var s = /*#__PURE__*/ i(r),
  a = /*#__PURE__*/ i(t),
  u = /*#__PURE__*/ i(n),
  c = /*#__PURE__*/ i(o)
function d() {
  return (
    (d = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r]
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          }
          return e
        }),
    d.apply(this, arguments)
  )
}
var f = [
    'function approve(address, uint256) external returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)'
  ],
  l = function (r, t, n) {
    try {
      var o = e.sha256(e.toUtf8Bytes(t + n.toString()))
      return Promise.resolve(r.signMessage(o))
    } catch (e) {
      return Promise.reject(e)
    }
  }
function h(e, r) {
  try {
    var t = e()
  } catch (e) {
    return r(e)
  }
  return t && t.then ? t.then(void 0, r) : t
}
;(exports.DBSClient = /*#__PURE__*/ (function () {
  function r(e, r, t) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.dbsAddress = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = t),
      (this.dbsAddress = r)
  }
  var t = r.prototype
  return (
    (t.validateBaseURL = function (e) {
      if (!e || 'string' != typeof e || '' === e.trim())
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!a.default.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (t.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: u.default.statSync(e).size }
      })
    }),
    (t.getStorageInfo = function () {
      try {
        return Promise.resolve(s.default.get(this.baseURL + '/')).then(function (e) {
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
        var r = e.fileInfo || this.getFileSizes(e.filePath)
        return Promise.resolve(
          s.default.post(this.baseURL + '/getQuote', {
            type: e.type,
            files: r,
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
    (t.upload = function (r, t, n) {
      try {
        var o = this
        return Promise.resolve(
          h(
            function () {
              var i = Math.round(Date.now() / 1e3),
                a = new e.Contract(t, f, o.signer)
              return Promise.resolve(a.approve(o.dbsAddress, e.MaxInt256)).then(function (
                e
              ) {
                return Promise.resolve(e.wait()).then(function () {
                  return Promise.resolve(l(o.signer, r, i)).then(function (e) {
                    var t = new c.default()
                    return (
                      n.forEach(function (e, r) {
                        t.append('file' + (r + 1), u.default.createReadStream(e))
                      }),
                      Promise.resolve(
                        s.default.post(
                          o.baseURL +
                            '/upload?quoteId=' +
                            r +
                            '&nonce=' +
                            i +
                            '&signature=' +
                            e,
                          t,
                          { headers: d({}, t.getHeaders()) }
                        )
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
    (t.uploadBrowser = function (r, t, n) {
      try {
        var o = this
        return Promise.resolve(
          h(
            function () {
              var i = Math.round(Date.now() / 1e3),
                a = new e.Contract(t, f, o.signer)
              return Promise.resolve(a.approve(o.dbsAddress, e.MaxInt256)).then(
                function () {
                  return Promise.resolve(l(o.signer, r, i)).then(function (e) {
                    var t = new c.default()
                    return (
                      Array.from(n).forEach(function (e, r) {
                        t.append('file' + (r + 1), e, e.name)
                      }),
                      Promise.resolve(
                        s.default.post(
                          o.baseURL +
                            '/upload?quoteId=' +
                            r +
                            '&nonce=' +
                            i +
                            '&signature=' +
                            e,
                          t
                        )
                      )
                    )
                  })
                }
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
          s.default.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getLink = function (e) {
      try {
        var r = this,
          t = Math.round(Date.now() / 1e3)
        return Promise.resolve(l(r.signer, e, t)).then(function (n) {
          return Promise.resolve(
            s.default.get(r.baseURL + '/getLink', {
              params: { quoteId: e, nonce: t, signature: n }
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
        return Promise.resolve(s.default.post(this.baseURL + '/register', e))
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getHistory = function () {
      try {
        var e = this
        return Promise.resolve(
          h(
            function () {
              return Promise.resolve(e.signer.getAddress()).then(function (r) {
                var t = Math.round(Date.now() / 1e3)
                return Promise.resolve(l(e.signer, '', t)).then(function (n) {
                  return Promise.resolve(
                    s.default.get(
                      e.baseURL +
                        '/getHistory?userAddress=' +
                        r +
                        '&nonce=' +
                        t +
                        '&signature=' +
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
    r
  )
})()),
  (exports.getSignedHash = l),
  (exports.minErc20Abi = f)
//# sourceMappingURL=lib.js.map
