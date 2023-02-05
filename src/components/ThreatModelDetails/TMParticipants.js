import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaTrash } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';

import { 
    getTMParticipantsForTM,
    clearTMParticipants,
    deleteTMParticipant,
    createTMParticipant 
} from '../../actions/tmParticipant';


class TMParticipants extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            newParticipantName: '',
            newParticipantRole: '',
            addingParticipant: false
        }
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addParticipant = this.addParticipant.bind(this);
    }

    componentDidMount () {
        this.props.getTMParticipantsForTM(this.props.threatModelId);
    }

    componentWillUnmount () {
        this.props.clearTMParticipants();
    }

    componentDidUpdate(prevProps) {
        if (this.state.addingParticipant && this.props.loaded && this.props.participantCreationSuccess !== null) {
            let newState;
            if (this.props.participantCreationSuccess) {
                newState = {newParticipantName: '', newParticipantRole: '', addingParticipant: false};
            } else {
                newState = {addingParticipant: false};
            }
            this.setState(newState);
        }
    }

    deleteParticipant (e) {
        this.props.deleteTMParticipant(e);
    }

    addParticipant () {
        this.setState({addingParticipant: true});

        const data = {
            'name': this.state.newParticipantName,
            'role': this.state.newParticipantRole,
            'threat_model': this.props.threatModelId
        }

        this.props.createTMParticipant(data);
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render () {
        return (
            <>

                <div className="row">
                    <div className="col">
                        <h2>Participants</h2>
                    </div>
                </div>
                {!this.props.loaded 
                    ? <p>loading</p>
                    : <div className="row">
                        <div className="col">
                            <table className="table table-sm">
                                <thead>
                                    <tr>
                                        <th scope="col">Stakeholder</th>
                                        <th scope="col">Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.participants.map((participant, index) => (
                                        <tr key={participant.oid}>
                                            <td>{participant.name}</td>
                                            <td>{participant.role}</td>
                                            <td>
                                                <button className="btn btn-primary mx-2" id="asdf" onClick={() => this.deleteParticipant(participant.oid)}>
                                                    <IconContext.Provider value={{ size: "1.5em" }}>
                                                        <FaTrash />
                                                    </IconContext.Provider>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr key="new-participant-key">
                                        <td>
                                            <input
                                                type="text" 
                                                className="form-control"
                                                value={this.state.newParticipantName}
                                                name="newParticipantName"
                                                onChange={this.handleChangeEvent}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text" 
                                                className="form-control"
                                                value={this.state.newParticipantRole}
                                                name="newParticipantRole"
                                                onChange={this.handleChangeEvent}
                                            />
                                        </td>
                                        <td>
                                            <button className="btn btn-primary mx-2" onClick={this.addParticipant}>
                                                <IconContext.Provider value={{ size: "1.5em" }}>
                                                    <AiOutlinePlus />
                                                </IconContext.Provider>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    participants: state.TMParticipantReducer.participants,
    loaded: state.TMParticipantReducer.loaded,
    participantCreationSuccess: state.TMParticipantReducer.participantCreationSuccess
});

export default connect(mapStateToProps, {
    getTMParticipantsForTM,
    clearTMParticipants,
    deleteTMParticipant,
    createTMParticipant 
})(TMParticipants);
