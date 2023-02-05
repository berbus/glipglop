import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_TM_PARTICIPANTS,
    CREATING_TM_PARTICIPANT,
    CREATED_TM_PARTICIPANT,
    DELETE_TM_PARTICIPANT,
    CLEAR_TM_PARTICIPANTS,
    UPDATE_TM_PARTICIPANT,
    TM_PARTICIPANTS_ERROR
} from './types';


export const getTMParticipants = () => (dispatch, getState) => {
    axios
        .get('/api/tm_participant/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_TM_PARTICIPANTS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const getTMParticipantsForTM = (threatModelId) => (dispatch, getState) => {
    axios
        .get(`/api/tm_participant/?threat_model=${threatModelId}`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_TM_PARTICIPANTS,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const createTMParticipant = (participantData) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    dispatch({type: CREATING_TM_PARTICIPANT});

    axios
        .post('/api/tm_participant/', participantData, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: CREATED_TM_PARTICIPANT,
                payload: res.data
            });
            toast.success('Created TM participant', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
            dispatch({TM_PARTICIPANTS_ERROR});
        });
};


export const deleteTMParticipant = (participantId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .delete(`/api/tm_participant/${participantId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_TM_PARTICIPANT,
                payload: {participantId: participantId}
            });
            toast.success('Deleted tm participant', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}

export const updateTMParticipant = (participantId, data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .patch(`/api/tm_participant/${participantId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: UPDATE_TM_PARTICIPANT,
                payload: res.data
            });
            toast.success('Participant updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};


export const clearTMParticipants = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_TM_PARTICIPANTS });
};


