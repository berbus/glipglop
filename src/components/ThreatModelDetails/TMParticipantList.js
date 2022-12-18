import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { AiOutlinePlus } from 'react-icons/ai';
import TMParticipant from './TMParticipant';

import { getTMParticipantsForTM,
    clearTMParticipants,
    createTMParticipant
} from '../../actions/tmParticipant';

class TMParticipantList extends React.Component {
    constructor (props) {
        super(props)

        const loaded = this.props.threatModelLoaded 
        this.state = {
            edit: false, 
            loaded: loaded,
            newParticipantName: '',
            newParticipantRole: ''
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

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    addParticipant () {
        this.setState({creatingParticipant: true});

        const data = {
            'name': this.state.newParticipantName,
            'role': this.state.newParticipantRole,
            'threat_model': this.props.threatModelId
        };
        this.props.createTMParticipant(data);
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
                                        <th scope="col">Name</th>
                                        <th scope="col">Role</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.participants.map((participant, index) => (
                                        <tr key={participant.oid}>
                                            <TMParticipant participantName={participant.name} participantRole={participant.role} participantId={participant.oid} />
                                        </tr>
                                    ))}
                                    <tr>
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
                                                <IconContext.Provider value={{ size: "1.0em" }}>
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
    loaded: state.TMParticipantReducer.loaded
});

export default connect(mapStateToProps, {
    getTMParticipantsForTM,
    clearTMParticipants,
    createTMParticipant
})(TMParticipantList);
