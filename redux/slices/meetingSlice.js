import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { } from '../../services/fetchService'
import { createToast } from './../../components/extraComponents';

const initialState = {
    roomId: "",
    users: [],
    baned: [],
    currentParticipants: [],
    title: "",
    description: "",
    hostRightsUser: [],
    hostId: "",
    password: "",
    secured: false,
    userPermissions: ['audio', 'video', 'screen'],
    meetingDateTime: new Date(),
    allStreams: [],
    isLoading: true,
    err: null
}

const meeting = createSlice({
    name: 'meeting',
    initialState,
    reducers: {
        addMeeting(state, action) {
            state.isLoading = false;
        },
        addStream(state, action) {
            state.allStreams.push(action.payload);
        },
        deleteStream(state, action) {
            // state.allStreams.filter(stream => stream.id !== action.payload.socketId)
            console.log(state.allStreams.length);
            for (var i = 0; i < state.allStreams.length; i++) {
                if (state.allStreams[i].id == action.payload.socketId) {
                    state.allStreams.splice(i, 1);
                    break;
                }
            }
        },
        updateMeetingParticipants(state, action) {
            state.isLoading = false;
        },
        loadingMeeting(state) {
            state.isLoading = true;
        },
        deleteMeeting: () => initialState,
        errMeeting(state, action) {
            state.err = action.payload
        }
    },
    extraReducers: {

    }
})

export const { addMeeting, addStream, deleteMeeting, deleteStream, updateMeetingParticipants, loadingMeeting, errMeeting } = meeting.actions;
export default meeting.reducer;