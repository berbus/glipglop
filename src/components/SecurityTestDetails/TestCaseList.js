import React from 'react';

import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/Collapse';

import { Loading } from '../Common';
import TestCase from "./TestCase";
import OwaspSectionTitle from "./OwaspSectionTitle";
import { getTestCaseForSecurityTest, clearTestCases, bulkUpdateTestCase } from '../../actions/testCase';
import { createFinding } from '../../actions/finding';
import FloatingButton from './FloatingButton';


class TestCaseList extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            loaded: this.props.testCasesLoaded,
            testCaseSelection: {},
            visibleSections: Array(14).fill(false)
        }

        this.createFinding = this.createFinding.bind(this);
        this.toggleSection = this.toggleSection.bind(this);
        this.handleSectionClick = this.handleSectionClick.bind(this);
        this.updateSelectedTCCallback = this.updateSelectedTCCallback.bind(this);
        this.bulkEdit = this.bulkEdit.bind(this);
        this.clearSelected = this.clearSelected.bind(this);
    }

    componentDidMount () {
        if (!this.props.testCasesLoaded) {
            this.props.getTestCaseForSecurityTest(this.props.securityTestId)
        };
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.testCasesLoaded) {
            let auxTestCaseSelection = {}
            Object.keys(this.props.testCases).forEach(oid => {
                auxTestCaseSelection[oid] = {selected: false, section: this.props.testCases[oid].requirement.owasp_section}
            });

            this.setState({'testCaseSelection': auxTestCaseSelection, 'loaded': true})
        }
    }

    componentWillUnmount () {
        this.props.clearTestCases();
    }

    createFinding (testCaseId) {
        this.props.createFinding(this.props.securityTestId, testCaseId);
    }

    handleSectionClick (section) {
        let auxTestCaseSelection = this.state.testCaseSelection;
        let newSectionState = !Object.values(this.state.testCaseSelection)
            .filter(v => v.section === section)
            .every(v => v.selected === true);
        let sectionTestCases = Object.keys(this.state.testCaseSelection)
            .filter(oid => this.state.testCaseSelection[oid].section === section);

        sectionTestCases.forEach(oid => {
            auxTestCaseSelection[oid].selected = newSectionState;
        });

        this.setState({'testCaseSelection': auxTestCaseSelection})
    }

    updateSelectedTCCallback (oid) {
        let auxTestCaseSelection = this.state.testCaseSelection;
        auxTestCaseSelection[oid].selected = !auxTestCaseSelection[oid].selected;
        this.setState({'testCaseSelection': auxTestCaseSelection});
    }

    clearSelected () {
        let auxTestCaseSelection = this.state.testCaseSelection;
        Object.keys(this.state.testCaseSelection).forEach(oid => {
            auxTestCaseSelection[oid].selected = false;
        });

        this.setState({'testCaseSelection': auxTestCaseSelection})
    }

    bulkEdit (data) {
        let idsList = Object.keys(this.state.testCaseSelection).filter(oid => this.state.testCaseSelection[oid].selected)
        this.props.bulkUpdateTestCase(idsList, data);
        this.clearSelected();
    }

    toggleSection (sectionId) {
        let aux = this.state.visibleSections;
        aux[sectionId] = !aux[sectionId];
        this.setState({visibleSections: aux});
    }

    render () {
        let listItems = [];
        let tmpListItems = [];
        let prevSection = 0;

        if (Object.keys(this.state.testCaseSelection).length !== 0) {
            Object.keys(this.props.testCases).forEach(oid => {
                let section = this.props.testCases[oid].requirement.owasp_section;

                if (prevSection < section) {

                    if (prevSection !== 0) {
                        listItems.push(
                            <div>
                                <Collapse in={this.state.visibleSections[prevSection]}>
                                    <table className="table table-sm">
                                        <tbody>
                                            {tmpListItems}
                                        </tbody>
                                    </table>
                                </Collapse>
                            </div>
                        );
                        tmpListItems = [];
                    }

                    listItems.push(<OwaspSectionTitle 
                        key={"owasp-section-" + section}
                        selectAllClickCallback={this.handleSectionClick} 
                        toggleVisibleCallback={this.toggleSection}
                        selected={Object.values(this.state.testCaseSelection)
                                .filter(v => v.section === section)
                                .some(v => v.selected === true)}
                        visible={this.state.visibleSections[section]}
                        section={section}/>);

                    prevSection = section
                } 

                tmpListItems.push(<TestCase 
                    key={oid}
                    testId={oid} 
                    creationDate={this.props.testCases[oid].creation_date}
                    testStatus={this.props.testCases[oid].status}
                    description={this.props.testCases[oid].description}
                    requirement={this.props.testCases[oid].requirement}
                    createFindingCallback={this.createFinding}
                    selected={this.state.testCaseSelection[oid].selected}
                    updateSelectedCallback={this.updateSelectedTCCallback}
                    bulkEditCallback={this.bulkEdit}
                />);
            });
        }

        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <h2>Test cases</h2>
                        {listItems}
                        {Object.values(this.state.testCaseSelection).every(v => v.selected === false) 
                            ? <></>
                            : <FloatingButton action={this.clearSelected}/>
                        }
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
    getTestCaseForSecurityTest,
    clearTestCases,
    bulkUpdateTestCase
})(TestCaseList);
