import React from 'react';

import { connect } from 'react-redux';

import { getReviewDetails, clearReviewDetails, completeReview } from '../../actions/reviewDetails';
import { Loading, DetailsHeader, ItemBadges } from '../Common';
import NewSecurityTestPopup from '../SecurityTestDashboard/NewSecurityTestPopup';
import NewThreatModelPopup from '../ThreatModelDashboard/NewThreatModelPopup';


class ReviewDetails extends React.Component {
    constructor (props) {
        super(props)

        const loaded = this.props.reviewLoaded
        this.state = {
            loaded: loaded
        }

        this.completeReview = this.completeReview.bind(this);
    }

    componentDidMount () {
        this.props.getReviewDetails(this.props.reviewId);
    }

    componentWillUnmount () {
        this.props.clearReviewDetails();
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.reviewLoaded) {
            this.setState({'loaded': true})
        }
    }

    completeReview () {
        this.props.completeReview(this.props.reviewId)
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <DetailsHeader title={"Security Review: " + this.props.reviewTitle}>
                            <div className="row">
                                <div className="col-4">
                                    <p>Creation date: <span className="fw-bold">{this.props.creationDate}</span></p>
                                </div>
                                <div className="col-4">
                                    <p>Status:  
                                        <span className={this.props.completionDate 
                                            ? "fw-bold text-success" 
                                            : "fw-bold text-danger"}>
                                            {this.props.completionDate 
                                                ? <> Completed on {this.props.completionDate}</> 
                                                : <> In progress</>}
                                        </span>
                                    </p>
                                </div>
                                <div className="col-4">
                                    <p>Jira issue: 
                                        {this.props.jiraIssue
                                            ? <> 
                                                <a href={this.props.jiraIssue.url} target="_blank" rel="noreferrer">
                                                    <span> {this.props.jiraIssue.jira_id}</span>
                                                    </a>
                                                    </>
                                            : <> N/A</>
                                        }
                                    </p>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-6">
                                    {this.props.completionDate
                                        ? <></>
                                        : <button className="btn btn-primary" onClick={this.completeReview}>Complete review</button>
                                    }
                                </div>
                            </div>
                        </DetailsHeader>

                        <div className="row">
                            <div className="col-4">
                                <div className="row">
                                    <h3>Service</h3>
                                    <ItemBadges lineBreak={true} items={this.props.services} type="service"/>
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="row">
                                    <h3>Threat Model</h3>
                                    <ItemBadges lineBreak={true} items={this.props.threatModels} type="tm"/>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-8">
                                        <NewThreatModelPopup 
                                            services={this.props.services}
                                            reviewId={this.props.reviewId}
                                        />
                                    </div>
                                    <div className="col-4"></div>
                                </div>
                            </div>

                            <div className="col-4">
                                <div className="row">
                                    <h3>Security Test</h3>
                                    <ItemBadges lineBreak={true} items={this.props.securityTests} type="st"/>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-8">
                                        <NewSecurityTestPopup 
                                            services={this.props.services}
                                            reviewId={this.props.reviewId}
                                        />
                                    </div>
                                    <div className="col-4"></div>
                                </div>
                            </div>

                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    reviewTitle: state.ReviewDetailsReducer.title,
    creationDate: state.ReviewDetailsReducer.creation_date,
    completionDate: state.ReviewDetailsReducer.completion_date,
    jiraIssue: state.ReviewDetailsReducer.jiraIssue,
    reviewLoaded: state.ReviewDetailsReducer.loaded,
    services: state.ReviewDetailsReducer.services,
    securityTests: state.ReviewDetailsReducer.securityTests,
    threatModels: state.ReviewDetailsReducer.threatModels
});

export default connect(mapStateToProps, {
    getReviewDetails,
    clearReviewDetails,
    completeReview
})(ReviewDetails);
