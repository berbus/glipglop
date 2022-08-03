import React from 'react';

import { Form }from 'react-bootstrap';
import { Modal } from 'react-bootstrap/';
import { connect } from 'react-redux';

import { getExercises, createExercise } from '../../actions/exercise';
import { getJiraIssues } from '../../actions/jiraIssue';


class NewExercisePopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            exerciseTitle: '',
            exerciseService: '',
            exerciseTemplate: '',
            exerciseJiraIssue: undefined
        }


        this.createNewExercise = this.createNewExercise.bind(this);
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

    createNewExercise = (event) => {
        let title = this.state.exerciseTitle;
        let service = this.state.exerciseService;
        let template = this.state.exerciseTemplate;
        let jiraIssue = this.state.exerciseJiraIssue;

        if (title.length === 0) { 
            console.error('Introduce a title')
        } else if (service.length === 0) {
            console.error('Select a service')
        } else if (template.length === 0) {
            console.error('Select a template')
        } else {
            let data = {
                'title': title, 
                'service': service, 
                'template': template, 
                'jira_issue': jiraIssue,
                'tests': []
            }

            this.props.createExercise(data);
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
                            New exercise
                        </button>
                    </div>
                </div>

                <div className="row">
                    <Modal show={this.state.visible} onHide={this.handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>New exercise</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group row mb-3">
                                    <label 
                                        className="col-4 col-form-label" 
                                        htmlFor="exerciseTitle">
                                        Title
                                    </label>
                                    <div className="col-8">
                                        <input
                                            type="text" 
                                            className="form-control"
                                            value={this.state.value}
                                            name="exerciseTitle"
                                            onChange={this.handleChangeEvent}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label 
                                        className="col-4 col-form-label" 
                                        htmlFor="exerciseService">
                                        Service
                                    </label>
                                    <div className="col-8">
                                        <Form.Select 
                                            id="exerciseService" 
                                            name="exerciseService" 
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
                                    <label className="col-4 col-form-label" htmlFor="exerciseTemplate">
                                        Template
                                    </label>
                                    <div className="col-8">
                                        <Form.Select 
                                            id="exerciseTemplate" 
                                            name="exerciseTemplate" 
                                            onChange={this.handleChangeEvent}
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Select a template</option>
                                            {Object.keys(this.props.templates).map((oid, i) => {
                                                return <option key={i} value={oid}>{this.props.templates[oid].name}</option>
                                            })}
                                        </Form.Select>
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label className="col-4 col-form-label" htmlFor="exerciseIssue">
                                        Jira issue
                                    </label>
                                    <div className="col-8">
                                        <Form.Select 
                                            id="exerciseJiraIssue" 
                                            name="exerciseJiraIssue" 
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
                            <button className="btn btn-success" onClick={this.createNewExercise}>
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

export default connect(mapStateToProps, { getExercises, createExercise, getJiraIssues })(NewExercisePopup);
