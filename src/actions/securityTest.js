import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    CREATE_SECURITY_TEST,
    CREATE_SECURITY_TEST_FOR_REVIEW,
    DELETE_SECURITY_TEST,
    GET_SECURITY_TESTS,
} from './types';


export const getSecurityTests = () => (dispatch, getState) => {
    axios
        .get('/api/security_test/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_SECURITY_TESTS,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const createSecurityTest = (securityTestData, forReview) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    const type = forReview ? CREATE_SECURITY_TEST_FOR_REVIEW : CREATE_SECURITY_TEST;

    axios
        .post('/api/security_test/', securityTestData, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: type,
                payload: res.data
            });
            toast.success('Created security test', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};


export const deleteSecurityTest = (securityTestId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    axios
        .delete(`/api/security_test/${securityTestId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_SECURITY_TEST,
                payload: {securityTestId: securityTestId}
            });
            toast.success('Security Test deleted', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}

