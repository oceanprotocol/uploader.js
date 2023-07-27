import e from 'axios'
import { sha256 as t, toUtf8Bytes as r, ethers as n } from 'ethers'
import o from 'validator'
import i from 'fs'
import s from 'form-data'
function a() {
  return (
    (a = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    a.apply(this, arguments)
  )
}
var u = function (e, o, i) {
    try {
      var s = t(r(o + i.toString()))
      return Promise.resolve(e.signMessage(n.getBytes(s)))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  c = /*#__PURE__*/ (function () {
    function t(e, t) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = t)
    }
    var r = t.prototype
    return (
      (r.validateBaseURL = function (e) {
        if (!e || 'string' != typeof e || '' === e.trim())
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!o.isURL(e, { require_tld: !1 }))
          throw new Error('Invalid baseURL format provided.')
      }),
      (r.getFileSizes = function (e) {
        return e.map(function (e) {
          return { length: i.statSync(e).size }
        })
      }),
      (r.getStorageInfo = function () {
        try {
          return Promise.resolve(e.get(this.baseURL + '/')).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (r.getQuote = function (t) {
        try {
          if (!t.filePath && !t.fileInfo)
            throw new Error('Either filePath or fileInfo must be provided.')
          var r = t.fileInfo || this.getFileSizes(t.filePath)
          return Promise.resolve(
            e.post(this.baseURL + '/getQuote', {
              type: t.type,
              files: r,
              duration: t.duration,
              payment: t.payment,
              userAddress: t.userAddress
            })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (r.upload = function (t, r) {
        try {
          var n = this
          return Promise.resolve(
            (function (o, c) {
              try {
                var f =
                  ((h = Math.round(Date.now() / 1e3)),
                  Promise.resolve(u(n.signer, t, h)).then(function (o) {
                    var u = new s()
                    return (
                      r.forEach(function (e, t) {
                        u.append('file' + (t + 1), i.createReadStream(e))
                      }),
                      Promise.resolve(
                        e.post(
                          n.baseURL +
                            '/upload?quoteId=' +
                            t +
                            '&nonce=' +
                            h +
                            '&signature=' +
                            o,
                          u,
                          { headers: a({}, u.getHeaders()) }
                        )
                      ).then(function (e) {
                        return e.data
                      })
                    )
                  }))
              } catch (e) {
                return c(e)
              }
              var h
              return f && f.then ? f.then(void 0, c) : f
            })(0, function (e) {
              throw (console.error('Error:', e), e)
            })
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (r.getStatus = function (t) {
        try {
          return Promise.resolve(
            e.post(this.baseURL + '/getStatus', { quoteId: t })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (r.getLink = function (t) {
        try {
          var r = this,
            n = Date.now()
          return Promise.resolve(u(r.signer, t, n)).then(function (o) {
            return Promise.resolve(
              e.post(r.baseURL + '/getLink', null, {
                params: { quoteId: t, nonce: n, signature: o }
              })
            ).then(function (e) {
              return e.data
            })
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (r.registerMicroservice = function (t) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/register', t)).then(
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
