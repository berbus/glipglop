import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_TEST_CASE,
    CLEAR_TEST_CASES,
    UPDATE_TEST_CASE,
    BULK_UPDATE_TEST_CASE
} from './types';


export const getTestCaseForExercise = (exerciseId) => (dispatch, getState) => {
    axios
        .get(`/api/test_case/?exercise=${exerciseId}`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_TEST_CASE,
                payload: res.data,
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};

export const clearTestCases = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_TEST_CASES });
};

export const updateTestCase = (testId, data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .patch(`/api/test_case/${testId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: UPDATE_TEST_CASE,
                payload: res.data,
            });
            toast.success('Test case updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};

export const bulkUpdateTestCase = (testIds, data) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    data['test_ids'] = testIds;

    axios
        .patch('/api/test_case/bulk_update/', data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: BULK_UPDATE_TEST_CASE,
                payload: res.data,
            });
            toast.success('Selected test cases updated', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};
