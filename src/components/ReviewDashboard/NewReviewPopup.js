import React from 'react';

import { Form }from 'react-bootstrap';
import { Modal } from 'react-bootstrap/';
import { connect } from 'react-redux';

import { createReview } from '../../actions/review';
import { getJiraIssues } from '../../actions/jiraIssue';


class NewReviewPopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            reviewTitle: '',
            reviewService: '',
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

    handleClick = () => {
        this.setState({'visible': !this.state.visible});
    };

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewReview = (event) => {
        let title = this.state.reviewTitle;
        let service = this.state.reviewService;
        let jiraIssue = this.state.reviewJiraIssue;

        if (title.length === 0) { 
            console.error('Introduce a title')
        } else if (service.length === 0) {
            console.error('Select a service')
        } else {
            let data = {
                'title': title, 
                'services': [service], 
                'jira_issue': jiraIssue,
                'tests': []
            }

            this.props.createReview(data);
            this.handleClick();
        }
    };

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-10"></div>
                    <div className="col-2">
                        <button className="btn btn-primary" onClick={this.handleClick}>
                            New review
                        </button>
                    </div>
                </div>

                <div className="row">
                    <Modal show={this.state.visible} onHide={this.handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>New review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
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
                                        htmlFor="reviewService">
                                        Service
                                    </label>
                                    <div className="col-8">
                                        <Form.Select 
                                            id="reviewService" 
                                            name="reviewService" 
                                            onChange={this.handleChangeEvent}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select a service</option>
                                            {Object.keys(this.props.services).map((oid, i) => {
                                                return <option key={i} value={oid}>{this.props.services[oid].name}</option>
                                            })}
                                        </Form.Select>
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
                                                return <option key={i} value={oid}>{this.props.jiraIssues[oid].jira_id}</option>
                                            })}
                                        </Form.Select>
                                    </div>
                                </div>

                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger" onClick={this.handleClick}>
                                Cancel
                            </button>
                            <button className="btn btn-success" onClick={this.createNewReview}>
                                Create
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    jiraIssues: state.JiraIssueReducer.issues,
    jiraIssuesLoaded: state.JiraIssueReducer.issuesLoaded
});

export default connect(mapStateToProps, { createReview, getJiraIssues })(NewReviewPopup);
