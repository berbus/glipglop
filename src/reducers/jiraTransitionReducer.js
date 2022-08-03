import { 
    JIRA_GET_TRANSITIONS,
    JIRA_DELETE_TRANSITION,
    JIRA_UPDATE_TRANSITION,
    JIRA_UPDATE_TRANSITION_ERROR,
    JIRA_UPDATING_TRANSITION,
    JIRA_CREATING_TRANSITION,
    JIRA_CREATE_TRANSITION_ERROR,
    JIRA_GET_GARRETT_ACTIONS,
    JIRA_CREATE_TRANSITION,
    JIRA_GET_STATUSES
} from '../actions/types.js';
import { itemsListToDict } from '../utils';


const initialState = {
    transitions: {},
    transitionsLoaded: false,
    creatingTransition: false,
    creatingTransitionSuccess: false,
    updatingTransition: false,
    updateTransitionSuccess: false,
    statuses: [],
    statusesLoaded: false,
    garrettActionsLoaded: false,
    garrettActions: []
};


export default function JiraTransitionReducer (state = initialState, action) {
    let newItem = {}
    let oid = null

    switch (action.type) {
        case JIRA_GET_TRANSITIONS:
            return {
                ...state,
                transitions: itemsListToDict(action.payload),
                transitionsLoaded: true
            };
        case JIRA_GET_GARRETT_ACTIONS:
            return {
                ...state,
                garrettActions: action.payload,
                garrettActionsLoaded: true
            };
        case JIRA_UPDATE_TRANSITION:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload
            return {
                ...state,
                updatingTransition: false,
                updatingTransitionSuccess: true,
                transitions: {...state.transitions, ...newItem}
            };
        case JIRA_UPDATING_TRANSITION:
            return {
                ...state,
                updatingTransition: true,
                updatingTransitionSuccess: false
            }
        case JIRA_UPDATE_TRANSITION_ERROR:
            return {
                ...state,
                updatingTransition: false,
                updatingTransitionSuccess: false
            }
        case JIRA_CREATING_TRANSITION:
            return {
                ...state,
                creatingTransition: true,
                creatingTransitionSuccess: false
            }
        case JIRA_CREATE_TRANSITION_ERROR:
            return {
                ...state,
                creatingTransition: false,
                creatingTransitionSuccess: false
            }
        case JIRA_CREATE_TRANSITION:
            oid = action.payload['oid']
            delete action.payload['oid'] 
            newItem[oid] = action.payload

            return {
                ...state,
                transitions: {...state.transitions, ...newItem},
                creatingTransition: false,
                creatingTransitionSuccess: true,
            };
        case JIRA_DELETE_TRANSITION:
            return {
                ...state,
                transitions: Object.keys(state.transitions)
                    .filter((key) => key !== action.payload.transitionId)
                    .reduce((cur, key) => { 
                        return Object.assign(cur, { [key]: state.transitions[key] })
                    }, {})
            };
        case JIRA_GET_STATUSES:
            return {
                ...state,
                statuses: action.payload,
                statusesLoaded: true
            };
        default:
            return state;
    }
}
