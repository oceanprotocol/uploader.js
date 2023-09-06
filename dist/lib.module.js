import { sha256 as e, toUtf8Bytes as r, Contract as t, MaxInt256 as n } from 'ethers'
import o from 'axios'
import i from 'validator'
import s from 'fs'
import a from 'form-data'
function u() {
  return (
    (u = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r]
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          }
          return e
        }),
    u.apply(this, arguments)
  )
}
var c = [
    'function approve(address, uint256) external returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)'
  ],
  f = function (t, n, o) {
    try {
      var i = e(r(n + o.toString()))
      return Promise.resolve(t.signMessage(i))
    } catch (e) {
      return Promise.reject(e)
    }
  }
function d(e, r) {
  try {
    var t = e()
  } catch (e) {
    return r(e)
  }
  return t && t.then ? t.then(void 0, r) : t
}
var h = /*#__PURE__*/ (function () {
  function e(e, r, t) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.dbsAddress = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = t),
      (this.dbsAddress = r)
  }
  var r = e.prototype
  return (
    (r.validateBaseURL = function (e) {
      if (!e || 'string' != typeof e || '' === e.trim())
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!i.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (r.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: s.statSync(e).size }
      })
    }),
    (r.getStorageInfo = function () {
      try {
        return Promise.resolve(o.get(this.baseURL + '/')).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getQuote = function (e) {
      try {
        if (!e.filePath && !e.fileInfo)
          throw new Error('Either filePath or fileInfo must be provided.')
        var r = e.fileInfo || this.getFileSizes(e.filePath)
        return Promise.resolve(
          o.post(this.baseURL + '/getQuote', {
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
    (r.upload = function (e, r, i, h) {
      try {
        var l = this
        return Promise.resolve(
          d(
            function () {
              var d = Math.round(Date.now() / 1e3),
                v = new t(r, c, l.signer)
              return Promise.resolve(
                v.approve(
                  'filecoin' === h
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : l.dbsAddress,
                  n
                )
              ).then(function (r) {
                return Promise.resolve(r.wait()).then(function () {
                  return Promise.resolve(f(l.signer, e, d)).then(function (r) {
                    var t = new a()
                    i.forEach(function (e, r) {
                      t.append('file' + (r + 1), s.createReadStream(e))
                    })
                    var n =
                      l.baseURL +
                      '/upload?quoteId=' +
                      e +
                      '&nonce=' +
                      d +
                      '&signature=' +
                      r
                    return (
                      console.log('uploadUrl', n),
                      Promise.resolve(o.post(n, t, { headers: u({}, t.getHeaders()) }))
                    )
                  })
                })
              })
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
    (r.uploadBrowser = function (e, r, i, s) {
      try {
        var u = this
        return Promise.resolve(
          d(
            function () {
              var d = Math.round(Date.now() / 1e3),
                h = new t(r, c, u.signer)
              return Promise.resolve(
                h.approve(
                  'filecoin' === s
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : u.dbsAddress,
                  n
                )
              ).then(function () {
                return Promise.resolve(f(u.signer, e, d)).then(function (r) {
                  var t = new a()
                  return (
                    Array.from(i).forEach(function (e, r) {
                      t.append('file' + (r + 1), e, e.name)
                    }),
                    Promise.resolve(
                      o.post(
                        u.baseURL +
                          '/upload?quoteId=' +
                          e +
                          '&nonce=' +
                          d +
                          '&signature=' +
                          r,
                        t
                      )
                    )
                  )
                })
              })
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
    (r.getStatus = function (e) {
      try {
        return Promise.resolve(
          o.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
        ).then(function (e) {
          return e.data
        })
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getLink = function (e) {
      try {
        var r = this,
          t = Math.round(Date.now() / 1e3)
        return Promise.resolve(f(r.signer, e, t)).then(function (n) {
          return Promise.resolve(
            o.get(r.baseURL + '/getLink', {
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
    (r.registerMicroservice = function (e) {
      try {
        return Promise.resolve(o.post(this.baseURL + '/register', e))
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getHistory = function (e, r, t) {
      void 0 === e && (e = 1), void 0 === r && (r = 25)
      try {
        var n = this
        return Promise.resolve(
          d(
            function () {
              return Promise.resolve(n.signer.getAddress()).then(function (i) {
                var s = Math.round(Date.now() / 1e3)
                return Promise.resolve(f(n.signer, '', s)).then(function (a) {
                  return Promise.resolve(
                    o.get(
                      n.baseURL +
                        '/getHistory?userAddress=' +
                        i +
                        '&nonce=' +
                        s +
                        '&signature=' +
                        a +
                        '&page=' +
                        e +
                        '&pageSize=' +
                        r +
                        '&storage=' +
                        t
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
})()
export { h as DBSClient, f as getSignedHash, c as minErc20Abi }
//# sourceMappingURL=lib.module.js.map
