import React from "react";

import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap/';

import { getTemplates, createTemplate } from '../../actions/template';


class NewTemplatePopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            templateName: '',
        }


        this.createNewTemplate = this.createNewTemplate.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    handleClick = () => {
        this.setState({'visible': !this.state.visible});
    };

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewTemplate = (event) => {
        let name = this.state.templateName;

        if (name.length === 0) { 
            console.error('Introduce a name')
        } else {
            this.props.createTemplate(name);
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
                            New template
                        </button>
                    </div>
                </div>

                <div className="row">
                    <Modal show={this.state.visible} onHide={this.handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>New template</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group row mb-3">
                                    <label 
                                        className="col-4 col-form-label" 
                                        htmlFor="templateName">
                                        Name
                                    </label>
                                    <div className="col-8">
                                        <input
                                            type="text" 
                                            className="form-control"
                                            value={this.state.value}
                                            name="templateName"
                                            onChange={this.handleChangeEvent}
                                        />
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger" onClick={this.handleClick}>
                                Cancel
                            </button>
                            <button className="btn btn-success" onClick={this.createNewTemplate}>
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
export default connect(mapStateToProps, { getTemplates, createTemplate })(NewTemplatePopup);
