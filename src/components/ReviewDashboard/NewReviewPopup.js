import React from 'react';

import { Form }from 'react-bootstrap';
import { connect } from 'react-redux';

import { createReview } from '../../actions/review';
import { getJiraIssues } from '../../actions/jiraIssue';
import { NewItemPopup, DropdownSelect } from '../Common';


class NewReviewPopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            reviewTitle: '',
            reviewServices: '',
            reviewJiraIssue: undefined
        }


        this.createNewReview = this.createNewReview.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    componentDidMount () {
        if (!this.props.jiraIssuesLoaded) {
            this.props.getJiraIssues();
        }
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewReview () {
        let title = this.state.reviewTitle;
        let services = this.state.reviewServices;
        let jiraIssue = this.state.reviewJiraIssue;

        if (title.length === 0) { 
            console.error('Introduce a title')
        } else if (services.length === 0) {
            console.error('Select at least one service')
        } else {
            let data = {
                'title': title, 
                'services': services, 
                'jira_issue': jiraIssue,
                'tests': []
            }

            this.props.createReview(data);
        }
    };

    render() {
        return (
            <>
                <NewItemPopup 
                    title="New review"
                    createCallback={this.createNewReview}
                >
                    <div className="form-group row mb-3">
                        <label 
                            className="col-4 col-form-label" 
                            htmlFor="reviewTitle">
                            Title
                        </label>
                        <div className="col-8">
                            <input
                                type="text" 
                                className="form-control"
                                value={this.state.value}
                                name="reviewTitle"
                                onChange={this.handleChangeEvent}
                            />
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label 
                            className="col-4 col-form-label" 
                            htmlFor="reviewServices">
                            Service
                        </label>
                        <div className="col-8">
                            <DropdownSelect
                                handleChange={this.handleChangeEvent}
                                name="reviewServices" 
                                options={Object.keys(this.props.services).map((oid, i) => (
                                    {label: this.props.services[oid].name, value: oid}
                                ))}
                            />
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label className="col-4 col-form-label" htmlFor="reviewIssue">
                            Jira issue
                        </label>
                        <div className="col-8">
                            <Form.Select 
                                id="reviewJiraIssue" 
                                name="reviewJiraIssue" 
                                onChange={this.handleChangeEvent}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a Jira issue (optional)</option>
                                {Object.keys(this.props.jiraIssues).map((oid, i) => {
                                    return <option key={"jira-opt-" + oid} value={oid}>
                                        {this.props.jiraIssues[oid].jira_id}
                                    </option>
                                })}
                            </Form.Select>
                        </div>
                    </div>
                </NewItemPopup>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    jiraIssues: state.JiraIssueReducer.issues,
    jiraIssuesLoaded: state.JiraIssueReducer.issuesLoaded
});

export default connect(mapStateToProps, { createReview, getJiraIssues })(NewReviewPopup);
