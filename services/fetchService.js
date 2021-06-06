const url = process.env.NEXT_PUBLIC_SERVER_URL

export const wakeServer = () => {
    fetch(`${url}/wake`)
        .then(() => {
            // console.log("server is Up");
            return;
        })
        .catch(err => console.log("Error from app.js ", err))
}

export const getUser = async token => {
    // console.log("Get User is called ");
    return await fetch(`${url}/users`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
    }
    )
}

export const updateUser = async (userUpdateData, token) => {

}