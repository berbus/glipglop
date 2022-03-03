import { 
    GET_REQUIREMENTS
} from '../actions/types.js';


const initialState = {
    requirements: {},
    loaded: false
};


export default function RequirementReducer (state = initialState, action) {
    switch (action.type) {
        case GET_REQUIREMENTS:
            return {
                ...state,
                requirements: action.payload,
                loaded: true
            };
        default:
            return state;
    }
}
