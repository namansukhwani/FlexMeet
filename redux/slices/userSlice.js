import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser, updateProfilePic, updateUserData } from '../../services/fetchService'
import { useSession, signOut } from 'next-auth/client'
import { createToast } from './../../components/extraComponents';

const initialState = {
    userUpdating: false,
    pictureLoading: false,
    isLoading: true,
    user: null,
    err: null
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (token, thunkApi) => {

        try {
            const res = await getUser(token);
            const response = await res.json()
            console.log("redux user", response);
            if (response.status) {
                return response.data
            }
            else {
                signOut();
                const err = new Error('Unable to fetch user details')
                throw err;
            }
        }
        catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (data, thunkApi) => {
        try {
            const res = await updateUserData(data.data, data.token);
            const response = await res.json()
            // console.log("redux user profile pic update", response);
            if (response.status) {
                return response.data
            }
            else {
                const err = new Error('Unable to update user ')
                throw err;
            }
        }
        catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const updateUserPicture = createAsyncThunk(
    "user/updatePicture",
    async (data, thunkApi) => {
        try {
            const res = await updateProfilePic(data.image, data.token);
            const response = await res.json()
            // console.log("redux user profile pic update", response);
            if (response.status) {
                return response.data
            }
            else {
                const err = new Error('Unable to update user profile ')
                throw err;
            }
        }
        catch (err) {
            console.log(err);
            return thunkApi.rejectWithValue(err)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, thunkApi) => {
        thunkApi.dispatch(deleteUser());
    }
)

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            state.isLoading = false;
            state.err = null;
            state.user = action.payload
        },
        loadingUser(state) {
            state.isLoading = true;
        },
        errUser(state, action) {
            state.err = action.payload;
        },
        deleteUser(state) {
            state.err = initialState.err;
            state.isLoading = initialState.isLoading;
            state.user = initialState.user;
        }
    },
    extraReducers: {
        [fetchUser.pending]: (state, action) => {
            if (state.user == null) {
                state.isLoading = true
            }
        },
        [fetchUser.rejected]: (state, action) => {
            state.err = action.payload
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.err = null;
            state.user = action.payload
        },
        [updateUserPicture.pending]: (state, action) => {
            state.pictureLoading = true;
        },
        [updateUserPicture.fulfilled]: (state, action) => {
            state.pictureLoading = false;
            state.isLoading = false;
            state.err = null;
            state.user = action.payload
        },
        [updateUserPicture.rejected]: (state, action) => {
            state.err = action.payload
            state.pictureLoading = false;
        },
        [updateUser.pending]: (state, action) => {
            state.userUpdating = true
        },
        [updateUser.fulfilled]: (state, action) => {
            state.userUpdating = false;
            state.isLoading = false;
            state.err = null;
            state.user = action.payload
            createToast("User sucessfully updated.")
        },
        [updateUser.rejected]: (state, action) => {
            state.err = action.payload
            state.userUpdating = false;
        },

    }
})

export const { addUser, loadingUser, errUser } = user.actions;
export default user.reducer;