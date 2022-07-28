import React from 'react';

import { connect } from 'react-redux';

import { Loading } from '../Common';
import TestCase from "./TestCase";
import OwaspSectionTitle from "./OwaspSectionTitle";
import { getTestCaseForExercise, clearTestCases, bulkUpdateTestCase } from '../../actions/testCase';
import { createFinding } from '../../actions/finding';


class TestCaseList extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            loaded: this.props.testCasesLoaded,
            selectedTests: {},
            selectedSections: {}
        }

        this.createFinding = this.createFinding.bind(this);
        this.handleSectionClick = this.handleSectionClick.bind(this);
        this.updateSelectedTCCallback = this.updateSelectedTCCallback.bind(this);
        this.bulkEdit = this.bulkEdit.bind(this);
    }

    componentDidMount () {
        if (!this.props.testCasesLoaded) {
            this.props.getTestCaseForExercise(this.props.exerciseId)


            let auxSelectedTests = {}
            let auxSelectedSections = {}
            Object.keys(this.props.testCases).forEach(oid => {
                auxSelectedTests[oid] = false
                auxSelectedSections[this.props.testCases[oid].requirement.owasp_section] = false
            });

            this.setState({'selectedTests': auxSelectedTests, 'selectedSections': auxSelectedSections})
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

    handleSectionClick (section) {
        let auxSelectedTests = this.state.selectedTests;
        let auxSelectedSections = this.state.selectedSections;
        let newSectionState = !this.state.selectedSections[section];

        Object.entries(this.props.testCases).filter(
            ([k, v]) => v.requirement.owasp_section === section).forEach(
                ([k, val]) => {
                    auxSelectedTests[k] = newSectionState;
                })

        auxSelectedSections[section] = newSectionState;
        this.setState({'selectedTests': auxSelectedTests, 'selectedSections': auxSelectedSections})
    }

    updateSelectedTCCallback (oid) {
        let auxSelectedTests = this.state.selectedTests;
        auxSelectedTests[oid] = !auxSelectedTests[oid];
        this.setState({'selectedTests': auxSelectedTests});
    }

    clearSelected () {
        let auxSelectedTests = this.state.selectedTests;
        let auxSelectedSections = this.state.selectedSections;

        Object.keys(auxSelectedTests).forEach(k => {
            auxSelectedTests[k] = false;
        })

        Object.keys(auxSelectedSections).forEach(k => {
            auxSelectedSections[k] = false;
        })

        this.setState({'selectedTests': auxSelectedTests, 'selectedSections': auxSelectedSections})
    }

    bulkEdit (data) {
        let idsList = Object.keys(Object.fromEntries(
            Object.entries(this.state.selectedTests).filter(([a, b]) => b)));
        this.props.bulkUpdateTestCase(idsList, data);
        this.clearSelected();
    }

    render () {
        let listItems = [];
        let prevSection = 0;

        Object.keys(this.props.testCases).forEach(oid => {
            let section = this.props.testCases[oid].requirement.owasp_section;

            if (prevSection < section) {
                listItems.push(<OwaspSectionTitle 
                    key={"owasp-section-" + section}
                    clickListener={this.handleSectionClick} 
                    selected={this.state.selectedSections[section]}
                    section={section}/>);
                prevSection++;
            }

            listItems.push(<TestCase 
                key={oid}
                testId={oid} 
                creationDate={this.props.testCases[oid].creation_date}
                testStatus={this.props.testCases[oid].status}
                description={this.props.testCases[oid].description}
                requirement={this.props.testCases[oid].requirement}
                createFindingCallback={this.createFinding}
                selected={this.state.selectedTests[oid]}
                updateSelectedCallback={this.updateSelectedTCCallback}
                bulkEditCallback={this.bulkEdit}
                />);
        });

        return (
            <>
            {!this.state.loaded
                ? <Loading />
                : <>
                <h2>Test cases</h2>
                <table className="table table-sm">
                    <thead>
                        <tr>
                        <th scope="col-1"></th>
                        <th scope="col-1">Requirement</th>
                        <th scope="col-2">Status</th>
                        <th scope="col-6">Description</th>
                        <th scope="col-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listItems}
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
    clearTestCases,
    bulkUpdateTestCase
})(TestCaseList);
