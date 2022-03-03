import React from 'react';

import { connect } from 'react-redux';

import Loading from "../Common/Loading";
import TestCase from "./TestCase";
import { getTestCaseForExercise, clearTestCases } from '../../actions/testCase';
import { createFinding } from '../../actions/finding';


class TestCaseList extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            loaded: this.props.testCasesLoaded
        }

        this.createFinding = this.createFinding.bind(this);
    }

    componentDidMount () {
        if (!this.props.testCasesLoaded) {
            this.props.getTestCaseForExercise(this.props.exerciseId)
        };
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.testCasesLoaded) {
            this.setState({'loaded': true})
        }
    }

    componentWillUnmount () {
        this.props.clearTestCases();
    }

    createFinding (testCaseId) {
        this.props.createFinding(this.props.exerciseId, testCaseId);
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <h2>Test cases</h2>
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">Requirement</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(this.props.testCases).map((oid, index) => (
                                    <TestCase
                                        key={oid}
                                        testId={oid} 
                                        creationDate={this.props.testCases[oid].creation_date}
                                        status={this.props.testCases[oid].status}
                                        description={this.props.testCases[oid].description}
                                        requirement={this.props.testCases[oid].requirement}
                                        createFindingCallback={this.createFinding}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    testCases: state.TestCaseReducer.testCases,
    testCasesLoaded: state.TestCaseReducer.loaded,
});

export default connect(mapStateToProps, {
    createFinding,
    getTestCaseForExercise,
    clearTestCases
})(TestCaseList);
