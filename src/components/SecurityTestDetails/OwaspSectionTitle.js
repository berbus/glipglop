import React from 'react';

import { connect } from 'react-redux';
import { IconContext } from "react-icons";
import Button from 'react-bootstrap/Button';
import { BiSelectMultiple } from 'react-icons/bi';
import { MdOutlineExpandMore, MdOutlineExpandLess } from 'react-icons/md';

import { OWASP_SECTIONS } from '../../constants';


class OwaspSectionTitle  extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            visible: false
        }

        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.toggleVisible = this.toggleVisible.bind(this);
    }

    toggleVisible () {
        this.setState({visible: !this.state.visible});
        this.props.toggleVisibleCallback(this.props.section);
    }


    handleSelectAll () {
        this.props.selectAllClickCallback(this.props.section);
    }

    render () {
        return (
            <div className={this.props.selected ? "row p-2 selected" : "row p-2"}>
                <div className="col-10">
                    <h4 onClick={this.handleSelectAll}>
                        Section {this.props.section} - {OWASP_SECTIONS[this.props.section-1]}
                    </h4>
                </div>
                <div className="col-2">
                    <Button className="me-2" onClick={this.handleSelectAll}>
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            <BiSelectMultiple />
                        </IconContext.Provider>
                    </Button>
                    <Button
                        onClick={this.toggleVisible}
                        aria-expanded={this.props.visible}>
                        <IconContext.Provider value={{ size: "1.5em" }}>
                            {this.props.visible
                                ? <MdOutlineExpandLess />
                                : <MdOutlineExpandMore />
                            }
                        </IconContext.Provider>
                    </Button>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(OwaspSectionTitle);

