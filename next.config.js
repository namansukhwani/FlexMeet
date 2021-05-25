const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
    images: {
        domains: []
    },
    pwa: {
        dest: 'public',
        runtimeCaching,
    },
})