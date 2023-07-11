!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(require('axios')))
    : 'function' == typeof define && define.amd
    ? define(['axios'], t)
    : ((e || self).dbs = t(e.axios))
})(this, function (e) {
  function t(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var r = /*#__PURE__*/ t(e) /*#__PURE__*/
  return (function () {
    function e(e) {
      ;(this.baseURL = void 0), (this.baseURL = e)
    }
    var t = e.prototype
    return (
      (t.getStorageInfo = function () {
        try {
          return Promise.resolve(r.default.get(this.baseURL + '/')).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getQuote = function (e) {
        try {
          return Promise.resolve(r.default.post(this.baseURL + '/getQuote', e)).then(
            function (e) {
              return e.data
            }
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.upload = function (e, t, n, o) {
        try {
          var u = new FormData()
          return (
            o.forEach(function (e, t) {
              u.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
            }),
            Promise.resolve(
              r.default.post(this.baseURL + '/upload', u, {
                params: { quoteId: e, nonce: t, signature: n },
                headers: { 'Content-Type': 'multipart/form-data' }
              })
            ).then(function () {})
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getStatus = function (e) {
        try {
          return Promise.resolve(
            r.default.post(this.baseURL + '/getStatus', { quoteId: e })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getLink = function (e, t, n) {
        try {
          return Promise.resolve(
            r.default.post(this.baseURL + '/getLink', null, {
              params: { quoteId: e, nonce: t, signature: n }
            })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.registerMicroservice = function (e) {
        try {
          return Promise.resolve(r.default.post(this.baseURL + '/register', e)).then(
            function () {}
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      e
    )
  })()
})
//# sourceMappingURL=lib.umd.js.map
