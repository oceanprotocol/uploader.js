var e = require('axios'),
  t = require('form-data'),
  r = require('ethers'),
  n = require('validator'),
  i = require('fs')
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var s = /*#__PURE__*/ o(e),
  a = /*#__PURE__*/ o(t),
  u = /*#__PURE__*/ o(n),
  c = /*#__PURE__*/ o(i)
function f() {
  return (
    (f = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    f.apply(this, arguments)
  )
}
var d = function (e, t, n) {
  try {
    var i = r.sha256(r.toUtf8Bytes(t + n.toString()))
    return Promise.resolve(e.signMessage(r.ethers.getBytes(i)))
  } catch (e) {
    return Promise.reject(e)
  }
}
;(exports.DBSClient = /*#__PURE__*/ (function () {
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
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!u.default.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (t.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: c.default.statSync(e).size }
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
    (t.getQuote = function (e, t, r, n, i, o) {
      try {
        if (!i && !o) throw new Error('Either filePath or fileInfo must be provided.')
        var a = o || this.getFileSizes(i)
        return Promise.resolve(
          s.default.post(this.baseURL + '/getQuote', {
            type: e,
            files: a,
            duration: t,
            payment: r,
            userAddress: n
          })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.upload = function (e, t) {
      try {
        var r = this
        return Promise.resolve(
          (function (n, i) {
            try {
              var o =
                ((u = Date.now()),
                Promise.resolve(d(r.signer, e, u)).then(function (n) {
                  var i = new a.default()
                  return (
                    t.forEach(function (e, t) {
                      i.append('file' + t, e, { filename: 'file' + t + '.bin' })
                    }),
                    Promise.resolve(
                      s.default.post(r.baseURL + '/upload', i, {
                        params: { quoteId: e, nonce: u, signature: n },
                        headers: f({}, i.getHeaders(), {
                          'Content-Type': 'multipart/form-data'
                        })
                      })
                    )
                  )
                }))
            } catch (e) {
              return i(e)
            }
            var u
            return o && o.then ? o.then(void 0, i) : o
          })(0, function (e) {
            throw (console.error('Error:', e), e)
          })
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getStatus = function (e) {
      try {
        return Promise.resolve(
          s.default.post(this.baseURL + '/getStatus', { quoteId: e })
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
        return Promise.resolve(d(t.signer, e, r)).then(function (n) {
          return Promise.resolve(
            s.default.post(t.baseURL + '/getLink', null, {
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
        return Promise.resolve(s.default.post(this.baseURL + '/register', e)).then(
          function () {}
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    e
  )
})()),
  (exports.getSignedHash = d)
//# sourceMappingURL=lib.js.map
