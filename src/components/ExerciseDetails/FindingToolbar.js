import React from 'react';

import { NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { AiOutlineExperiment } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa';
import { Button, ButtonGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { deleteFinding } from '../../actions/finding';


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
                <OverlayTrigger overlay={<Tooltip>Go to test case</Tooltip>}>
                    <Button className="btn btn-primary">
                        <IconContext.Provider 
                            value={{ 
                                size: "1.5em",
                                style: { verticalAlign: "middle" } 
                            }}>
                            <div className="centered-label">
                                <NavHashLink to={"#" + this.props.testCase} className="btn-link">
                                    <AiOutlineExperiment />
                                </NavHashLink>
                            </div>
                        </IconContext.Provider>
                    </Button>
                </OverlayTrigger>
                <OverlayTrigger overlay={<Tooltip>Delete finding</Tooltip>}>
                    <Button className="btn btn-primary" onClick={this.deleteFinding} title="asdfasdfasd">
                        <IconContext.Provider 
                            value={{ 
                                size: "1.5em",
                                style: { verticalAlign: "middle" } 
                            }}>
                            <div className="centered-label">
                                <FaTrash />
                            </div>
                        </IconContext.Provider>
                    </Button>
                </OverlayTrigger>
            </ButtonGroup>
        )
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteFinding })(FindingToolbar);
