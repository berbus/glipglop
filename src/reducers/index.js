import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import ServiceDetailsReducer from './serviceDetailsReducer';
import ExerciseReducer from './exerciseReducer';
import TemplateReducer from './templateReducer';
import TemplateDetailsReducer from './templateDetailsReducer';
import RequirementReducer from './requirementReducer';
import ExerciseDetailsReducer from './exerciseDetailsReducer';
import TestCaseReducer from './testCaseReducer';
import FindingReducer from './findingReducer';
import AuthReducer from './authReducer';

export default combineReducers({
    ServiceReducer,
    ServiceDetailsReducer,
    ExerciseReducer,
    TemplateReducer,
    TemplateDetailsReducer,
    ExerciseDetailsReducer,
    RequirementReducer,
    TestCaseReducer,
    FindingReducer,
    AuthReducer
});
