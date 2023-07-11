!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('axios'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'axios'], t)
    : t(((e || self).dbs = {}), e.axios)
})(this, function (e, t) {
  function r(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var n = /*#__PURE__*/ r(t)
  e.DBSClient = /*#__PURE__*/ (function () {
    function e(e) {
      ;(this.baseURL = void 0), (this.baseURL = e)
    }
    var t = e.prototype
    return (
      (t.getStorageInfo = function () {
        try {
          return Promise.resolve(n.default.get(this.baseURL + '/')).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getQuote = function (e) {
        try {
          return Promise.resolve(n.default.post(this.baseURL + '/getQuote', e)).then(
            function (e) {
              return e.data
            }
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.upload = function (e, t, r, o) {
        try {
          var i = new FormData()
          return (
            o.forEach(function (e, t) {
              i.append('file' + t, new Blob([new ArrayBuffer(e.length)]))
            }),
            Promise.resolve(
              n.default.post(this.baseURL + '/upload', i, {
                params: { quoteId: e, nonce: t, signature: r },
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
            n.default.post(this.baseURL + '/getStatus', { quoteId: e })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getLink = function (e, t, r) {
        try {
          return Promise.resolve(
            n.default.post(this.baseURL + '/getLink', null, {
              params: { quoteId: e, nonce: t, signature: r }
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
          return Promise.resolve(n.default.post(this.baseURL + '/register', e)).then(
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
