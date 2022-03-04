import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_EXERCISE_DETAILS,
    CLEAR_EXERCISE_DETAILS,
    FINISH_EXERCISE
} from './types';


export const getExerciseDetails = (exerciseId) => (dispatch, getState) => {
    axios
        .get(`/api/exercise/${exerciseId}`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_EXERCISE_DETAILS,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
        });
};


export const clearExerciseDetails = () => (dispatch, getState) => {
    dispatch({ type: CLEAR_EXERCISE_DETAILS });
};


export const completeExercise = (exerciseId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')
    const data = {finished: true}

    axios
        .patch(`/api/exercise/${exerciseId}/`, data, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: FINISH_EXERCISE,
                payload: res.data
            });
            toast.success('Exercise completed', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
};
