import * as actionTypes from './actionTypes';
import { updateObject } from './utility';

const initialState = {
    sample: [],
    meetingName: '',
    meetingDate: '',
    meetingStartTime: '',
    meetingEndTime: '',
    meetingID: '',
    orgName: '',
    orgId: ''
}

const initState = () => {
    return initialState;
}

const sendMeetingData = (state, action) => {
    return updateObject(state, {
        meetingName: action.meetingName,
        meetingDate: action.meetingDate,
        meetingStartTime: action.meetingStartTime,
        meetingEndTime: action.meetingEndTime,
        meetingID: state.meetingID
    })
}

const sendData = (state, action) => {
    return updateObject(state, {
        orgName: action.orgName,
        orgId: action.orgId
    })
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.INIT_STATE: return initState();

        case actionTypes.SEND_MEETING_DATA: return sendMeetingData(state, action);

        case actionTypes.SEND_DATA: return sendData(state, action);

    default: return state;
    }
}

export default reducer