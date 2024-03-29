import React from 'react';

import { connect } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { ButtonGroup } from 'react-bootstrap';

import { deleteFinding } from '../../actions/finding';
import { IconButton } from '../Common';


class FindingToolbar extends React.Component {
    constructor (props) {
        super(props)

        this.deleteFinding = this.deleteFinding.bind(this);
    }

    deleteFinding () {
        this.props.deleteFinding(this.props.findingId);
    }

    render () {
        return (
            <ButtonGroup>
                <IconButton tooltip="Delete finding" onClick={this.deleteFinding} icon={<FaTrash/>} />
            </ButtonGroup>
        )
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteFinding })(FindingToolbar);
