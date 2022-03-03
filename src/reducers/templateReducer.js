import { 
    GET_TEMPLATES,
    LOADED_TEMPLATES,
    CREATE_TEMPLATE,
    DELETE_TEMPLATE
} from '../actions/types.js';
import { itemsListToDict } from '../utils';


const initialState = {
    templates: [],
    loaded: false
};


export default function TemplateReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case GET_TEMPLATES:
            return {
                ...state,
                templates: itemsListToDict(action.payload),
                loaded: true
            };
        case LOADED_TEMPLATES:
            return {
                ...state,
                loaded: true
            };
        case CREATE_TEMPLATE:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                templates: {...state.templates, ...newItem},
                loaded: true
            };
        case DELETE_TEMPLATE:
            return {
                ...state,
                templates: Object.keys(state.templates)
                .filter((key) => key !== action.payload.templateId)
                .reduce((cur, key) => { 
                    return Object.assign(cur, { [key]: state.templates[key] })
                }, {})
            };
        default:
            return state;
    }
}
