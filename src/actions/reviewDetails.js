import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_REVIEW_DETAILS,
    CLEAR_REVIEW_DETAILS,
    COMPLETE_REVIEW
} from './types';


export const getReviewDetails = (reviewId) => (dispatch, getState) => {
    axios
        .get(`/api/review/${reviewId}`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_REVIEW_DETAILS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const clearReviewDetails = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_REVIEW_DETAILS });
};


export const completeReview = (reviewId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    const data = {finished: true}

    axios
        .get(`/api/review/${reviewId}/complete/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: COMPLETE_REVIEW,
                payload: res.data
            });
            toast.success('Review completed', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};
