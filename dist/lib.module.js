import e from 'axios'
import r from 'form-data'
import { sha256 as t, toUtf8Bytes as n, ethers as o } from 'ethers'
import i from 'validator'
import s from 'fs'
function a() {
  return (
    (a = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r]
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          }
          return e
        }),
    a.apply(this, arguments)
  )
}
var u = function (e, r, i) {
    try {
      var s = t(n(r + i.toString()))
      return Promise.resolve(e.signMessage(o.getBytes(s)))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  c = /*#__PURE__*/ (function () {
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
      (n.getFileSizes = function (e) {
        return e.map(function (e) {
          return { length: s.statSync(e).size }
        })
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
      (n.getQuote = function (r, t, n, o, i, s) {
        try {
          if (!i && !s) throw new Error('Either filePath or fileInfo must be provided.')
          var a = s || this.getFileSizes(i)
          return Promise.resolve(
            e.post(this.baseURL + '/getQuote', {
              type: r,
              files: a,
              duration: t,
              payment: n,
              userAddress: o
            })
          ).then(function (e) {
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
            (function (i, s) {
              try {
                var c =
                  ((f = Date.now()),
                  Promise.resolve(u(o.signer, t, f)).then(function (i) {
                    var s = new r()
                    return (
                      n.forEach(function (e, r) {
                        s.append('file' + r, e, { filename: 'file' + r + '.bin' })
                      }),
                      Promise.resolve(
                        e.post(o.baseURL + '/upload', s, {
                          params: { quoteId: t, nonce: f, signature: i },
                          headers: a({}, s.getHeaders(), {
                            'Content-Type': 'multipart/form-data'
                          })
                        })
                      )
                    )
                  }))
              } catch (e) {
                return s(e)
              }
              var f
              return c && c.then ? c.then(void 0, s) : c
            })(0, function (e) {
              throw (console.error('Error:', e), e)
            })
          )
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
          return Promise.resolve(u(t.signer, r, n)).then(function (o) {
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
export { c as DBSClient, u as getSignedHash }
//# sourceMappingURL=lib.module.js.map
