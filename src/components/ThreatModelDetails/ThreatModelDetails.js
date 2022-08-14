import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getThreatModelDetails, clearThreatModelDetails, completeThreatModel } from '../../actions/threatModelDetails';
import { Loading, DetailsHeader, ItemBadges } from '../Common';



class ThreatModelDetails extends React.Component {
    constructor (props) {
        super(props)

        const loaded = this.props.threatModelLoaded 
        this.state = {
            loaded: loaded
        }

        this.completeThreatModel = this.completeThreatModel.bind(this);
    }

    componentDidMount () {
        this.props.getThreatModelDetails(this.props.threatModelId);

    }

    componentWillUnmount () {
        this.props.clearThreatModelDetails();
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.threatModelLoaded) {
            this.setState({'loaded': true})
        }
    }

    completeThreatModel () {
        this.props.completeThreatModel(this.props.threatModelId)
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <DetailsHeader title={this.props.threatModelTitle}>
                            <div className="row">
                                <div className="col-4">
                                    <p>Creation date: <span className="fw-bold">{this.props.creationDate}</span></p>
                                </div>
                                <div className="col-4">
                                    <p>Status:  
                                        <span className={this.props.completionDate !== null ? "fw-bold text-success" : "fw-bold text-danger"}>
                                            {this.props.completionDate !== null ? <> Completed on {this.props.completionDate}</> : <> In progress</>}
                                        </span>
                                    </p>
                                </div>

                            </div>

                            <div className="row">
                                {this.props.review !== undefined &&
                                <div className="col-4">
                                    <p>Review: {this.props.review !== null 
                                        ? <Link to={"/reviews/" + this.props.review.oid}>
                                            <span className="fw-bold">{this.props.review.title}</span>
                                        </Link>
                                        : <>N/A</>
                                        }
                                    </p>
                                </div>
                                }
                                {this.props.services !== undefined  &&
                                    <div className="col-4">
                                        <ItemBadges items={this.props.services} type="service"/>
                                    </div>
                                }
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    {this.props.completionDate === null
                                        ? <button className="btn btn-success align-top" onClick={this.completeThreatModel}>Mark as completed</button>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </DetailsHeader>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    threatModelTitle: state.ThreatModelDetailsReducer.title,
    creationDate: state.ThreatModelDetailsReducer.creationDate,
    completionDate: state.ThreatModelDetailsReducer.completionDate,
    review: state.ThreatModelDetailsReducer.review,
    services: state.ThreatModelDetailsReducer.services,
    threatModelLoaded: state.ThreatModelDetailsReducer.loaded,
});

export default connect(mapStateToProps, {
    getThreatModelDetails,
    clearThreatModelDetails,
    completeThreatModel
})(ThreatModelDetails);
