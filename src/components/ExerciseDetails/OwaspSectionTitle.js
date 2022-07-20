import React from 'react';

import { connect } from 'react-redux';

import { OWASP_SECTIONS } from '../../constants';


class OwaspSectionTitle  extends React.Component {
    constructor (props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick () {
        this.props.clickListener(this.props.section)
    }

    render () {
        return (
            <tr onClick={this.handleClick}>
                <td colSpan="5">
                    Section {this.props.section} - {OWASP_SECTIONS[this.props.section-1]}
                </td>
            </tr>
        );
    }

}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(OwaspSectionTitle);

