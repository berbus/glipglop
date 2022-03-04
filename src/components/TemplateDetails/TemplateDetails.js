import React from 'react';

import { connect } from 'react-redux';
import { FaSearch } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Form } from 'react-bootstrap/'

import { getTemplateDetails, clearTemplateDetails, updateTemplateDetails } from '../../actions/templateDetails';
import { getRequirements } from '../../actions/requirement';
import Requirement from './Requirement';


const initialFilterValues = {
    selectedOnly: false,
    unselectedOnly: false,
    owasp_level: 3,
    searchText: ''
}


class TemplateDetails extends React.Component {
    constructor (props) {
        super(props)

        const init_reqs = this.props.initialRequirements;
        this.state = {
            filter: initialFilterValues,
            selectedRequirements: (init_reqs === null || init_reqs === undefined) ? [] : init_reqs,
            updatingTemplate: this.props.templateName === null
        }
    }

    componentDidMount () {
        if (!this.props.requirementsListLoaded) {
            this.props.getRequirements();
        }

        this.props.getTemplateDetails(this.props.templateId);
        this.setState({'selectedRequirements': this.props.initialRequirements})
    }

    componentWillUnmount () {
        this.props.clearTemplateDetails();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.templateId !== this.props.templateId) {
            this.props.getTemplateDetails(this.props.templateId);
        } 
        if (prevProps.initialRequirements !== this.props.initialRequirements) {
            this.setState({'selectedRequirements': this.props.initialRequirements})
        }
        if (this.state.updatingTemplate && this.props.templateName !== null) {
            this.setState({'updatingTemplate': false})
        }
    }

    clearFilter = () => {
        this.setState({'filter': initialFilterValues});
    };

    doUpdateTemplate = () => {
        const data = {'requirements': this.state.selectedRequirements};
        this.props.updateTemplateDetails(this.props.templateId, data);
    }

    handleFilterChange = (event) => {
        const target = event.target;
        let filter = {...this.state.filter};

        if (target.id === 'selectedOnlyCheckbox') {
            filter.selectedOnly = !this.state.filter.selectedOnly;
            filter.unselectedOnly = false;
        } else if (target.id === 'unselectedOnlyCheckbox') {
            filter.unselectedOnly = !this.state.filter.unselectedOnly;
            filter.selectedOnly = false;
        } else if (target.id === 'searchText') {
            filter.searchText = target.value.toLowerCase();
        } else if (target.name === 'slider_owasp_level') {
            filter.owasp_level = target.value;
        }

        this.setState({filter});
    };

    filterRequirement = (oid) => {
        let includeOID =  true;
        const req = this.props.requirementsList[oid];

        // Selected/Unselected
        if (this.state.filter.selectedOnly) {
            includeOID = this.state.selectedRequirements.includes(oid);
        } else if (this.state.filter.unselectedOnly) {
            includeOID = !this.state.selectedRequirements.includes(oid);
        } 

        // OWASP Level
        if (includeOID && this.state.filter.owasp_level < req.owasp_level) {
            includeOID = false;
        }

        // Text search
        if (includeOID && this.state.filter.searchText !== '') {
            const req_description = this.props.requirementsList[oid].description;
            const req_id = this.props.requirementsList[oid].readable_id;
            const searchText = this.state.filter.searchText;
            includeOID =  req_id.toLowerCase().includes(searchText) || req_description.toLowerCase().includes(searchText);
        }

        return includeOID
    };

    updateRequirements = (reqId) => {
        let reqs = [...this.state.selectedRequirements];
        const elem_index = reqs.indexOf(reqId);
        if (elem_index > -1) {
            reqs.splice(elem_index, 1);
        }
        else {
            reqs.push(reqId);
        }
        this.setState({'selectedRequirements': reqs});
    };

    render () {
        return (
            <>
                {this.state.updatingTemplate
                    ? <p> Loading... </p>
                    : <>
                        <div className="row my-3">
                            <div className="col-6">
                                <h2>{this.props.templateName}</h2>
                            </div>
                            <div className="col-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input"
                                                type="checkbox"
                                                id="selectedOnlyCheckbox" 
                                                name="selectedOnly" 
                                                checked={this.state.filter.selectedOnly} 
                                                onChange={this.handleFilterChange}
                                            />
                                            <label className="form-check-label">Only show selected items</label>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="unselectedOnlyCheckbox" 
                                                name="unselectedOnly" 
                                                checked={this.state.filter.unselectedOnly} 
                                                onChange={this.handleFilterChange}
                                            />
                                            <label className="form-check-label">Only show unselected items</label>
                                        </div>
                                    </div>
                                </form>
                                <div className="row my-2">
                                    <div className="col-3">
                                        <p>OWASP Level: {this.state.filter.owasp_level}</p>
                                    </div>
                                    <div className="col-7">
                                        <Form>
                                            <Form.Range
                                                name="slider_owasp_level" 
                                                min={1}
                                                max={3}
                                                value={this.state.filter.owasp_level} 
                                                onChange={this.handleFilterChange} 
                                            />
                                        </Form>
                                    </div>
                                </div>
                                <form className="row">
                                    <div className="col-10">
                                        <div className="input-group">
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                id="searchText" 
                                                name="searchTextInput" 
                                                value={this.state.filter.searchText}
                                                onChange={this.handleFilterChange}
                                            />
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                                        <FaSearch />
                                                    </IconContext.Provider>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col"></div>
                            <div className="col">
                                <button className="btn btn-primary me-2" onClick={this.doUpdateTemplate}>Update template</button>
                                <button type="button" className="btn btn-primary" onClick={this.clearFilter}>Clear filter</button>
                            </div>
                        </div>
                        <div className="row my-3">
                            {!this.props.requirementsListLoaded 
                                ? <p>Loading template requirements...</p>
                                :
                                <ul className="list-group">
                                    {Object.keys(this.props.requirementsList).filter(oid => this.filterRequirement(oid)).map((oid, index) => (
                                        <li key={oid} className="list-group-item p-0">
                                            <Requirement 
                                                id={oid} 
                                                checked={this.state.selectedRequirements.includes(oid)}
                                                readable_id={this.props.requirementsList[oid].readable_id}
                                                description={this.props.requirementsList[oid].description}
                                                updateRequirementsCallback={this.updateRequirements}
                                                owasp_level={this.props.requirementsList[oid].owasp_level}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    templateName: state.TemplateDetailsReducer.name,
    initialRequirements: state.TemplateDetailsReducer.requirements,
    requirementsList: state.RequirementReducer.requirements,
    requirementsListLoaded: state.RequirementReducer.loaded
});

export default connect(mapStateToProps, { 
    getTemplateDetails,
    getRequirements,
    clearTemplateDetails,
    updateTemplateDetails
})(TemplateDetails);
