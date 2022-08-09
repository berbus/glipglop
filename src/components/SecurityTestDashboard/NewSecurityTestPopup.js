import React from 'react';

import { Form }from 'react-bootstrap';
import { Modal } from 'react-bootstrap/';
import { connect } from 'react-redux';

import { createSecurityTest } from '../../actions/securityTest';
import { getTemplates } from '../../actions/template';
import { getServices } from '../../actions/service';


class NewSecurityTestPopup extends React.Component {
    constructor (props) {
        super(props)

        // Services can come from the review or from the complete list
        const loaded = this.props.services !== undefined
        this.state = {
            loaded: loaded,
            visible: false,
            SecurityTestTitle: '',
            SecurityTestService: '',
            SecurityTestTemplate: ''
        }


        this.createNewSecurityTest = this.createNewSecurityTest.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    componentDidMount() {
        if (!this.props.templatesLoaded) {
            this.props.getTemplates();
        }
        if (this.props.services === undefined) {
            this.props.getServices();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.serviceListLoaded) {
            this.setState({'loaded': true})
        }
    }

    handleClick = () => {
        this.setState({'visible': !this.state.visible});
    };

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewSecurityTest = (event) => {
        let title = this.state.SecurityTestTitle;
        let service = this.state.SecurityTestService;
        let template = this.state.SecurityTestTemplate;

        if (title.length === 0) { 
            console.error('Introduce a title');
        } else if (service.length === 0) {
            console.error('Select a service');
        } else if (template.length === 0) {
            console.error('Select a template');
        } else {
            let data = {
                'title': title, 
                'template': template,
                'service': service, 
                'jira_ticket': this.props.jiraTicket,
                'review': this.props.reviewId
            };
            this.props.createSecurityTest(data, this.props.services !== undefined);
            this.handleClick();
        }
    };

    serviceListJSX () {
        let res = []

        if (this.props.services !== undefined) {
            res = this.props.services.map((service) => (
                <option key={"service-option-" + service.oid} value={service.oid}>{service.name}</option>
            ));
        } else if (this.props.serviceListLoaded) {
            res = Object.keys(this.props.serviceList).map((oid) => (
                <option key={"service-option-" + oid} value={oid}>{this.props.serviceList[oid].name}</option>
            ))
        }

        return res;
    }

    render() {
        return (
            <>
                <button className="btn btn-primary" onClick={this.handleClick}>
                    New security test
                </button>
                {!this.state.loaded
                    ? <></>
                    : <>

                        <div className="row">
                            <Modal show={this.state.visible} onHide={this.handleClick}>
                                <Modal.Header closeButton>
                                    <Modal.Title>New SecurityTest</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <div className="form-group row mb-3">
                                            <label 
                                                className="col-4 col-form-label" 
                                                htmlFor="SecurityTestTitle">
                                                Title
                                            </label>
                                            <div className="col-8">
                                                <input
                                                    type="text" 
                                                    className="form-control"
                                                    value={this.state.value}
                                                    name="SecurityTestTitle"
                                                    onChange={this.handleChangeEvent}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mb-3">
                                            <label 
                                                className="col-4 col-form-label" 
                                                htmlFor="SecurityTestService">
                                                Service
                                            </label>
                                            <div className="col-8">
                                                <Form.Select 
                                                    id="SecurityTestService" 
                                                    name="SecurityTestService" 
                                                    onChange={this.handleChangeEvent}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>Select a service</option>
                                                    {this.serviceListJSX()}
                                                </Form.Select>
                                            </div>
                                        </div>

                                        <div className="form-group row mb-3">
                                            <label 
                                                className="col-4 col-form-label" 
                                                htmlFor="SecurityTestTemplate">
                                                Template
                                            </label>
                                            <div className="col-8">
                                                <Form.Select
                                                    id="SecurityTestTemplate"
                                                    name="SecurityTestTemplate"
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
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <button className="btn btn-danger" onClick={this.handleClick}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-success" onClick={this.createNewSecurityTest}>
                                        Create
                                    </button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </>
                }
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    templates: state.TemplateReducer.templates,
    templatesLoaded: state.TemplateReducer.loaded,
    serviceList: state.ServiceReducer.services,
    serviceListLoaded: state.ServiceReducer.loaded
});

export default connect(mapStateToProps, { 
    createSecurityTest, getTemplates, getServices 
})(NewSecurityTestPopup);
