import { 
    GET_THREAT_MODEL_DETAILS,
    CLEAR_THREAT_MODEL_DETAILS,
    COMPLETE_THREAT_MODEL
} from '../actions/types.js';


const initialThreatModelDetails = {
    oid: null,
    title: null,
    creationDate: null,
    completion_date: null,
    services: [],
    review: null,
    loaded: false,
}

const initialState = initialThreatModelDetails;


export default function ThreatModelDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_THREAT_MODEL_DETAILS:
            return {
                ...state,
                oid: action.payload.oid,
                title: action.payload.title,
                creationDate: action.payload.creation_date,
                services: action.payload.services,
                review: action.payload.review,
                completionDate: action.payload.completion_date,
                loaded: true
            };
        case CLEAR_THREAT_MODEL_DETAILS:
            return initialThreatModelDetails;
        case COMPLETE_THREAT_MODEL:
            return {
                ...state,
                completionDate: action.payload.completion_date
            };
        default:
            return state;
    }
}

