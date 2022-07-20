import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { MdPlaylistAdd } from "react-icons/md";
import { Form }from 'react-bootstrap';

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
            loaded: true,
            testStatus: this.props.testStatus
        }

        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeSelected = this.handleChangeSelected.bind(this);
        this.handleTestCaseChange = this.handleTestCaseChange.bind(this);
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

    handleTestCaseChange (event) {
        let data = {}
        const newValue = event.target.value;
        const statusKey = event.target.name;
        data[statusKey] = newValue;

        this.setState(data);
        if (this.props.selected) {
            data = {'new_data': {'status': newValue}}
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
                    :<tr>
                        <td className="col-1" id={this.props.testId} onClick={this.handleChangeSelected}>
                            {this.props.selected ? <>O</> : <>X</>}
                        </td>
                        <td className="col-1" id={this.props.testId}>
                            <p title={this.props.requirement.description}>
                                {this.props.requirement.readable_id}
                            </p>
                        </td>
                        <td className="col-2">
                            <Form>
                                <Form.Select
                                    id="testCaseStatus"
                                    name="testStatus"
                                    onChange={this.handleTestCaseChange}
                                    value={this.state.testStatus}>
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
