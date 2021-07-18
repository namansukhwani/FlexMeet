const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

if (process.env.NEXT_PUBLIC_NODE_ENV == "production") {
    module.exports = withPWA({
        images: {
            domains: [
                "dvyvvujm9h0uq.cloudfront.net",
                "i.pinimg.com",
                "i.guim.co.uk",
                "images.unsplash.com",
                "encrypted-tbn0.gstatic.com",
                "img.freepik.com",
                "lh3.googleusercontent.com",
                "storage.googleapis.com",
                "flexmeet.herokuapp.com"
            ]
        },
        pwa: {
            dest: 'public',
            runtimeCaching,
        },
        // generateEtags: false,
    })

}
else {
    module.exports = {
        images: {
            domains: [
                "dvyvvujm9h0uq.cloudfront.net",
                "i.pinimg.com",
                "i.guim.co.uk",
                "images.unsplash.com",
                "encrypted-tbn0.gstatic.com",
                "img.freepik.com",
                "lh3.googleusercontent.com",
                "storage.googleapis.com",
                "flexmeet.herokuapp.com"
            ]
        },
        // generateEtags: false,
    }
}
