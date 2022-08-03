import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    JIRA_GET_TRANSITIONS,
    JIRA_DELETE_TRANSITION,
    JIRA_UPDATE_TRANSITION,
    JIRA_UPDATING_TRANSITION,
    JIRA_UPDATE_TRANSITION_ERROR,
    JIRA_CREATE_TRANSITION,
    JIRA_CREATING_TRANSITION,
    JIRA_CREATE_TRANSITION_ERROR,
    JIRA_GET_GARRETT_ACTIONS,
    JIRA_GET_STATUSES
} from './types';


export const getJiraTransitions = () => (dispatch, getState) => {
    axios
        .get('/api/jira_transition/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: JIRA_GET_TRANSITIONS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};

export const getGarrettActions = () => (dispatch, getState) => {
    axios
        .get('/api/jira_transition/garrett_actions/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: JIRA_GET_GARRETT_ACTIONS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};

export const updateJiraTransition = (transitionId, data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    dispatch({ type: JIRA_UPDATING_TRANSITION});

    axios
        .patch(`/api/jira_transition/${transitionId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: JIRA_UPDATE_TRANSITION,
                payload: res.data
            });
            toast.success('Trainsition updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
            dispatch({ type: JIRA_UPDATE_TRANSITION_ERROR});
        });
}


export const deleteJiraTransition = (transitionId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .delete(`/api/jira_transition/${transitionId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({ 
                type: JIRA_DELETE_TRANSITION,
                payload: {transitionId: transitionId}
            });
            toast.success('Transition deleted', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}

export const createJiraTransition = (data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    dispatch({ type: JIRA_CREATING_TRANSITION});

    axios
        .post(`/api/jira_transition/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({ 
                type: JIRA_CREATE_TRANSITION,
                payload: res.data
            });
            toast.success('Transition created', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
            dispatch({ type: JIRA_CREATE_TRANSITION_ERROR});
        });
}

export const getJiraStatuses = () => (dispatch, getState) => {
    axios
        .get('/api/jira_transition/statuses/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: JIRA_GET_STATUSES,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};

