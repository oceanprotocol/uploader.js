var e = require('axios'),
  t = require('ethers'),
  r = require('validator'),
  n = require('fs'),
  i = require('form-data')
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var a = /*#__PURE__*/ o(e),
  s = /*#__PURE__*/ o(r),
  u = /*#__PURE__*/ o(n),
  c = /*#__PURE__*/ o(i)
function f() {
  return (
    (f = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t]
            for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
          }
          return e
        }),
    f.apply(this, arguments)
  )
}
var d = function (e, r, n) {
  try {
    var i = t.sha256(t.toUtf8Bytes(r + n.toString()))
    return Promise.resolve(e.signMessage(t.ethers.getBytes(i)))
  } catch (e) {
    return Promise.reject(e)
  }
}
;(exports.DBSClient = /*#__PURE__*/ (function () {
  function e(e, t) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = t)
  }
  var t = e.prototype
  return (
    (t.validateBaseURL = function (e) {
      if (!e || 'string' != typeof e || '' === e.trim())
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!s.default.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (t.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: u.default.statSync(e).size }
      })
    }),
    (t.getStorageInfo = function () {
      try {
        return Promise.resolve(a.default.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getQuote = function (e) {
      try {
        if (!e.filePath && !e.fileInfo)
          throw new Error('Either filePath or fileInfo must be provided.')
        var t = e.fileInfo || this.getFileSizes(e.filePath)
        return Promise.resolve(
          a.default.post(this.baseURL + '/getQuote', {
            type: e.type,
            files: t,
            duration: e.duration,
            payment: e.payment,
            userAddress: e.userAddress
          })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.upload = function (e, t) {
      try {
        var r = this
        return Promise.resolve(
          (function (n, i) {
            try {
              var o =
                ((s = Math.round(Date.now() / 1e3)),
                Promise.resolve(d(r.signer, e, s)).then(function (n) {
                  var i = new c.default()
                  return (
                    t.forEach(function (e, t) {
                      i.append('file' + (t + 1), u.default.createReadStream(e))
                    }),
                    Promise.resolve(
                      a.default.post(
                        r.baseURL +
                          '/upload?quoteId=' +
                          e +
                          '&nonce=' +
                          s +
                          '&signature=' +
                          n,
                        i,
                        { headers: f({}, i.getHeaders()) }
                      )
                    ).then(function (e) {
                      return e.data
                    })
                  )
                }))
            } catch (e) {
              return i(e)
            }
            var s
            return o && o.then ? o.then(void 0, i) : o
          })(0, function (e) {
            throw (console.error('Error:', e), e)
          })
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (t.getStatus = function (e) {
      try {
        return Promise.resolve(
          a.default.post(this.baseURL + '/getStatus', { quoteId: e })
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
        return Promise.resolve(d(t.signer, e, r)).then(function (n) {
          return Promise.resolve(
            a.default.post(t.baseURL + '/getLink', null, {
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
        return Promise.resolve(a.default.post(this.baseURL + '/register', e)).then(
          function () {}
        )
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    e
  )
})()),
  (exports.getSignedHash = d)
//# sourceMappingURL=lib.js.map
