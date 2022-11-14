import { combineReducers } from 'redux';
import ServiceReducer from './serviceReducer';
import ServiceDetailsReducer from './serviceDetailsReducer';
import ReviewReducer from './reviewReducer';
import TemplateReducer from './templateReducer';
import TemplateDetailsReducer from './templateDetailsReducer';
import RequirementReducer from './requirementReducer';
import ReviewDetailsReducer from './reviewDetailsReducer';
import TestCaseReducer from './testCaseReducer';
import FindingReducer from './findingReducer';
import AuthReducer from './authReducer';
import JiraTransitionReducer from './jiraTransitionReducer';
import JiraAuthReducer from './jiraAuthReducer';
import JiraIssueReducer from './jiraIssueReducer';
import SecurityTestReducer from './securityTestReducer';
import SecurityTestDetailsReducer from './securityTestDetailsReducer';
import ThreatModelReducer from './threatModelReducer';
import ThreatModelDetailsReducer from './threatModelDetailsReducer';

export default combineReducers({
    ServiceReducer,
    ServiceDetailsReducer,
    ReviewReducer,
    TemplateReducer,
    TemplateDetailsReducer,
    ReviewDetailsReducer,
    RequirementReducer,
    TestCaseReducer,
    FindingReducer,
    AuthReducer,
    JiraTransitionReducer,
    JiraAuthReducer,
    JiraIssueReducer,
    SecurityTestReducer,
    SecurityTestDetailsReducer,
    ThreatModelReducer,
    ThreatModelDetailsReducer
});
