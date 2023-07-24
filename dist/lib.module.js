import e from 'axios'
import r from 'form-data'
import { sha256 as t, toUtf8Bytes as n, ethers as o } from 'ethers'
import i from 'validator'
function s() {
  return (
    (s = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r]
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          }
          return e
        }),
    s.apply(this, arguments)
  )
}
var a = function (e, r, i) {
    try {
      var s = t(n(r + i.toString()))
      return Promise.resolve(e.signMessage(o.getBytes(s)))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  u = /*#__PURE__*/ (function () {
    function t(e, r) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = r)
    }
    var n = t.prototype
    return (
      (n.validateBaseURL = function (e) {
        if (!e || 'string' != typeof e || '' === e.trim())
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!i.isURL(e, { require_tld: !1 }))
          throw new Error('Invalid baseURL format provided.')
      }),
      (n.getStorageInfo = function () {
        try {
          return Promise.resolve(e.get(this.baseURL + '/')).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getQuote = function (r) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/getQuote', r)).then(function (
            e
          ) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.upload = function (t, n) {
        try {
          var o = this
          return Promise.resolve(
            (function (i, u) {
              try {
                var c =
                  ((f = Date.now()),
                  Promise.resolve(a(o.signer, t, f)).then(function (i) {
                    var a = new r()
                    return (
                      n.forEach(function (e, r) {
                        a.append('file' + r, e, { filename: 'file' + r + '.bin' })
                      }),
                      Promise.resolve(
                        e.post(o.baseURL + '/upload', a, {
                          params: { quoteId: t, nonce: f, signature: i },
                          headers: s({}, a.getHeaders(), {
                            'Content-Type': 'multipart/form-data'
                          })
                        })
                      )
                    )
                  }))
              } catch (e) {
                return u(e)
              }
              var f
              return c && c.then ? c.then(void 0, u) : c
            })(0, function (e) {
              throw (console.error('Error:', e), e)
            })
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getQuoteAndUpload = function (e) {
        try {
          var r = this
          return Promise.resolve(r.getQuote(e)).then(function (t) {
            return Promise.resolve(r.upload(t.quoteId, e.files))
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getStatus = function (r) {
        try {
          return Promise.resolve(
            e.post(this.baseURL + '/getStatus', { quoteId: r })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getLink = function (r) {
        try {
          var t = this,
            n = Date.now()
          return Promise.resolve(a(t.signer, r, n)).then(function (o) {
            return Promise.resolve(
              e.post(t.baseURL + '/getLink', null, {
                params: { quoteId: r, nonce: n, signature: o }
              })
            ).then(function (e) {
              return e.data
            })
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.registerMicroservice = function (r) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/register', r)).then(
            function () {}
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      t
    )
  })()
export { u as DBSClient, a as getSignedHash }
//# sourceMappingURL=lib.module.js.map
