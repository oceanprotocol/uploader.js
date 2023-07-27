!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('axios'),
        require('ethers'),
        require('validator'),
        require('fs'),
        require('form-data')
      )
    : 'function' == typeof define && define.amd
    ? define(['exports', 'axios', 'ethers', 'validator', 'fs', 'form-data'], t)
    : t(((e || self).dbs = {}), e.axios, e.ethers, e.validator, e.fs, e.formData)
})(this, function (e, t, r, n, o, i) {
  function a(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var s = /*#__PURE__*/ a(t),
    u = /*#__PURE__*/ a(n),
    f = /*#__PURE__*/ a(o),
    c = /*#__PURE__*/ a(i)
  function d() {
    return (
      (d = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var t = 1; t < arguments.length; t++) {
              var r = arguments[t]
              for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n])
            }
            return e
          }),
      d.apply(this, arguments)
    )
  }
  var l = function (e, t, n) {
    try {
      var o = r.sha256(r.toUtf8Bytes(t + n.toString()))
      return Promise.resolve(e.signMessage(r.ethers.getBytes(o)))
    } catch (e) {
      return Promise.reject(e)
    }
  }
  ;(e.DBSClient = /*#__PURE__*/ (function () {
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
          throw new Error(
            'Invalid baseURL provided. baseURL cannot be empty or undefined.'
          )
        if (!u.default.isURL(e, { require_tld: !1 }))
          throw new Error('Invalid baseURL format provided.')
      }),
      (t.getFileSizes = function (e) {
        return e.map(function (e) {
          return { length: f.default.statSync(e).size }
        })
      }),
      (t.getStorageInfo = function () {
        try {
          return Promise.resolve(s.default.get(this.baseURL + '/')).then(function (e) {
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
            s.default.post(this.baseURL + '/getQuote', {
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
            (function (n, o) {
              try {
                var i =
                  ((a = Math.round(Date.now() / 1e3)),
                  Promise.resolve(l(r.signer, e, a)).then(function (n) {
                    var o = new c.default()
                    return (
                      t.forEach(function (e, t) {
                        o.append('file' + (t + 1), f.default.createReadStream(e))
                      }),
                      Promise.resolve(
                        s.default.post(
                          r.baseURL +
                            '/upload?quoteId=' +
                            e +
                            '&nonce=' +
                            a +
                            '&signature=' +
                            n,
                          o,
                          { headers: d({}, o.getHeaders()) }
                        )
                      ).then(function (e) {
                        return e.data
                      })
                    )
                  }))
              } catch (e) {
                return o(e)
              }
              var a
              return i && i.then ? i.then(void 0, o) : i
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
            s.default.post(this.baseURL + '/getStatus', { quoteId: e })
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
          return Promise.resolve(l(t.signer, e, r)).then(function (n) {
            return Promise.resolve(
              s.default.post(t.baseURL + '/getLink', null, {
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
          return Promise.resolve(s.default.post(this.baseURL + '/register', e)).then(
            function () {}
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      e
    )
  })()),
    (e.getSignedHash = l)
})
//# sourceMappingURL=lib.umd.js.map
