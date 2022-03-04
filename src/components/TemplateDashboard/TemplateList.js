import React from 'react';

import { connect } from 'react-redux';

import Template from "./Template";
import { getTemplates } from '../../actions/template';
import NewTemplatePopup from "./NewTemplatePopup";
import { Loading } from '../Common';


class TemplateList extends React.Component {
    componentDidMount() {
        if(!this.props.templatesLoaded) {
            this.props.getTemplates();
        }
    }

    render () {
        return (
            <>
                    {!this.props.templatesLoaded
                        ? <Loading />
                        : <>
                            <div className="row">
                                <NewTemplatePopup />
                            </div>
                            <div className="row mt-4">
                                {Object.keys(this.props.templates).length === 0 
                                    ? <p>No templates found</p>
                                    : <ul className="list-group">
                                        {Object.keys(this.props.templates).map((oid, index) => ( 
                                            <li key={oid} className="list-group-item">
                                                <Template 
                                                    id={oid} 
                                                    name={this.props.templates[oid].name} 
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
    templates: state.TemplateReducer.templates,
    templatesLoaded: state.TemplateReducer.loaded,
});

export default connect(mapStateToProps, { getTemplates })(TemplateList);
