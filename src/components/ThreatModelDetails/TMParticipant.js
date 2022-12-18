import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from 'react-icons';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { MdOutlineCancel } from 'react-icons/md';
import { AiFillCheckCircle } from 'react-icons/ai';

import { 
    deleteTMParticipant,
    updateTMParticipant
} from '../../actions/tmParticipant';

class TMParticipants extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            editing: false, 
            updating: false,
            participantName: this.props.participantName,
            participantRole: this.props.participantRole
        }

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.clearChanges = this.clearChanges.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.updating) {
            if (this.props.updatingParticipantSuccess) {
                this.setState({editing: false, updating: false});
            } else {
                this.setState({editing: true, updating: false});
            }
        }
    }

    saveChanges () {
        const data = {
            'name': this.state.participantName,
            'role': this.state.participantRole
        };

        this.props.updateTMParticipant(this.props.participantId, data);
        this.setState({updating: true});
        this.toggleEdit();
    }

    deleteParticipant (e) {
        this.props.deleteTMParticipant(this.props.participantId);
    }

    clearChanges () {
        this.setState({
            participantName: this.props.participantName,
            participantRole: this.props.participantRole
        })
        this.toggleEdit();
    }

    handleChangeEvent (event) {
        this.setState({[event.target.name]: event.target.value});
    }

    toggleEdit () {
        this.setState({'editing': !this.state.editing});
    }

    render () {
        return (
            <>
                {this.state.editing 
                    ? <>
                        <td>
                            <input
                                type="text" 
                                className="form-control"
                                defaultValue={this.state.participantName}
                                onChange={this.handleChangeEvent}
                                name="participantName"
                            />
                        </td>
                        <td>
                            <input
                                type="text" 
                                className="form-control"
                                defaultValue={this.state.participantRole}
                                onChange={this.handleChangeEvent}
                                name="participantRole"
                            />
                        </td>
                        <td>
                            <button className="btn btn-primary mx-2" onClick={this.saveChanges}>
                                <IconContext.Provider value={{ size: "1.0em" }}>
                                    <AiFillCheckCircle />
                                </IconContext.Provider>
                            </button>
                            <button className="btn btn-primary" onClick={this.clearChanges}>
                                <IconContext.Provider value={{ size: "1.0em" }}>
                                    <MdOutlineCancel />
                                </IconContext.Provider>
                            </button>
                        </td>
                    </>
                    : <>
                        <td>{this.state.participantName}</td>
                        <td>{this.state.participantRole}</td>
                        <td>
                            <button className="btn btn-primary mx-2" onClick={this.toggleEdit}>
                                <IconContext.Provider value={{ size: "1.0em" }}>
                                    <FaRegEdit />
                                </IconContext.Provider>
                            </button>
                            <button className="btn btn-primary" onClick={() => this.deleteParticipant(this.props.participantId)}>
                                <IconContext.Provider value={{ size: "1.0em" }}>
                                    <FaTrash />
                                </IconContext.Provider>
                            </button>
                        </td>
                    </>
                }

            </>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    deleteTMParticipant,
    updateTMParticipant
})(TMParticipants);
