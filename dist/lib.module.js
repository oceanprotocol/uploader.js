import t from 'axios'
var e = /*#__PURE__*/ (function () {
  function e(t) {
    ;(this.baseURL = void 0), (this.baseURL = t)
  }
  var r = e.prototype
  return (
    (r.getStorageInfo = function () {
      try {
        return Promise.resolve(t.get(this.baseURL + '/')).then(function (t) {
          return t.data
        })
      } catch (t) {
        return Promise.reject(t)
      }
    }),
    (r.getQuote = function (e) {
      try {
        return Promise.resolve(t.post(this.baseURL + '/getQuote', e)).then(function (t) {
          return t.data
        })
      } catch (t) {
        return Promise.reject(t)
      }
    }),
    (r.upload = function (e, r, n, o) {
      try {
        var s = new FormData()
        return (
          o.forEach(function (t, e) {
            s.append('file' + e, new Blob([new ArrayBuffer(t.length)]))
          }),
          Promise.resolve(
            t.post(this.baseURL + '/upload', s, {
              params: { quoteId: e, nonce: r, signature: n },
              headers: { 'Content-Type': 'multipart/form-data' }
            })
          ).then(function () {})
        )
      } catch (t) {
        return Promise.reject(t)
      }
    }),
    (r.getStatus = function (e) {
      try {
        return Promise.resolve(t.post(this.baseURL + '/getStatus', { quoteId: e })).then(
          function (t) {
            return t.data
          }
        )
      } catch (t) {
        return Promise.reject(t)
      }
    }),
    (r.getLink = function (e, r, n) {
      try {
        return Promise.resolve(
          t.post(this.baseURL + '/getLink', null, {
            params: { quoteId: e, nonce: r, signature: n }
          })
        ).then(function (t) {
          return t.data
        })
      } catch (t) {
        return Promise.reject(t)
      }
    }),
    (r.registerMicroservice = function (e) {
      try {
        return Promise.resolve(t.post(this.baseURL + '/register', e)).then(function () {})
      } catch (t) {
        return Promise.reject(t)
      }
    }),
    e
  )
})()
export { e as DBSClient }
//# sourceMappingURL=lib.module.js.map
