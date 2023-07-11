!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('axios'), require('form-data'), require('ethers'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'axios', 'form-data', 'ethers'], t)
    : t(((e || self).dbs = {}), e.axios, e.formData, e.ethers)
})(this, function (e, t, r, n) {
  function o(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var i = /*#__PURE__*/ o(t),
    s = /*#__PURE__*/ o(r),
    u = function (e, t, r) {
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
        (this.baseURL = e),
        (this.signer = t)
    }
    var t = e.prototype
    return (
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
          var r = this,
            n = Date.now()
          return Promise.resolve(u(r.signer, e, n)).then(function (o) {
            var u = new s.default()
            return (
              t.forEach(function (e, t) {
                u.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
              }),
              Promise.resolve(
                i.default.post(r.baseURL + '/upload', u, {
                  params: { quoteId: e, nonce: n, signature: o },
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
          return Promise.resolve(u(t.signer, e, r)).then(function (n) {
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
    (e.getSignedHash = u)
})
//# sourceMappingURL=lib.umd.js.map
