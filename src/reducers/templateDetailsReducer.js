import { 
    GET_TEMPLATE_DETAILS,
    CLEAR_TEMPLATE_DETAILS,
    UPDATE_TEMPLATE_DETAILS
} from '../actions/types.js';


const initialTemplateDetails = {'oid': null, 'name': null, 'requirements': [], 'loaded': false}

const initialState = initialTemplateDetails;


export default function TemplateDetailsReducer (state = initialState, action) {
    switch (action.type) {
        case GET_TEMPLATE_DETAILS:
            return {
                ...state,
                oid: action.payload.oid,
                name: action.payload.name,
                requirements: action.payload.requirements,
                loaded: true
            };
        case UPDATE_TEMPLATE_DETAILS:
            return {
                ...state,
                name: action.payload.name,
                requirements: action.payload.requirements,
                loaded: true
            };
        case CLEAR_TEMPLATE_DETAILS:
            return initialTemplateDetails;
        default:
            return state;
    }
}
