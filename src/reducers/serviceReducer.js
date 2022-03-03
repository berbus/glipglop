import {
    GET_SERVICES,
    CREATE_SERVICE,
    LOADED_SERVICES,
    DELETE_SERVICE
} from '../actions/types.js';
import { itemsListToDict } from '../utils';

const initialState = {
    services: {},
    loaded: false
};

export default function ServiceReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: itemsListToDict(action.payload),
                loaded: true
            };
        case LOADED_SERVICES:
            return {
                ...state,
                loaded: true
            };
        case CREATE_SERVICE:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                services: {...state.services, ...newItem},
                loaded: true
            };
        case DELETE_SERVICE:
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
