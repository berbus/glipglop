import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import {
    GET_FINDINGS,
    CREATE_FINDING,
    CLEAR_FINDINGS,
    DELETE_FINDING,
    UPDATE_FINDING
} from './types';


export const getFindingsForSecurityTest = (securityTestId) => (dispatch, getState) => {
    axios
        .get(`/api/finding/?security_test=${securityTestId}`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_FINDINGS,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};

export const clearFindings = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_FINDINGS });
};


export const createFinding = (securityTestId, testCaseId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    const data = {'security_test': securityTestId, 'test_case': testCaseId}

    axios
        .post('/api/finding/', data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: CREATE_FINDING,
                payload: res.data,
            });
            toast.success('Created finding', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}


export const updateFinding = (findingId, data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .patch(`/api/finding/${findingId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: UPDATE_FINDING,
                payload: res.data,
            });
            toast.success('Finding updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}


export const deleteFinding = (findingId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .delete(`/api/finding/${findingId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({ 
                type: DELETE_FINDING,
                payload: {findingId: findingId}
            });
            toast.success('Finding deleted', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}
