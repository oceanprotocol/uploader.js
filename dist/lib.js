var e = require('axios'),
  t = require('form-data'),
  r = require('ethers'),
  n = require('validator')
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var i = /*#__PURE__*/ o(e),
  s = /*#__PURE__*/ o(t),
  a = /*#__PURE__*/ o(n)
function u() {
  return (
    (u = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    u.apply(this, arguments)
  )
}
var c = function (e, t, n) {
  try {
    var o = r.sha256(r.toUtf8Bytes(t + n.toString()))
    return Promise.resolve(e.signMessage(r.ethers.getBytes(o)))
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
      if (!a.default.isURL(e)) throw new Error('Invalid baseURL format provided.')
    }),
    (t.getStorageInfo = function () {
      try {
        return Promise.resolve(i.default.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getQuote = function (e) {
      try {
        return Promise.resolve(i.default.post(this.baseURL + '/getQuote', e)).then(
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
              var a =
                ((f = Date.now()),
                Promise.resolve(c(r.signer, e, f)).then(function (n) {
                  var o = new s.default()
                  return (
                    t.forEach(function (e, t) {
                      o.append('file' + t, e, { filename: 'file' + t + '.bin' })
                    }),
                    Promise.resolve(
                      i.default.post(r.baseURL + '/upload', o, {
                        params: { quoteId: e, nonce: f, signature: n },
                        headers: u({}, o.getHeaders(), {
                          'Content-Type': 'multipart/form-data'
                        })
                      })
                    )
                  )
                }))
            } catch (e) {
              return o(e)
            }
            var f
            return a && a.then ? a.then(void 0, o) : a
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
          i.default.post(this.baseURL + '/getStatus', { quoteId: e })
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
        return Promise.resolve(c(t.signer, e, r)).then(function (n) {
          return Promise.resolve(
            i.default.post(t.baseURL + '/getLink', null, {
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
        return Promise.resolve(i.default.post(this.baseURL + '/register', e)).then(
          function () {}
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    e
  )
})()),
  (exports.getSignedHash = c)
//# sourceMappingURL=lib.js.map
