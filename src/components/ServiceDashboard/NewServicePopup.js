import React from 'react';

import { connect } from 'react-redux';

import { createService } from '../../actions/service';
import { NewItemPopup } from '../Common';


class NewServicePopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            serviceName: '',
            parentConfluencePage: null,
            confluenceSpace: null
        }

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

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
        }
    };

    render() {
        return (
            <>
                <NewItemPopup 
                    title="New service"
                    loaded={this.state.loaded}
                    createCallback={this.createNewService}
                >
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
                </NewItemPopup>
            </>
        );
    }
}


const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { createService })(NewServicePopup);
