import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { encode } from 'base-64';
import axios from 'axios'

const url = process.env.SERVER_URL;

const restClient=axios.create()

const providers = [
    Providers.Google({
        clientId: process.env.GOOGOLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.birthday.read ",
        authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
        // profile(profile) {
        //     return {
        //         "googleId": profile.id,
        //         "email": profile.email,
        //         "name": profile.name,
        //         "givenName": profile.given_name,
        //         "familyName": profile.family_name,
        //         "picture": profile.picture
        //     }
        // },
        debug:true
    })
]


const callbacks = {}

callbacks.signIn = async function signIn(user, account, metadata) {

    const googleUser = {
        "googleId": metadata.id,
        "email": metadata.email, 
        "name": metadata.name,
        "givenName": metadata.given_name,
        "familyName": metadata.family_name,
        "picture": metadata.picture
    }

    console.log("metaata ", metadata);
    console.log(googleUser);
    try {
        const response=await restClient.request({
            baseURL:url,
            url:"/users/login",
            method:"post",
            data:googleUser,
            auth:{
                username:process.env.BASIC_AUTH_USERNAME,
                password:process.env.BASIC_AUTH_PASSWORD
            }
        })

        const data=response.data

        if (!data?.status) {
            return false;
        }

        console.log("token from my server", data.token);

        user.accessToken = data.token;
        return true;

    }
    catch (err) {
        console.error('error from api ', err);
        console.error("Error Next Auth: ", err);
        return false;
    }
}

callbacks.jwt = async function jwt(token, user) {
    if (user) {
        token = { accessToken: user.accessToken }
    }

    return token
}

callbacks.session = async function session(session, token) {
    session.accessToken = token.accessToken
    // try {
    //     const res = await fetch(`${url}/users`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': 'Bearer ' + session.accessToken,
    //             'Content-Type': 'application/json'
    //         },
    //     })

    //     const data = await res.json()
    //     session.user = data.data;
    // }
    // catch (err) {
    //     console.log(err);
    // }

    return session
}

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
    secret: process.env.REFRESH_TOKEN_SECRET
    // debug: true
}

export default (req, res) => NextAuth(req, res, options)