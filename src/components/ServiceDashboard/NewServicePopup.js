import React from "react";

import { Modal } from 'react-bootstrap/';
import { connect } from 'react-redux';

import { getServices, createService } from '../../actions/service';


class NewServicePopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            visible: false,
            serviceName: '',
            parentConfluencePage: null,
            confluenceSpace: null
        }

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    handleClick = () => {
        this.setState({'visible': !this.state.visible});
    };

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewService = (event) => {
        let name = this.state.serviceName;
        let parentConfluencePage = this.state.parentConfluencePage;
        let confluenceSpace = this.state.confluenceSpace;

        if (name.length === 0) { 
            console.error('Introduce a name')
        } else {
            this.props.createService(name, confluenceSpace, parentConfluencePage);
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
                            New service
                        </button>
                    </div>
                </div>

                <div className="row">
                    <Modal show={this.state.visible} onHide={this.handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>New service</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="form-group row mb-3">
                                    <label 
                                        className="col-sm-4 col-form-label" 
                                        htmlFor="serviceName">
                                        Name
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text" 
                                            className="form-control"
                                            value={this.state.value}
                                            name="serviceName"
                                            onChange={this.handleChangeEvent}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label 
                                        className="col-sm-4 col-form-label" 
                                        htmlFor="confluenceSpace">
                                        Confluence space
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text" 
                                            className="form-control"
                                            placeholder="TEST"
                                            value={this.state.value}
                                            name="confluenceSpace"
                                            onChange={this.handleChangeEvent}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row mb-3">
                                    <label 
                                        className="col-sm-4 col-form-label" 
                                        htmlFor="parentConfluencePage">
                                        Confluence page
                                    </label>
                                    <div className="col-sm-8">
                                        <input
                                            type="text" 
                                            className="form-control"
                                            placeholder="688164"
                                            value={this.state.value}
                                            name="parentConfluencePage"
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
                            <button className="btn btn-success" onClick={this.createNewService}>
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
export default connect(mapStateToProps, { getServices, createService })(NewServicePopup);
