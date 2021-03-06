import React from 'react';

import { connect } from 'react-redux';
import { Accordion } from "react-bootstrap";

import { getExerciseDetails, clearExerciseDetails, completeExercise } from '../../actions/exerciseDetails';
import { getFindingsForExercise, clearFindings } from '../../actions/finding';
import Finding from "./Finding";
import TestCaseList from "./TestCaseList";
import { Loading, DetailsHeader } from '../Common';


class ExerciseDetails extends React.Component {
    constructor (props) {
        super(props)

        const loaded = this.props.exerciseLoaded && this.props.findingsLoaded
        this.state = {
            loaded: loaded
        }

        this.completeExercise = this.completeExercise.bind(this);
    }

    componentDidMount () {
        this.props.getExerciseDetails(this.props.exerciseId);

        if (!this.props.findingsLoaded) {
            this.props.getFindingsForExercise(this.props.exerciseId)
        }
    }

    componentWillUnmount () {
        this.props.clearFindings();
        this.props.clearExerciseDetails();
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.exerciseLoaded && this.props.findingsLoaded) {
            this.setState({'loaded': true})
        }
    }

    completeExercise () {
        this.props.completeExercise(this.props.exerciseId)
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <DetailsHeader title={this.props.exerciseTitle}>
                            <div className="row">
                                <div className="col-4">
                                    <p>Creation date: <span className="fw-bold">{this.props.exerciseCreationDate}</span></p>
                                </div>
                                <div className="col-4">
                                    <p>Service: <span className="fw-bold">{this.props.serviceName}</span></p>
                                </div>
                                <div className="col-4">
                                    <p>Status:  
                                        <span className={this.props.exerciseCompleted ? "fw-bold text-success" : "fw-bold text-danger"}>
                                            {this.props.exerciseCompleted ? <> Completed</> : <> In progress</>}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-6">
                                    {this.props.exerciseCompleted
                                        ? <button className="btn btn-success" onClick={this.completeExercise}>Exercise complete</button>
                                        : <button className="btn btn-primary" onClick={this.completeExercise}>Complete exercise</button>
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
                            <TestCaseList exerciseId={this.props.exerciseId} />
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    exerciseTitle: state.ExerciseDetailsReducer.title,
    exerciseCreationDate: state.ExerciseDetailsReducer.creation_date,
    exerciseTemplate: state.ExerciseDetailsReducer.template,
    serviceName: state.ExerciseDetailsReducer.serviceName,
    exerciseLoaded: state.ExerciseDetailsReducer.loaded,
    exerciseCompleted: state.ExerciseDetailsReducer.finished,

    findingsLoaded: state.FindingReducer.loaded,
    findings: state.FindingReducer.findings
});

export default connect(mapStateToProps, {
    getExerciseDetails,
    clearExerciseDetails,
    clearFindings,
    getFindingsForExercise,
    completeExercise
})(ExerciseDetails);
