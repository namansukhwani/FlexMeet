const url = process.env.NEXT_PUBLIC_SERVER_URL
const peerServerUrl="https://"+process.env.NEXT_PUBLIC_PEERJS_HOST

export const wakeServer = () => {
    Promise.all([
        fetch(`${url}/wake`),
        fetch(`${peerServerUrl}/wake`)
    ])
    .then(()=>{
        return;
    })
    .catch(err => console.log("Error from app.js ", err))
}

export const getUser = async token => {
    // console.log("Get User is called ");
    return await fetch(`${url}/users`, {
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }
    )
}

export const updateUserData = async (userData, token) => {
    return await fetch(`${url}/users/update`, {
        method: 'put',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
}

export const updateProfilePic = async (image, token) => {
    const formData = new FormData();
    formData.append('file', image.image, image.image.name)

    return await fetch(`${url}/upload/profilepic`, {
        method: 'put',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
        body: formData
    })
}
