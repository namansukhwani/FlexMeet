import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUser } from '../../services/fetchService'

const initialState = {
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
        }
    }
})

export const { addUser, loadingUser, errUser } = user.actions;
export default user.reducer;