import React from 'react';

import { IconContext } from 'react-icons';
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im';
import { SiOwasp } from 'react-icons/si';



class Requirement extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            checked: props.checked
        }
    }

    UNSAFE_valuecomponentWillReceiveProps(nextProps) {
        this.setState({checked: nextProps.checked})
    }

    handleClick = (event) => {
        this.setState({'checked': !this.state.checked});
        this.props.updateRequirementsCallback(this.props.id)
    }

    render () {
        return (
            <>
                <div className="row" onClick={this.handleClick}>
                    <button type="button" 
                        className={this.state.checked 
                            ? "btn btn-success btn-block"
                            : "btn btn-light btn-block"}
                    >
                        <div className="row">
                            <div className="col-1">
                                <IconContext.Provider value={{ size: "2em" }}>
                                    {this.state.checked
                                        ? <ImCheckboxChecked />
                                        : <ImCheckboxUnchecked />
                                    }
                                </IconContext.Provider>
                            </div>
                            <div className="col-1">
                                {[...Array(this.props.owasp_level)].map((e, i) => <>
                                    <IconContext.Provider value={{ size: "1.5em", color: this.props.checked ? "white" : "black" }}>
                                        <SiOwasp />
                                    </IconContext.Provider>
                                </>)}
                            </div>
                            <div className="col-1">
                                {this.props.readable_id}
                            </div>
                            <div className="col-9">
                                {this.props.description}
                            </div>
                        </div>
                    </button>
                </div>
            </>
        )
    }
}


export default Requirement;
