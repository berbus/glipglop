import React from 'react';

import { connect } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import { Form } from 'react-bootstrap';

import { 
    getJiraTransitions,
    createJiraTransition,
    getGarrettActions,
    getJiraStatuses
} from '../../actions/jiraTransition';
import { Loading } from '../Common';
import JiraTransition from './JiraTransition';
import JiraConfig from './JiraConfig';


class Settings extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            newTransitionAlias: "",
            newTransitionName: "",
            newTransitionAction: "",
            creatingTransition: false
        }

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addTransition = this.addTransition.bind(this);
    }

    componentDidMount () {
        if (!this.props.jiraTransitionsLoaded) {
            this.props.getJiraTransitions();
        }
        if (!this.props.garrettActionsLoaded) {
            this.props.getGarrettActions();
        } 
        if (!this.props.jiraStatusesLoaded) {
            this.props.getJiraStatuses();
        } 
    }

    componentDidUpdate(prevProps) {
        if (this.props.garrettActions.length > 0 && this.state.newTransitionAction === "") {
            this.setState({newTransitionAction: this.props.garrettActions[0]});
        }

        if (!this.props.creatingTransition && this.state.creatingTransition) {
                if (this.props.creatingTransitionSuccess) {
                    this.setState({newTransitionAlias: "", newTransitionName: "", newTransitionAction: ""});
                }
                this.setState({creatingTransition: false});
        }
    }

    addTransition () {
        this.setState({creatingTransition: true});

        const data = {
            'transition_name': this.state.newTransitionName,
            'transition_alias': this.state.newTransitionAlias,
            'garrett_action': this.state.newTransitionAction
        };
        this.props.createJiraTransition(data);
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render () {
        let jiraTransitions = [];

        Object.keys(this.props.jiraTransitions).forEach(oid => {
            jiraTransitions.push(<JiraTransition
                key={"jira-transition" + oid}
                transitionId={oid}
                transitionAlias={this.props.jiraTransitions[oid].transition_alias}
                transitionName={this.props.jiraTransitions[oid].transition_name}
                garrettAction={this.props.jiraTransitions[oid].garrett_action}
            />)
        });

        return (
            <>
            <h1>Settings</h1>
            <h2>Jira transitions</h2>
            {!this.props.jiraTransitionsLoaded || !this.props.jiraStatusesLoaded || this.state.creatingTransition
                ? <Loading />
                : <>
                <table className="table table-sm">
                    <thead>
                    <tr>
                        <th scope="col">Garrett action</th>
                        <th scope="col">New Jira State</th>
                        <th scope="col">Transition alias</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {jiraTransitions}
                        <tr>
                        <td>
                            <Form>
                                <Form.Select
                                    id="garrettAction"
                                    name="newTransitionAction"
                                    onChange={this.handleChangeEvent}>
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
                                    onChange={this.handleChangeEvent}>
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
                                <button className="btn btn-primary mx-2" onClick={this.addTransition}>
                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                        <AiOutlinePlus />
                                    </IconContext.Provider>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
            }
                <h2>Jira authentication config</h2>
                <JiraConfig />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    jiraTransitions: state.JiraTransitionReducer.transitions,
    jiraTransitionsLoaded: state.JiraTransitionReducer.transitionsLoaded,
    creatingTransition: state.JiraTransitionReducer.creatingTransition,
    creatingTransitionSuccess: state.JiraTransitionReducer.creatingTransitionSuccess,
    garrettActions: state.JiraTransitionReducer.garrettActions,
    garrettActionsLoaded: state.JiraTransitionReducer.garrettActionsLoaded,
    jiraStatuses: state.JiraTransitionReducer.statuses,
    jiraStatusesLoaded: state.JiraTransitionReducer.statusesLoaded
});

export default connect(mapStateToProps, {
    getJiraTransitions,
    createJiraTransition,
    getGarrettActions,
    getJiraStatuses
})(Settings);
