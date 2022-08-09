import React from 'react';

import { NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { AiOutlineExperiment } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { deleteFinding } from '../../actions/finding';
import { IconButton, IconHashButton } from '../Common';


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
                <IconHashButton tooltip="Got to test case" to={"#" + this.props.testCase} icon={<AiOutlineExperiment/>}/>
                <IconButton tooltip="Delete finding" onClick={this.deleteFinding} icon={<FaTrash/>} />
            </ButtonGroup>
        )
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteFinding })(FindingToolbar);
