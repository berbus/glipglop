import React from 'react';

import { connect } from 'react-redux';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

import { deleteTemplate } from '../../actions/template';


class Template extends React.Component {
    constructor (props) {
        super(props)

        this.deleteTemplate = this.deleteTemplate.bind(this);
    }

    deleteTemplate () {
        this.props.deleteTemplate(this.props.id);
    }

    render () {
        return (
            <article className="row">
                <div className="row">
                    <div className="col-9">
                        <h2>{this.props.name}</h2>
                    </div>
                    <div className="col-3">
                        <Link to={"/templates/" + this.props.id}>
                            <button className="btn btn-primary mx-2">
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <FaRegEdit />
                                </IconContext.Provider>
                            </button>
                        </Link>
                        <button className="btn btn-primary" onClick={this.deleteTemplate}>
                            <IconContext.Provider value={{ size: "1.5em" }}>
                                <FaTrash />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => ({ })

export default connect(mapStateToProps, { deleteTemplate })(Template);
