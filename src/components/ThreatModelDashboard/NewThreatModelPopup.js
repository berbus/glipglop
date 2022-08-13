import React from 'react';

import { Form }from 'react-bootstrap';
import { connect } from 'react-redux';

import { createThreatModel } from '../../actions/threatModel';
import { getServices } from '../../actions/service';
import { NewItemPopup } from '../Common';


class NewThreatModelPopup extends React.Component {
    constructor (props) {
        super(props)

        // Services can come from the review or from the complete list
        const loaded = this.props.services !== undefined
        this.state = {
            loaded: loaded,
            ThreatModelTitle: '',
            ThreatModelService: '',
        }

        this.createNewThreatModel = this.createNewThreatModel.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    componentDidMount() {
        if (this.props.services === undefined) {
            this.props.getServices();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.serviceListLoaded) {
            this.setState({'loaded': true})
        }
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewThreatModel = (event) => {
        let title = this.state.ThreatModelTitle;
        let service = this.state.ThreatModelService;

        if (title.length === 0) { 
            console.error('Introduce a title');
        } else if (service.length === 0) {
            console.error('Select a service');
        } else {
            let data = {
                'title': title, 
                'service': service, 
                'review': this.props.reviewId
            };
            this.props.createThreatModel(data, this.props.services !== undefined);
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
                <NewItemPopup 
                    title="New threat model"
                    loaded={this.state.loaded}
                    createCallback={this.createNewThreatModel}
                >

                    <div className="form-group row mb-3">
                        <label 
                            className="col-4 col-form-label" 
                            htmlFor="ThreatModelTitle">
                            Title
                        </label>
                        <div className="col-8">
                            <input
                                type="text" 
                                className="form-control"
                                value={this.state.value}
                                name="ThreatModelTitle"
                                onChange={this.handleChangeEvent}
                            />
                        </div>
                    </div>

                    <div className="form-group row mb-3">
                        <label 
                            className="col-4 col-form-label" 
                            htmlFor="ThreatModelService">
                            Service
                        </label>
                        <div className="col-8">
                            <Form.Select 
                                id="ThreatModelService" 
                                name="ThreatModelService" 
                                onChange={this.handleChangeEvent}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a service</option>
                                {this.serviceListJSX()}
                            </Form.Select>
                        </div>
                    </div>
                </NewItemPopup>
            </>
        );
    }
}


const mapStateToProps = (state) => ({
    serviceList: state.ServiceReducer.services,
    serviceListLoaded: state.ServiceReducer.loaded
});

export default connect(mapStateToProps, { 
    createThreatModel, getServices 
})(NewThreatModelPopup);
