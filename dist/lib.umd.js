!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('axios'),
        require('form-data'),
        require('ethers'),
        require('validator')
      )
    : 'function' == typeof define && define.amd
    ? define(['exports', 'axios', 'form-data', 'ethers', 'validator'], t)
    : t(((e || self).dbs = {}), e.axios, e.formData, e.ethers, e.validator)
})(this, function (e, t, r, n, o) {
  function i(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var a = /*#__PURE__*/ i(t),
    s = /*#__PURE__*/ i(r),
    u = /*#__PURE__*/ i(o)
  function c() {
    return (
      (c = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t]
              for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
          }),
      c.apply(this, arguments)
    )
  }
  var f = function (e, t, r) {
    try {
      var o = n.sha256(n.toUtf8Bytes(t + r.toString()))
      return Promise.resolve(e.signMessage(n.ethers.getBytes(o)))
    } catch (e) {
      return Promise.reject(e)
    }
  }
  ;(e.DBSClient = /*#__PURE__*/ (function () {
    function e(e, t) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = t)
    }
    var t = e.prototype
    return (
      (t.validateBaseURL = function (e) {
        if (!e || 'string' != typeof e || '' === e.trim())
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!u.default.isURL(e)) throw new Error('Invalid baseURL format provided.')
      }),
      (t.getStorageInfo = function () {
        try {
          return Promise.resolve(a.default.get(this.baseURL + '/')).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getQuote = function (e) {
        try {
          return Promise.resolve(a.default.post(this.baseURL + '/getQuote', e)).then(
            function (e) {
              return e.data
            }
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.upload = function (e, t) {
        try {
          var r = this
          return Promise.resolve(
            (function (n, o) {
              try {
                var i =
                  ((u = Date.now()),
                  Promise.resolve(f(r.signer, e, u)).then(function (n) {
                    var o = new s.default()
                    return (
                      t.forEach(function (e, t) {
                        o.append('file' + t, e, { filename: 'file' + t + '.bin' })
                      }),
                      Promise.resolve(
                        a.default.post(r.baseURL + '/upload', o, {
                          params: { quoteId: e, nonce: u, signature: n },
                          headers: c({}, o.getHeaders(), {
                            'Content-Type': 'multipart/form-data'
                          })
                        })
                      )
                    )
                  }))
              } catch (e) {
                return o(e)
              }
              var u
              return i && i.then ? i.then(void 0, o) : i
            })(0, function (e) {
              throw (console.error('Error:', e), e)
            })
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getQuoteAndUpload = function (e) {
        try {
          var t = this
          return Promise.resolve(t.getQuote(e)).then(function (r) {
            return Promise.resolve(t.upload(r.quoteId, e.files))
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getStatus = function (e) {
        try {
          return Promise.resolve(
            a.default.post(this.baseURL + '/getStatus', { quoteId: e })
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
            r = Date.now()
          return Promise.resolve(f(t.signer, e, r)).then(function (n) {
            return Promise.resolve(
              a.default.post(t.baseURL + '/getLink', null, {
                params: { quoteId: e, nonce: r, signature: n }
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
          return Promise.resolve(a.default.post(this.baseURL + '/register', e)).then(
            function () {}
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      e
    )
  })()),
    (e.getSignedHash = f)
})
//# sourceMappingURL=lib.umd.js.map
