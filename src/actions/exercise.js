import axios from 'axios';

import { toast } from 'react-hot-toast';

import { HTTP_CONF } from '../constants';
import { handleActionError } from '../utils';
import { 
    GET_EXERCISES,
    LOADED_EXERCISES,
    CREATE_EXERCISE,
    DELETE_EXERCISE
} from './types';


export const getExercises = () => (dispatch, getState) => {
    axios
        .get('/api/exercise/', HTTP_CONF)
        .then((res) => {
            dispatch({
                type: GET_EXERCISES,
                payload: res.data
            });
        })
        .catch((err) => {
            handleActionError(err, null);
            dispatch({type: LOADED_EXERCISES});
        });
};


export const createExercise = (exerciseData) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .post('/api/exercise/', exerciseData, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: CREATE_EXERCISE,
                payload: res.data
            });
            toast.success('Created exercise', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });

};


export const deleteExercise = (exerciseId) => (dispatch, getState) => {
    const tid = toast.loading('Loading...')

    axios
        .delete(`/api/exercise/${exerciseId}/`, HTTP_CONF)
        .then((res) => {
            dispatch({
                type: DELETE_EXERCISE,
                payload: {exerciseId: exerciseId}
            });
            toast.success('Deleted exercise', {id: tid});
        })
        .catch((err) => {
            handleActionError(err, tid);
        });
}
