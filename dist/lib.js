function e(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var t = /*#__PURE__*/ e(require('axios'))
module.exports = /*#__PURE__*/ (function () {
  function e(e) {
    ;(this.baseURL = void 0), (this.baseURL = e)
  }
  var r = e.prototype
  return (
    (r.getStorageInfo = function () {
      try {
        return Promise.resolve(t.default.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getQuote = function (e) {
      try {
        return Promise.resolve(t.default.post(this.baseURL + '/getQuote', e)).then(
          function (e) {
            return e.data
          }
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.upload = function (e, r, n, o) {
      try {
        var u = new FormData()
        return (
          o.forEach(function (e, t) {
            u.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
          }),
          Promise.resolve(
            t.default.post(this.baseURL + '/upload', u, {
              params: { quoteId: e, nonce: r, signature: n },
              headers: { 'Content-Type': 'multipart/form-data' }
            })
          ).then(function () {})
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getStatus = function (e) {
      try {
        return Promise.resolve(
          t.default.post(this.baseURL + '/getStatus', { quoteId: e })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getLink = function (e, r, n) {
      try {
        return Promise.resolve(
          t.default.post(this.baseURL + '/getLink', null, {
            params: { quoteId: e, nonce: r, signature: n }
          })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.registerMicroservice = function (e) {
      try {
        return Promise.resolve(t.default.post(this.baseURL + '/register', e)).then(
          function () {}
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    e
  )
})()
//# sourceMappingURL=lib.js.map
