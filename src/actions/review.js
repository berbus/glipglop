import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_REVIEWS,
    CREATE_REVIEW,
    DELETE_REVIEW
} from './types';


export const getReviews = () => (dispatch, getState) => {
    axios
        .get('/api/review/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_REVIEWS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const createReview = (reviewData) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .post('/api/review/', reviewData, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: CREATE_REVIEW,
                payload: res.data
            });
            toast.success('Created review', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });

};


export const deleteReview = (reviewId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .delete(`/api/review/${reviewId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_REVIEW,
                payload: {reviewId: reviewId}
            });
            toast.success('Deleted review', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}
