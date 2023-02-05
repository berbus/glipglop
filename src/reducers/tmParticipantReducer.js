import { 
    GET_TM_PARTICIPANTS,
    CLEAR_TM_PARTICIPANTS,
    CREATING_TM_PARTICIPANT,
    CREATED_TM_PARTICIPANT,
    DELETE_TM_PARTICIPANT,
    UPDATE_TM_PARTICIPANT,
    TM_PARTICIPANTS_ERROR
} from '../actions/types.js';


const initialState = {
    participants: [],
    participantCreationSuccess: null,
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
        case CREATING_TM_PARTICIPANT:
            return {
                ...state,
                participantCreationSuccess: null,
                loaded: false
            }
        case TM_PARTICIPANTS_ERROR:
            return {
                ...state,
                participantCreationSuccess: false,
                loaded: false
            }
        case CREATED_TM_PARTICIPANT:
            return {
                ...state,
                participants: [...state.participants, action.payload],
                participantCreationSuccess: true,
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
                participants: state.participants.filter(p => p['oid'] !== action.payload.participantId)
            };
        default:
            return state;
    }
}
