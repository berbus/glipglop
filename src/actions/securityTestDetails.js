import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_SECURITY_TEST_DETAILS,
    CLEAR_SECURITY_TEST_DETAILS,
    COMPLETE_SECURITY_TEST
} from './types';


export const getSecurityTestDetails = (securityTestId) => (dispatch, getState) => {
    axios
        .get(`/api/security_test/${securityTestId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_SECURITY_TEST_DETAILS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const clearSecurityTestDetails = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_SECURITY_TEST_DETAILS });
};


export const completeSecurityTest = (securityTestId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .get(`/api/security_test/${securityTestId}/complete/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: COMPLETE_SECURITY_TEST,
                payload: res.data
            });
            toast.success('Security Test completed', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};

