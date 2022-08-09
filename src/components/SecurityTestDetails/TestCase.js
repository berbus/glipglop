import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { MdPlaylistAdd } from "react-icons/md";
import { Form }from 'react-bootstrap';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';

import { updateTestCase } from '../../actions/testCase';
import { Loading, OnClickEditor } from '../Common';


const statusOptions = [
    'PENDING',
    'FAIL',
    'SUCCESS'
]


class TestCase extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            loaded: true
        }

        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
        this.handleTestCaseStatusChange = this.handleTestCaseStatusChange.bind(this);
        this.createFinding = this.createFinding.bind(this);
    }

    handleChangeDescription (newValue) {
        if (this.props.selected) {
            const data = {'new_data': {'description': newValue}}
            this.props.bulkEditCallback(data)
        } else {
            const data = {'description': newValue}
            this.props.updateTestCase(this.props.testId, data)
        }
    }

    handleChangeSelected () {
        this.props.updateSelectedCallback(this.props.testId);
    }

    createFinding () {
        this.props.createFindingCallback(this.props.testId);
    }

    handleTestCaseStatusChange (event) {
        let data = {status: event.target.value};

        if (this.props.selected) {
            data = {'new_data': data}
            this.props.bulkEditCallback(data)
        } else {
            this.props.updateTestCase(this.props.testId, data)
        }
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    :<tr className={`${this.props.selected ? "selected" : ""}`}>
                        <td className="col-1" id={this.props.testId} onClick={this.handleChangeSelected}>
                            <div  className="p-2 align-middle">
                                <IconContext.Provider value={{ size: "2em" }}>
                                    {this.props.selected
                                        ? <ImCheckboxChecked />
                                        : <ImCheckboxUnchecked />
                                    }
                                </IconContext.Provider>
                            </div>
                        </td>
                        <td className="col-1" id={this.props.testId}>
                            <p title={this.props.requirement.description} className="p-2 m-0">
                                {this.props.requirement.readable_id}
                            </p>
                        </td>
                        <td className="col-2">
                            <Form>
                                <Form.Select
                                    id="testCaseStatus"
                                    name="status"
                                    onChange={this.handleTestCaseStatusChange}
                                    value={this.props.testStatus}>
                                    {statusOptions.map((value, i) => {
                                        return <option key={i} value={value}>{value}</option>
                                    })}
                                </Form.Select>
                            </Form>
                        </td>
                        <td className="col-6">
                            <OnClickEditor 
                                initialData={this.props.description} 
                                saveHandler={this.handleChangeDescription} 
                            />
                        </td>
                        <td className="col-2">
                            <button className="btn btn-primary" onClick={this.createFinding}>
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <MdPlaylistAdd />
                                </IconContext.Provider>
                            </button>
                        </td>
                    </tr>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateTestCase })(TestCase);
