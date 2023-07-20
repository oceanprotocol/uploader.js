import e from 'axios'
import t from 'form-data'
import { sha256 as r, toUtf8Bytes as n, ethers as o } from 'ethers'
import i from 'validator'
var s = function (e, t, i) {
    try {
      var s = r(n(t + i.toString()))
      return Promise.resolve(e.signMessage(o.getBytes(s)))
    } catch (e) {
      return Promise.reject(e)
    }
  },
  a = /*#__PURE__*/ (function () {
    function r(e, t) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = t)
    }
    var n = r.prototype
    return (
      (n.validateBaseURL = function (e) {
        if (!e || 'string' != typeof e || '' === e.trim())
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!i.isURL(e)) throw new Error('Invalid baseURL format provided.')
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
      (n.getQuote = function (t) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/getQuote', t)).then(function (
            e
          ) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.upload = function (r, n) {
        var o = this
        return Promise.resolve(
          (function (i, a) {
            try {
              var u =
                ((c = Date.now()),
                Promise.resolve(s(o.signer, r, c)).then(function (i) {
                  var s = new t()
                  return (
                    n.forEach(function (e, t) {
                      s.append('file' + t, e)
                    }),
                    Promise.resolve(
                      e.post(o.baseURL + '/upload', s, {
                        params: { quoteId: r, nonce: c, signature: i },
                        headers: { 'Content-Type': 'multipart/form-data' }
                      })
                    )
                  )
                }))
            } catch (e) {
              return e
            }
            var c
            return u && u.then
              ? u.then(void 0, function (e) {
                  return e
                })
              : u
          })()
        )
      }),
      (n.getQuoteAndUpload = function (e) {
        try {
          var t = this
          return Promise.resolve(t.getQuote(e)).then(function (r) {
            return Promise.resolve(t.upload(r.quoteId, e.files))
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (n.getStatus = function (t) {
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
      (n.getLink = function (t) {
        try {
          var r = this,
            n = Date.now()
          return Promise.resolve(s(r.signer, t, n)).then(function (o) {
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
      (n.registerMicroservice = function (t) {
        try {
          return Promise.resolve(e.post(this.baseURL + '/register', t)).then(
            function () {}
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      r
    )
  })()
export { a as DBSClient, s as getSignedHash }
//# sourceMappingURL=lib.module.js.map
