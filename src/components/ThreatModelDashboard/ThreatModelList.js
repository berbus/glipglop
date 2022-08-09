import React from 'react';

import { connect } from 'react-redux';

import ThreatModel from './ThreatModel';
import { getThreatModels } from '../../actions/threatModel';
import { Loading } from '../Common';
import NewThreatModelPopup from './NewThreatModelPopup';


class ThreatModelList extends React.Component {
    componentDidMount() {
        if (!this.props.threatModelsLoaded) {
            this.props.getThreatModels();
        }
    }

    render () {
        return (
            <>
                {!this.props.threatModelsLoaded
                    ? <Loading />
                    : <>
                        <div className="row">
                            <div className="col-8"></div>
                            <div className="col-4">
                                <NewThreatModelPopup />
                            </div>
                        </div>
                        <div className="row mt-4">
                            {Object.keys(this.props.threatModels).length === 0 
                                ? <p>No threat models tests found</p>
                                : <ul className="list-group">
                                    {Object.keys(this.props.threatModels).map((oid, index) => ( 
                                        <li key={oid} className="list-group-item">
                                            <ThreatModel 
                                                id={oid} 
                                                title={this.props.threatModels[oid].title} 
                                                creation_date={this.props.threatModels[oid].creation_date}
                                                completion_date={this.props.threatModels[oid].completion_date}
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
    threatModels: state.ThreatModelReducer.threat_models,
    threatModelsLoaded: state.ThreatModelReducer.loaded
});

export default connect(mapStateToProps, { getThreatModels })(ThreatModelList);
