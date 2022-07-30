import React from 'react';

import { connect } from 'react-redux';

import { IconContext } from 'react-icons';
import { AiOutlineClear } from 'react-icons/ai';




class FloatingButton extends React.Component {

    render () {
        return (
            <>
                <button className="float btn btn-primary" onClick={this.props.action}>
                    <IconContext.Provider value={{ size: "2em", color: "white" }}>
                         <AiOutlineClear />
                    </IconContext.Provider>
                </button>
            </>
        );
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {  })(FloatingButton);
