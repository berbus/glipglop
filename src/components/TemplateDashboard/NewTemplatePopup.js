import React from 'react';

import { connect } from 'react-redux';

import { getTemplates, createTemplate } from '../../actions/template';
import { NewItemPopup } from '../Common';


class NewTemplatePopup extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            templateName: '',
        }


        this.createNewTemplate = this.createNewTemplate.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    createNewTemplate = (event) => {
        let name = this.state.templateName;

        if (name.length === 0) { 
            console.error('Introduce a name')
        } else {
            this.props.createTemplate(name);
        }
    };

    render() {
        return (
            <>
                <NewItemPopup 
                    title="New template"
                    createCallback={this.createNewTemplate}
                >
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
                </NewItemPopup>
            </>
        );
    }
}


const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { getTemplates, createTemplate })(NewTemplatePopup);
