import React from 'react';

import { NavHashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import { AiOutlineExperiment, AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { Form, FloatingLabel, Accordion, Badge } from 'react-bootstrap';

import { updateFinding } from '../../actions/finding';
import { RichTextEditor, OnClickEditor } from '../Common';


class Finding extends React.Component {
    constructor (props) {
        super(props)


        this.state = {
            title: this.props.title,
            description: this.props.description,
            evidence: this.props.evidence,
            status: this.props.status,
            impact: this.props.impact,
            collapsed: true
        }

        this.updateFindingTitle = this.updateFindingTitle.bind(this);
        this.updateFindingDescription = this.updateFindingDescription.bind(this);
        this.handleFindingChange = this.handleFindingChange.bind(this);
        this.toogleEvent = this.toogleEvent.bind(this);
    }

    toogleEvent () {
        this.setState({collapsed: !this.state.collapsed});
    }

    handleFindingChange (event) {
        let data = {}
        const newValue = event.target.value;
        const statusKey = event.target.name;
        data[statusKey] = newValue;

        this.setState(data);
        this.props.updateFinding(this.props.findingId, data)
    }

    updateFindingDescription (newDescription) {
        if (newDescription !== this.state.description) {
            const data = {'description': newDescription};
            this.props.updateFinding(this.props.findingId, data);
            this.setState(data)
        }
    }

    updateFindingTitle (newTitle) {
        if (newTitle !== this.state.title) {
            const data = {'title': newTitle};
            this.props.updateFinding(this.props.findingId, data);
            this.setState(data)
        }
    }

    render () {
        return (
            <Accordion.Item eventKey={"xx" + this.props.findingIndex}>
                <Accordion.Header onClick={this.toogleEvent}>
                    <div className="row">
                        <div className="col-1">
                            F#{this.props.findingIndex}
                        </div>
                        <div className="col-9">
                            {this.state.title}
                        </div>
                        <div className="col-1">
                            <Badge bg={this.state.status === 'FIXED' ? 'success' : 'danger'}>
                                {this.state.status}
                            </Badge>
                        </div>
                        <div className="col-1">
                            <IconContext.Provider 
                                value={{ 
                                    size: "1.5em",
                                    style: { verticalAlign: "middle" } 
                                }}>
                                {this.state.collapsed
                                    ? <AiFillPlusSquare />
                                    : <AiFillMinusSquare />
                                }
                            </IconContext.Provider>
                        </div>
                    </div>
                </Accordion.Header>

                <Accordion.Body className="p-0">
                    <div className="bg-light">
                        <div className="row p-3">
                            <div className="col-1">
                                <p>Title</p>
                            </div>
                            <div className="col-11">
                                <OnClickEditor 
                                    saveHandler={this.updateFindingTitle}
                                    initialData={this.state.title}
                                />
                            </div>
                        </div>
                        <div className="row p-3">
                            <div className="col-1">
                                <p>Description</p>
                            </div>
                            <div className="col-11">
                                <RichTextEditor 
                                    saveHandler={this.updateFindingDescription}
                                    initialData={this.state.description}
                                />
                            </div>
                        </div>
                        <form className="pt-2">
                            <div className="row p-3">
                                <div className="col-1"></div>
                                <div className="col-2">
                                    <FloatingLabel controlId="statusSelect" label="Status">
                                        <Form.Select
                                            id="findingStatus"
                                            name="status"
                                            value={this.state.status}
                                            onChange={this.handleFindingChange}>
                                            <option value={"PENDING"}>PENDING</option>
                                            <option value={"FIXED"}>FIXED</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>
                                <div className="col-1"></div>
                                <div className="col-2">
                                    <button className="btn btn-primary">
                                        <IconContext.Provider 
                                            value={{ 
                                                size: "1.5em",
                                                style: { verticalAlign: "middle" } 
                                            }}>
                                            <div className="centered-label">
                                                <NavHashLink to={"#" + this.props.testCase} className="btn-link">
                                                    <AiOutlineExperiment /><span className="mx-2">Test case</span>
                                                </NavHashLink>
                                            </div>
                                        </IconContext.Provider>
                                    </button>
                                </div>
                                <div className="col-6"></div>
                            </div>
                            <div className="row p-3">
                                <div className="col-1"></div>
                                <div className="col-2">
                                    <FloatingLabel controlId="impactSelect" label="Impact">
                                        <Form.Select
                                            id="findingImpact"
                                            name="impact"
                                            value={this.state.impact}
                                            onChange={this.handleFindingChange}>
                                            <option value={"INFORMATIONAL"}>INFORMATIONAL</option>
                                            <option value={"LOW"}>LOW</option>
                                            <option value={"MEDIUM"}>MEDIUM</option>
                                            <option value={"HIGH"}>HIGH</option>
                                            <option value={"CRITICAL"}>CRITICAL</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </div>
                                <div className="col-9"></div>
                            </div>
                        </form>
                        <form className="px-3">
                            <div className="form-group row p-3">
                                <div className="col-12">
                                </div>
                            </div>
                        </form>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
        )
    }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { updateFinding })(Finding);
