import React from 'react';

import { connect } from 'react-redux';
import { Accordion } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { getSecurityTestDetails, clearSecurityTestDetails, completeSecurityTest } from '../../actions/securityTestDetails';
import { getFindingsForSecurityTest, clearFindings } from '../../actions/finding';
import Finding from "./Finding";
import TestCaseList from "./TestCaseList";
import { Loading, DetailsHeader, ItemBadges } from '../Common';


class SecurityTestDetails extends React.Component {
    constructor (props) {
        super(props)

        const loaded = this.props.securityTestLoaded && this.props.findingsLoaded
        this.state = {
            loaded: loaded
        }

        this.completeSecurityTest = this.completeSecurityTest.bind(this);
    }

    componentDidMount () {
        this.props.getSecurityTestDetails(this.props.securityTestId);

        if (!this.props.findingsLoaded) {
            this.props.getFindingsForSecurityTest(this.props.securityTestId)
        }
    }

    componentWillUnmount () {
        this.props.clearFindings();
        this.props.clearSecurityTestDetails();
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.securityTestLoaded && this.props.findingsLoaded) {
            this.setState({'loaded': true})
        }
    }

    completeSecurityTest () {
        this.props.completeSecurityTest(this.props.securityTestId)
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <DetailsHeader title={this.props.securityTestTitle}>
                            <div className="row">
                                <div className="col-4">
                                    <p>Creation date: <span className="fw-bold">{this.props.creationDate}</span></p>
                                </div>
                                <div className="col-4">
                                    <p>Status:  
                                        <span className={this.props.completionDate !== null 
                                            ? "fw-bold text-success" 
                                            : "fw-bold text-danger"}>
                                            {this.props.completionDate !== null 
                                                ? <> Completed on {this.props.completionDate}</> 
                                                : <> In progress</>}
                                        </span>
                                    </p>
                                </div>

                            </div>

                            <div className="row">
                                {this.props.review !== undefined && this.props.services !== undefined && this.props.template !== undefined
                                    ? <>
                                        <div className="col-4">
                                            <p>Review: {this.props.review !== null 
                                                ? <Link to={"/reviews/" + this.props.review.oid}>
                                                    <span className="fw-bold">{this.props.review.title}</span>
                                                </Link>
                                                : <>N/A</>
                                                }
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <ItemBadges items={this.props.services} type="service"/>
                                        </div>
                                        <div className="col-4">
                                            <p>Template: 
                                                <Link to={"/templates/" + this.props.template.oid}>
                                                    <span className="fw-bold"> {this.props.template.name}</span>
                                                </Link>
                                            </p>
                                        </div>
                                    </>
                                    :<></>
                                }
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    {this.props.completionDate === null
                                        ? <button className="btn btn-success align-top" onClick={this.completeSecurityTest}>Mark as completed</button>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </DetailsHeader>

                        <div className="row">
                            <h2>Findings</h2>
                            {this.props.findingsLoaded
                                ? <>
                                    {this.props.findings.length === 0
                                        ? <p>No findings.</p>
                                        : 
                                        <Accordion defaultActiveKey="0">
                                            {this.props.findings.map((finding, index) => ( 
                                                <Finding 
                                                    findingId={finding.oid}
                                                    key={finding.oid}
                                                    title={finding.title}
                                                    description={finding.description}
                                                    evidence={finding.evidence}
                                                    status={finding.status}
                                                    impact={finding.impact}
                                                    testCase={finding.test_case}
                                                    findingIndex={index}
                                                />
                                            ))}
                                        </Accordion>
                                    }
                                </>
                                :<p>Loading findings...</p>
                            }
                        </div>
                        <div className="row mt-5">
                            <TestCaseList securityTestId={this.props.securityTestId} />
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    securityTestTitle: state.SecurityTestDetailsReducer.title,
    creationDate: state.SecurityTestDetailsReducer.creationDate,
    completionDate: state.SecurityTestDetailsReducer.completionDate,
    template: state.SecurityTestDetailsReducer.template,
    review: state.SecurityTestDetailsReducer.review,
    services: state.SecurityTestDetailsReducer.services,
    securityTestLoaded: state.SecurityTestDetailsReducer.loaded,
    findingsLoaded: state.FindingReducer.loaded,
    findings: state.FindingReducer.findings
});

export default connect(mapStateToProps, {
    getSecurityTestDetails,
    clearSecurityTestDetails,
    clearFindings,
    getFindingsForSecurityTest,
    completeSecurityTest
})(SecurityTestDetails);
