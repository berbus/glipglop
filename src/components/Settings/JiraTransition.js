import React from 'react';

import { connect } from 'react-redux';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Form } from 'react-bootstrap';

import { 
    updateJiraTransition,
    deleteJiraTransition 
} from '../../actions/jiraTransition';


class JiraTransition extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            edit: false,
            newTransitionAlias: this.props.transitionAlias,
            newTransitionName: this.props.transitionName,
            newTransitionAction: this.props.garrettAction,
            updatingTransition: false
        }

        this.saveChanges = this.saveChanges.bind(this);
        this.clearChanges = this.clearChanges.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.deleteTransition = this.deleteTransition.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!this.props.updatingTransition && this.state.updatingTransition) {
                if (this.props.updatingTransitionSuccess) {
                    this.setState({edit: false, updatingTransition: false});
                }
        }
    }

    saveChanges () {
        this.setState({updatingTransition: true});
        const data = {
            'transition_name': this.state.newTransitionName,
            'transition_alias': this.state.newTransitionAlias,
            'garrett_action': this.state.newTransitionAction
        };

        this.props.updateJiraTransition(this.props.transitionId, data);
    }


    clearChanges () {
        this.setState({
            'newTransitionAlias': this.props.transitionAlias,
            'newTransitionName': this.props.transitionName,
            'newTransitionAction': this.props.garrettAction
        })
        this.toggleEdit();
    }

    toggleEdit () {
        this.setState({'edit': !this.state.edit});
    }

    deleteTransition () {
        this.props.deleteJiraTransition(this.props.transitionId);
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render () {
        return (
            <>
                <tr>
                    {this.state.edit
                        ? <>
                        <td>
                            <Form>
                                <Form.Select
                                    id="garrettAction"
                                    name="newTransitionAction"
                                    onChange={this.handleChangeEvent}
                                    value={this.state.garrettAction}>
                                    {this.props.garrettActions.map((value, i) => {
                                        return <option key={i} value={value}>{value}</option>
                                    })}
                                </Form.Select>
                            </Form>
                        </td>
                        <td>
                            <Form>
                                <Form.Select
                                    id="newTransitionName"
                                    name="newTransitionName"
                                    onChange={this.handleChangeEvent}
                                    value={this.state.newTransitionName}>
                                    {this.props.jiraStatuses.map((value, i) => {
                                        return <option key={i} value={value}>{value}</option>
                                    })}
                                </Form.Select>
                            </Form>
                        </td>
                        <td>
                            <input
                                type="text" 
                                className="form-control"
                                value={this.state.newTransitionAlias}
                                name="newTransitionAlias"
                                onChange={this.handleChangeEvent}
                            />
                        </td>
                        <td>
                            <button className="btn btn-primary mx-2" onClick={this.saveChanges}>
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <AiFillCheckCircle />
                                </IconContext.Provider>
                            </button>
                            <button className="btn btn-primary" onClick={this.clearChanges}>
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <MdOutlineCancel />
                                </IconContext.Provider>
                            </button>
                        </td>
                        </>
                        : <>
                            <td className="align-middle">{this.props.garrettAction}</td>
                            <td className="align-middle">{this.props.transitionName}</td>
                            <td className="align-middle">{this.props.transitionAlias}</td>
                            <td>
                                <button className="btn btn-primary mx-2" onClick={this.toggleEdit}>
                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                        <FaRegEdit />
                                    </IconContext.Provider>
                                </button>
                                <button className="btn btn-primary" onClick={this.deleteTransition}>
                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                        <FaTrash />
                                    </IconContext.Provider>
                                </button>
                            </td>
                        </>
                    }

                </tr>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    garrettActions: state.JiraTransitionReducer.garrettActions,
    garrettActionsLoaded: state.JiraTransitionReducer.garrettActionsLoaded,
    updatingTransition: state.JiraTransitionReducer.updatingTransition,
    updatingTransitionSuccess: state.JiraTransitionReducer.updatingTransitionSuccess,
    jiraStatuses: state.JiraTransitionReducer.statuses,
    jiraStatusesLoaded: state.JiraTransitionReducer.statusesLoaded
});

export default connect(mapStateToProps, {
    updateJiraTransition,
    deleteJiraTransition
})(JiraTransition);
