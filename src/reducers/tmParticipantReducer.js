import { 
    GET_TM_PARTICIPANTS,
    CLEAR_TM_PARTICIPANTS,
    CREATE_TM_PARTICIPANT,
    DELETE_TM_PARTICIPANT,
    UPDATE_TM_PARTICIPANT
} from '../actions/types.js';


const initialState = {
    participants: [],
    loaded: false
};


export default function tmParticipantReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case GET_TM_PARTICIPANTS:
            return {
                ...state,
                participants: action.payload,
                loaded: true
            };
        case CLEAR_TM_PARTICIPANTS:
            return initialState;
        case CREATE_TM_PARTICIPANT:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                services: {...state.participants, ...newItem},
                loaded: true
            };
        case UPDATE_TM_PARTICIPANT:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                testCases: {...state.participants, ...newItem},
                loaded: true
            };
        case DELETE_TM_PARTICIPANT:
            return {
                ...state,
                services: Object.keys(state.services)
                .filter((key) => key !== action.payload.serviceId)
                .reduce((cur, key) => { 
                    return Object.assign(cur, { [key]: state.services[key] })
                }, {})
            };
        default:
            return state;
    }
}
