import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const providers = [
    Providers.Google({
        clientId: process.env.GOOGOLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.birthday.read ",
        // scope: 'https://www.googleapis.com/auth/userinfo.profile',
        // profile(profile) {
        //     return {
        //         ...profile
        //     }
        // },
    })
]

var users = {}

const callbacks = {}

// callbacks.signIn = async function signIn(user, account, metadata) {


//     const googleUser = {
//         ...metadata
//     }
//     users[googleUser.id] = googleUser;
//     user.id = googleUser.id
//     return true;
// }

// callbacks.session = async function session(session, token) {
//     const dbUser = users[token.id]
//     if (!dbUser) {
//         return null
//     }

//     session.user = {
//         ...dbUser
//     }

//     return session
// }

// callbacks.jwt = async function jwt(token, user) {
//     if (user) {
//         token = { id: user.id }
//     }

//     return token
// }

callbacks.redirect = async (url, baseUrl) => {
    return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl)
}

const options = {
    providers,
    callbacks,
    pages: {
        signIn: '/',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: '/me' // If set, new users will be directed here on first sign in
    },
    secret: process.env.ACCESS_TOKEN_SECRET,
    session: {
        jwt: true
    },
    jwt: {

    },
    // debug: true
}

export default (req, res) => NextAuth(req, res, options)