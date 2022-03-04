import { 
    GET_SERVICE_DETAILS,
    CLEAR_SERVICE_DETAILS,
    UPDATE_SERVICE_DETAILS
} from '../actions/types.js';


const initialServiceDetails = {
    oid: null, 
    name: null,
    creationDate: null, 
    status: null,
    exercises: [],
    loaded: false
}

const initialState = initialServiceDetails;


export default function ServiceDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICE_DETAILS:
            return {
                ...state,
                oid: action.payload.oid,
                name: action.payload.name,
                creationDate: action.payload.creation_date,
                exercises: action.payload.exercises,
                status: action.payload.status,
                loaded: true
            };
        case UPDATE_SERVICE_DETAILS:
            return {
                ...state,
                name: action.payload.name,
                creationDate: action.payload.creation_date,
                exercises: action.payload.exercises,
                status: action.payload.status,
                loaded: true
            };
        case CLEAR_SERVICE_DETAILS:
            return initialServiceDetails;
        default:
            return state;
    }
}

