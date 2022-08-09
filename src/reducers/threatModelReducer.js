import { 
    GET_THREAT_MODELS,
    CREATE_THREAT_MODEL,
    DELETE_THREAT_MODEL,
} from '../actions/types.js';
import { itemsListToDict } from '../utils';


const initialState = {
    threat_models: {},
    loaded: false
};


export default function ThreatModelReducer (state = initialState, action) {
    let newItem = {}
    let oid = null
    switch (action.type) {
        case GET_THREAT_MODELS:
            return {
                ...state,
                threat_models: itemsListToDict(action.payload),
                loaded: true
            };
        case CREATE_THREAT_MODEL:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                threat_models: {...state.threat_models, ...newItem}
            };
        case DELETE_THREAT_MODEL:
            return {
                ...state,
                threat_models: Object.keys(state.threat_models)
                .filter((key) => key !== action.payload.threatModelId)
                .reduce((cur, key) => { 
                    return Object.assign(cur, { [key]: state.threat_models[key] })
                }, {})
            };
        default:
            return state;
    }
}
