import React from "react";

import { Form }from 'react-bootstrap';
import { Modal } from 'react-bootstrap/';
import { connect } from 'react-redux';

import { getExercises, createExercise } from '../../actions/exercise';


class NewExercisePopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            exerciseTitle: '',
            exerciseService: '',
            exerciseTemplate: ''
        }


        this.createNewExercise = this.createNewExercise.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
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
                'tests': []
            }

            this.props.createExercise(data);
            this.handleClick();
        }
    };

    dictToSelectOptions (itemsDict) {
        var result = []

        if (itemsDict != null) {
            for (const [oid, item] of Object.entries(itemsDict)) {
                result.push({'label': item['name'], 'value': oid})
            }
        }

        return result;
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


const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getExercises, createExercise })(NewExercisePopup);
