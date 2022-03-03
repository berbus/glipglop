import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { MdPlaylistAdd } from "react-icons/md";
import { Form }from 'react-bootstrap';

import { updateTestCase } from '../../actions/testCase';
import OnClickEditor from '../Common/OnClickEditor';
import Loading from "../Common/Loading";


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
            status: this.props.status
        }

        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleTestCaseChange = this.handleTestCaseChange.bind(this);
        this.createFinding = this.createFinding.bind(this);
    }

    handleChangeStatus (newStatus) {
        const data = {'status': newStatus.value}
        this.props.updateTestCase(this.props.testId, data)
    }

    handleChangeDescription (newValue) {
        const data = {'description': newValue}
        this.props.updateTestCase(this.props.testId, data)
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
        this.props.updateTestCase(this.props.testId, data)
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    :<tr>
                        <td className="col-2" id={this.props.testId}>
                            <p title={this.props.requirement.description}>
                                {this.props.requirement.readable_id}
                            </p>
                        </td>
                        <td className="col-2">
                            <Form>
                                <Form.Select
                                    id="testCaseStatus"
                                    name="status"
                                    onChange={this.handleTestCaseChange}
                                    value={this.state.status}>
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
