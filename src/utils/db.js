let prefix = 'nfu.dev.'
// if (process.env.NODE_ENV === 'production') {
//   prefix = 'nfu.production.'
// }

const Set = (key, value) => {
  wx.setStorageSync(prefix + key, value)
}

const Get = (key) => {
  return wx.getStorageSync(prefix + key)
}

module.exports = {
  Set,
  Get
}
