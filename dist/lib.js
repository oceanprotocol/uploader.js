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
      var r = this
      return Promise.resolve(
        (function (n, u) {
          try {
            var a =
              ((c = Date.now()),
              Promise.resolve(i(r.signer, e, c)).then(function (n) {
                var i = new s.default()
                return (
                  t.forEach(function (e, t) {
                    i.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
                  }),
                  Promise.resolve(
                    o.default.post(r.baseURL + '/upload', i, {
                      params: { quoteId: e, nonce: c, signature: n },
                      headers: { 'Content-Type': 'multipart/form-data' }
                    })
                  )
                )
              }))
          } catch (e) {
            return e
          }
          var c
          return a && a.then
            ? a.then(void 0, function (e) {
                return e
              })
            : a
        })()
      )
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
