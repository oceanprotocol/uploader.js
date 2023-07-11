var e = require('axios'),
  t = require('form-data'),
  r = require('ethers')
function n(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var o = /*#__PURE__*/ n(e),
  s = /*#__PURE__*/ n(t),
  i = function (e, t, n) {
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
      (this.baseURL = e),
      (this.signer = t)
  }
  var t = e.prototype
  return (
    (t.getStorageInfo = function () {
      try {
        return Promise.resolve(o.default.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getQuote = function (e) {
      try {
        return Promise.resolve(o.default.post(this.baseURL + '/getQuote', e)).then(
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
        var r = this,
          n = Date.now()
        return Promise.resolve(i(r.signer, e, n)).then(function (i) {
          var u = new s.default()
          return (
            t.forEach(function (e, t) {
              u.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
            }),
            Promise.resolve(
              o.default.post(r.baseURL + '/upload', u, {
                params: { quoteId: e, nonce: n, signature: i },
                headers: { 'Content-Type': 'multipart/form-data' }
              })
            ).then(function () {})
          )
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getQuoteAndUpload = function (e) {
      try {
        var t = this
        return Promise.resolve(t.getQuote(e)).then(function (r) {
          return Promise.resolve(t.upload(r.quoteId, e.files)).then(function () {
            return r
          })
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getStatus = function (e) {
      try {
        return Promise.resolve(
          o.default.post(this.baseURL + '/getStatus', { quoteId: e })
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
        return Promise.resolve(i(t.signer, e, r)).then(function (n) {
          return Promise.resolve(
            o.default.post(t.baseURL + '/getLink', null, {
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
        return Promise.resolve(o.default.post(this.baseURL + '/register', e)).then(
          function () {}
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    e
  )
})()),
  (exports.getSignedHash = i)
//# sourceMappingURL=lib.js.map
