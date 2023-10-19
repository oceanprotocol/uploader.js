import { sha256 as e, toUtf8Bytes as r, Contract as t } from 'ethers'
import n from 'axios'
import o from 'validator'
import i from 'fs'
import s from 'form-data'
function a() {
  return (
    (a = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var r = 1; r < arguments.length; r++) {
            var t = arguments[r]
            for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
          }
          return e
        }),
    a.apply(this, arguments)
  )
}
var u = [
    'function approve(address, uint256) external returns (bool)',
    'function balanceOf(address owner) external view returns (uint256)'
  ],
  c = function (t, n, o) {
    try {
      var i = e(r(n + o.toString()))
      return Promise.resolve(t.signMessage(i))
    } catch (e) {
      return Promise.reject(e)
    }
  }
function f(e, r) {
  try {
    var t = e()
  } catch (e) {
    return r(e)
  }
  return t && t.then ? t.then(void 0, r) : t
}
var d = /*#__PURE__*/ (function () {
  function e(e, r, t) {
    ;(this.baseURL = void 0),
      (this.signer = void 0),
      (this.uploaderAddress = void 0),
      this.validateBaseURL(e),
      (this.baseURL = e),
      (this.signer = t),
      (this.uploaderAddress = r)
  }
  var r = e.prototype
  return (
    (r.validateBaseURL = function (e) {
      if (!e || 'string' != typeof e || '' === e.trim())
        throw new Error('Invalid baseURL provided. baseURL cannot be empty or undefined.')
      if (!o.isURL(e, { require_tld: !1 }))
        throw new Error('Invalid baseURL format provided.')
    }),
    (r.getFileSizes = function (e) {
      return e.map(function (e) {
        return { length: i.statSync(e).size }
      })
    }),
    (r.getStorageInfo = function () {
      try {
        return Promise.resolve(n.get(this.baseURL + '/')).then(function (e) {
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
          n.post(this.baseURL + '/getQuote', {
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
    (r.upload = function (e, r, o, d, l) {
      try {
        var h = this
        return Promise.resolve(
          f(
            function () {
              var f = Math.round(Date.now() / 1e3),
                v = new t(r, u, h.signer)
              return Promise.resolve(
                v.approve(
                  'filecoin' === l
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : h.uploaderAddress,
                  o
                )
              ).then(function (r) {
                return Promise.resolve(r.wait()).then(function () {
                  return Promise.resolve(c(h.signer, e, f)).then(function (r) {
                    var t = new s()
                    d.forEach(function (e, r) {
                      t.append('file' + (r + 1), i.createReadStream(e))
                    })
                    var o =
                      h.baseURL +
                      '/upload?quoteId=' +
                      e +
                      '&nonce=' +
                      f +
                      '&signature=' +
                      r
                    return (
                      console.log('uploadUrl', o),
                      Promise.resolve(n.post(o, t, { headers: a({}, t.getHeaders()) }))
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
    (r.uploadBrowser = function (e, r, o, i, a) {
      try {
        var d = this
        return Promise.resolve(
          f(
            function () {
              var f = Math.round(Date.now() / 1e3),
                l = new t(r, u, d.signer)
              return Promise.resolve(
                l.approve(
                  'filecoin' === a
                    ? '0x0ff9092e55d9f6CCB0DD4C490754811bc0839866'
                    : d.uploaderAddress,
                  o
                )
              ).then(function (r) {
                return Promise.resolve(r.wait(3)).then(function (r) {
                  return (
                    console.log('transaction receipt', r),
                    Promise.resolve(c(d.signer, e, f)).then(function (r) {
                      var t = new s()
                      return (
                        Array.from(i).forEach(function (e, r) {
                          t.append('file' + (r + 1), e, e.name)
                        }),
                        Promise.resolve(
                          n.post(
                            d.baseURL +
                              '/upload?quoteId=' +
                              e +
                              '&nonce=' +
                              f +
                              '&signature=' +
                              r,
                            t
                          )
                        )
                      )
                    })
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
          n.get(this.baseURL + '/getStatus', { params: { quoteId: e } })
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
        return Promise.resolve(c(r.signer, e, t)).then(function (o) {
          return Promise.resolve(
            n.get(r.baseURL + '/getLink', {
              params: { quoteId: e, nonce: t, signature: o }
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
        return Promise.resolve(n.post(this.baseURL + '/register', e))
      } catch (e) {
        return Promise.reject(e)
      }
    }),
    (r.getHistory = function (e, r, t) {
      void 0 === e && (e = 1), void 0 === r && (r = 25)
      try {
        var o = this
        return Promise.resolve(
          f(
            function () {
              return Promise.resolve(o.signer.getAddress()).then(function (i) {
                var s = Math.round(Date.now() / 1e3)
                return Promise.resolve(c(o.signer, '', s)).then(function (a) {
                  return Promise.resolve(
                    n.get(
                      o.baseURL +
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
export { d as UploaderClient, c as getSignedHash, u as minErc20Abi }
//# sourceMappingURL=lib.module.js.map
