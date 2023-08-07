!(function (e, r) {
  'object' == typeof exports && 'undefined' != typeof module
    ? r(
        exports,
        require('ethers'),
        require('axios'),
        require('validator'),
        require('fs'),
        require('form-data')
      )
    : 'function' == typeof define && define.amd
    ? define(['exports', 'ethers', 'axios', 'validator', 'fs', 'form-data'], r)
    : r(((e || self).dbs = {}), e.ethers, e.axios, e.validator, e.fs, e.formData)
})(this, function (e, r, t, n, o, i) {
  function a(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var s = /*#__PURE__*/ a(t),
    u = /*#__PURE__*/ a(n),
    f = /*#__PURE__*/ a(o),
    c = /*#__PURE__*/ a(i)
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
  var l = [
      'function approve(address, uint256) external returns (bool)',
      'function balanceOf(address owner) external view returns (uint256)'
    ],
    h = function (e, t, n) {
      try {
        var o = r.sha256(r.toUtf8Bytes(t + n.toString()))
        return Promise.resolve(e.signMessage(o))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  function v(e, r) {
    try {
      var t = e()
    } catch (e) {
      return r(e)
    }
    return t && t.then ? t.then(void 0, r) : t
  }
  ;(e.DBSClient = /*#__PURE__*/ (function () {
    function e(e, r) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = r)
    }
    var t = e.prototype
    return (
      (t.validateBaseURL = function (e) {
        if (!e || 'string' != typeof e || '' === e.trim())
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!u.default.isURL(e, { require_tld: !1 }))
          throw new Error('Invalid baseURL format provided.')
      }),
      (t.getFileSizes = function (e) {
        return e.map(function (e) {
          return { length: f.default.statSync(e).size }
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
      (t.upload = function (e, t, n) {
        try {
          var o = this
          return Promise.resolve(
            v(
              function () {
                var i = Math.round(Date.now() / 1e3)
                return Promise.resolve(o.signer.getAddress()).then(function (a) {
                  var u = new r.Contract(t, l, o.signer)
                  return Promise.resolve(u.approve(a, r.MaxInt256)).then(function (r) {
                    return Promise.resolve(r.wait()).then(function () {
                      return Promise.resolve(h(o.signer, e, i)).then(function (r) {
                        var t = new c.default()
                        return (
                          n.forEach(function (e, r) {
                            t.append('file' + (r + 1), f.default.createReadStream(e))
                          }),
                          Promise.resolve(
                            s.default.post(
                              o.baseURL +
                                '/upload?quoteId=' +
                                e +
                                '&nonce=' +
                                i +
                                '&signature=' +
                                r,
                              t,
                              { headers: d({}, t.getHeaders()) }
                            )
                          )
                        )
                      })
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
      (t.uploadBrowser = function (e, t, n) {
        try {
          var o = this
          return Promise.resolve(
            v(
              function () {
                var i = Math.round(Date.now() / 1e3)
                return Promise.resolve(o.signer.getAddress()).then(function (a) {
                  var u = new r.Contract(t, l, o.signer)
                  return Promise.resolve(u.approve(a, r.MaxInt256)).then(function (r) {
                    return Promise.resolve(r.wait()).then(function () {
                      return Promise.resolve(h(o.signer, e, i)).then(function (r) {
                        var t = new c.default()
                        return (
                          Array.from(n).forEach(function (e, r) {
                            t.append('file' + (r + 1), e.stream, {
                              knownLength: e.size,
                              filename: e.name,
                              contentType: e.type
                            })
                          }),
                          Promise.resolve(
                            s.default.post(
                              o.baseURL +
                                '/upload?quoteId=' +
                                e +
                                '&nonce=' +
                                i +
                                '&signature=' +
                                r,
                              t,
                              { headers: d({}, t.getHeaders()) }
                            )
                          )
                        )
                      })
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
          return Promise.resolve(h(r.signer, e, t)).then(function (n) {
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
      e
    )
  })()),
    (e.getSignedHash = h),
    (e.minErc20Abi = l)
})
//# sourceMappingURL=lib.umd.js.map
