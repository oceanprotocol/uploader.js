!(function (e, r) {
  'object' == typeof exports && 'undefined' != typeof module
    ? r(
        exports,
        require('ethers'),
        require('axios'),
        require('validator'),
        require('fs'),
        require('form-data')
      )
    : 'function' == typeof define && define.amd
    ? define(['exports', 'ethers', 'axios', 'validator', 'fs', 'form-data'], r)
    : r(((e || self).dbs = {}), e.ethers, e.axios, e.validator, e.fs, e.formData)
})(this, function (e, r, t, n, o, i) {
  function s(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var a = /*#__PURE__*/ s(t),
    u = /*#__PURE__*/ s(n),
    d = /*#__PURE__*/ s(o),
    f = /*#__PURE__*/ s(i)
  function c() {
    return (
      (c = Object.assign
        ? Object.assign.bind()
        : function (e) {
            for (var r = 1; r < arguments.length; r++) {
              var t = arguments[r]
              for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            return e
          }),
      c.apply(this, arguments)
    )
  }
  var l = [
      'function approve(address, uint256) external returns (bool)',
      'function balanceOf(address owner) external view returns (uint256)'
    ],
    h = function (e, t, n) {
      try {
        var o = r.sha256(r.toUtf8Bytes(t + n.toString()))
        return Promise.resolve(e.signMessage(o))
      } catch (e) {
        return Promise.reject(e)
      }
    }
  function v(e, r) {
    try {
      var t = e()
    } catch (e) {
      return r(e)
    }
    return t && t.then ? t.then(void 0, r) : t
  }
  ;(e.DBSClient = /*#__PURE__*/ (function () {
    function e(e, r, t) {
      ;(this.baseURL = void 0),
        (this.signer = void 0),
        (this.dbsAddress = void 0),
        this.validateBaseURL(e),
        (this.baseURL = e),
        (this.signer = t),
        (this.dbsAddress = r)
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
          return { length: d.default.statSync(e).size }
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
          var r = e.fileInfo || this.getFileSizes(e.filePath)
          return Promise.resolve(
            a.default.post(this.baseURL + '/getQuote', {
              type: e.type,
              files: r,
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
      (t.upload = function (e, t, n) {
        try {
          var o = this
          return Promise.resolve(
            v(
              function () {
                var i = Math.round(Date.now() / 1e3),
                  s = new r.Contract(t, l, o.signer)
                return Promise.resolve(s.approve(o.dbsAddress, r.MaxInt256)).then(
                  function (r) {
                    return Promise.resolve(r.wait()).then(function () {
                      return Promise.resolve(h(o.signer, e, i)).then(function (r) {
                        var t = new f.default()
                        n.forEach(function (e, r) {
                          t.append('file' + (r + 1), d.default.createReadStream(e))
                        })
                        var s =
                          o.baseURL +
                          '/upload?quoteId=' +
                          e +
                          '&nonce=' +
                          i +
                          '&signature=' +
                          r
                        return (
                          console.log('uploadUrl', s),
                          Promise.resolve(
                            a.default.post(s, t, { headers: c({}, t.getHeaders()) })
                          )
                        )
                      })
                    })
                  }
                )
              },
              function (e) {
                return console.error('Error:', e), e.data
              }
            )
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.uploadBrowser = function (e, t, n) {
        try {
          var o = this
          return Promise.resolve(
            v(
              function () {
                var i = Math.round(Date.now() / 1e3),
                  s = new r.Contract(t, l, o.signer)
                return Promise.resolve(s.approve(o.dbsAddress, r.MaxInt256)).then(
                  function () {
                    return Promise.resolve(h(o.signer, e, i)).then(function (r) {
                      var t = new f.default()
                      return (
                        Array.from(n).forEach(function (e, r) {
                          t.append('file' + (r + 1), e, e.name)
                        }),
                        Promise.resolve(
                          a.default.post(
                            o.baseURL +
                              '/upload?quoteId=' +
                              e +
                              '&nonce=' +
                              i +
                              '&signature=' +
                              r,
                            t
                          )
                        )
                      )
                    })
                  }
                )
              },
              function (e) {
                return console.error('Error:', e), e.data
              }
            )
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getStatus = function (e) {
        try {
          return Promise.resolve(
            a.default.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
          ).then(function (e) {
            return e.data
          })
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getLink = function (e) {
        try {
          var r = this,
            t = Math.round(Date.now() / 1e3)
          return Promise.resolve(h(r.signer, e, t)).then(function (n) {
            return Promise.resolve(
              a.default.get(r.baseURL + '/getLink', {
                params: { quoteId: e, nonce: t, signature: n }
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
          return Promise.resolve(a.default.post(this.baseURL + '/register', e))
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      (t.getHistory = function (e, r) {
        void 0 === e && (e = 1), void 0 === r && (r = 25)
        try {
          var t = this
          return Promise.resolve(
            v(
              function () {
                return Promise.resolve(t.signer.getAddress()).then(function (n) {
                  var o = Math.round(Date.now() / 1e3)
                  return Promise.resolve(h(t.signer, '', o)).then(function (i) {
                    return Promise.resolve(
                      a.default.get(
                        t.baseURL +
                          '/getHistory?userAddress=' +
                          n +
                          '&nonce=' +
                          o +
                          '&signature=' +
                          i +
                          '&page=' +
                          e +
                          '&pageSize=' +
                          r
                      )
                    ).then(function (e) {
                      if (200 !== e.status) throw new Error('Failed to retrieve history.')
                      return e.data
                    })
                  })
                })
              },
              function (e) {
                throw (console.error('An error occurred while fetching history:', e), e)
              }
            )
          )
        } catch (e) {
          return Promise.reject(e)
        }
      }),
      e
    )
  })()),
    (e.getSignedHash = h),
    (e.minErc20Abi = l)
})
//# sourceMappingURL=lib.umd.js.map
