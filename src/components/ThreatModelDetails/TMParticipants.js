import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaTrash } from 'react-icons/fa';

import { getTMParticipantsForTM, clearTMParticipants, deleteTMParticipant } from '../../actions/tmParticipant';

class TMParticipants extends React.Component {
    constructor (props) {
        super(props)

        const loaded = this.props.threatModelLoaded 
        this.state = {
            loaded: loaded
        }
    }

    componentDidMount () {
        this.props.getTMParticipantsForTM(this.props.threatModelId);
    }

    componentWillUnmount () {
        this.props.clearTMParticipants();
    }

    deleteParticipant (e) {
        console.log(e);
        // this.props.deleteTMParticipant();
    }

    render () {
        console.log(this.props.participants)
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
                                                <button className="btn btn-primary" id="asdf" onClick={() => this.deleteParticipant(participant.oid)}>
                                                    <IconContext.Provider value={{ size: "1.0em" }}>
                                                        <FaTrash />
                                                    </IconContext.Provider>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr key="new-participant-key">
                                        <td>{participant.name}</td>
                                        <td>{participant.role}</td>
                                        <td>
                                            <button className="btn btn-primary" id="asdf" onClick={() => this.deleteParticipant(participant.oid)}>
                                                <IconContext.Provider value={{ size: "1.0em" }}>
                                                    <FaTrash />
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
    loaded: state.TMParticipantReducer.loaded
});

export default connect(mapStateToProps, {
    getTMParticipantsForTM,
    clearTMParticipants,
    deleteTMParticipant 
})(TMParticipants);
